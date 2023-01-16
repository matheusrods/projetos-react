import axios from 'axios';
import { toast } from 'react-toastify';

import AuthStore from '../mobx/stores/auth';

export const getBaseURL = () => {
    const network = window.location;

    switch (network.hostname) {
        /* Produção */
        case 'pos.ithealth.com.br':
            return 'https://api.rhhealth.com.br/api';
        /* Homologação */
        case 'tstpda.ithealth.com.br':
            return 'https://tstapi.rhhealth.com.br/api';
        /* Local */
        case 'localhost':
            // return 'http://api.localhost:8087/api';
            // return 'https://tstapi.rhhealth.com.br/api';
            return 'https://api.rhhealth.com.br/api';
        default:
            return 'https://tstapi.rhhealth.com.br/api';
    }
};

export const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 60000
});

api.interceptors.request.use(
    async (config) => {
        const { token } = AuthStore;

        if (
            !config.url.endsWith('auth') ||
            !config.url.endsWith('recuperar-senha-token') ||
            !config.url.endsWith('trocar-senha')
        ) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        const { result } = response.data;

        if (result.data?.error || result.error) {
            response.data.status = 400;

            if (typeof result.error?.message === 'string') {
                console.error(result.error?.message);
                toast.error('Falha ao realizar operação!');
            }

            if (
                result.data?.error?.form_errors &&
                typeof result.data?.error?.form_errors === 'object'
            ) {
                Object.values(result.data.error.form_errors).forEach((item) => {
                    if (typeof item === 'object') {
                        Object.values(item).forEach((item) => {
                            if (typeof item === 'string') toast.error(item);
                        });
                    }
                });
            } else if (
                result.data?.error &&
                typeof result.data?.error?.message === 'string'
            ) {
                toast.error(result.data.error?.message);
            }
        }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const endpoints = {
    auth: {
        login: (data) =>
            api.post('/auth', {
                ...data,
                codigo_perfil: 50
            }),
        forgotMyPasswordSendEmail: (data) =>
            api.post('usuario/credencial/recuperar-senha-token', {
                ...data,
                codigo_sistema: 8,
                alerta_tipo: 1
            }),
        forgotMyPasswordValidateToken: (data) =>
            api.put('usuario/credencial/recuperar-senha-token', {
                ...data,
                codigo_sistema: 8,
                alerta_tipo: 1
            }),
        updatePassword: (data) =>
            api.put('usuario/credencial/trocar-senha', data)
    },
    user: {
        getById: (id) => api.get(`/usuario/${id}`)
    }
};

const exportDefault = { api, endpoints };

export default exportDefault;

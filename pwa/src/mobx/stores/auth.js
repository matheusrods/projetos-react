import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { api, endpoints } from '../../services/api';

import SessionStore from './session';
import UserStore from './user';

class AuthStore {
    isLoading = false;
    error = null;

    token = null;
    userId = null;

    forgotMyPassword = {
        user: null,
        user_id: null,
        valid: false,
        message: null,
        messageSuccess: null,
        messageError: null
    };

    constructor() {
        makeAutoObservable(this);

        this.getSessionStore();
    }

    getSessionStore = () => {
        const store = SessionStore.getSession('actionPlan@authStore');

        for (const key in store) {
            this[key] = store[key];
        }
    };

    login = async (data) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { getUserAuthenticated } = UserStore;

            const response = await endpoints.auth.login({
                apelido: data.user.replace(/([^\d])+/gim, ''),
                senha: data.password
            });

            const { status, result } = response.data;

            const { error } = result;

            if (status !== 200) {
                throw new Error(
                    error[0] ??
                        'Servidor indisponível, tente novamente mais tarde.'
                );
            }

            const { token, codigo_usuario } = result.data;

            runInAction(() => {
                this.isLoading = false;
                this.token = token;
                this.userId = codigo_usuario;
            });

            SessionStore.saveSession('actionPlan@authStore', {
                token: token,
                userId: codigo_usuario
            });

            const hasAuthenticated = await getUserAuthenticated(codigo_usuario);

            if (!hasAuthenticated) {
                throw new Error(
                    'Não foi possível consultar o usuário autenticado.'
                );
            }
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
                this.error = error?.message
                    ? error.message
                    : 'Servidor indisponível, tente novamente mais tarde.';
                this.token = null;
                this.userId = null;
            });

            SessionStore.removeSession('actionPlan@authStore');
        }
    };

    logout = () => {
        const { reset: resetUserStore } = UserStore;

        this.token = null;
        this.userId = null;

        SessionStore.removeSession('actionPlan@authStore');
        SessionStore.removeSession('safetyWalkTalk@newRegisterStore');
        SessionStore.removeSession('observerEHS@newRegisterStore');

        resetUserStore();
    };

    forgotMyPasswordSendEmail = async (data) => {
        this.isLoading = true;
        this.clearForgotMyPassword();

        try {
            const user = data.user.replace(/([^\d])+/gim, '');

            const response = await endpoints.auth.forgotMyPasswordSendEmail({
                apelido: user
            });

            const { status, result } = response.data;

            const { error, data: message } = result;

            if (status !== 200) {
                throw new Error(
                    error ??
                        'Servidor indisponível, tente novamente mais tarde.'
                );
            }

            this.forgotMyPassword = {
                ...this.forgotMyPassword,
                message:
                    message ??
                    'Token de recuperação da senha enviado ao e-mail ******@******.com.br.',
                user
            };
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            this.forgotMyPassword = {
                ...this.forgotMyPassword,
                messageError: error?.message
                    ? error.message
                    : 'Servidor indisponível, tente novamente mais tarde.'
            };
        }
    };

    forgotMyPasswordValidateToken = async (data) => {
        this.isLoading = true;
        this.forgotMyPassword = {
            ...this.forgotMyPassword,
            messageError: null
        };

        try {
            const { code } = data;
            const { user } = this.forgotMyPassword;

            const response = await endpoints.auth.forgotMyPasswordValidateToken(
                { token: parseInt(code), apelido: user }
            );

            const { status, result } = response.data;

            const { error, data: serverData } = result;

            if (status !== 200) {
                throw new Error(
                    error ??
                        'Servidor indisponível, tente novamente mais tarde.'
                );
            }

            if (!serverData.validado) {
                throw new Error('Não foi possível validar o seu token.');
            }

            this.forgotMyPassword = {
                ...this.forgotMyPassword,
                valid: true,
                userId: serverData.codigo_usuario
            };
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            this.forgotMyPassword = {
                ...this.forgotMyPassword,
                messageError: error?.message
                    ? error.message
                    : 'Servidor indisponível, tente novamente mais tarde.'
            };
        }
    };

    updatePassword = async (data) => {
        this.isLoading = true;
        this.forgotMyPassword = {
            ...this.forgotMyPassword,
            messageError: null
        };

        try {
            const { newPassword, newPasswordConfirmation } = data;
            const { userId } = this.forgotMyPassword;

            const response = await endpoints.auth.updatePassword({
                codigo_usuario: userId,
                senha_atual_compara: newPasswordConfirmation,
                senha_atual: newPassword
            });

            const { status, result } = response.data;

            const { error, data: message } = result;

            if (status !== 200) {
                throw new Error(
                    error ??
                        'Servidor indisponível, tente novamente mais tarde.'
                );
            }

            this.forgotMyPassword = {
                ...this.forgotMyPassword,
                messageSuccess: message
            };
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            this.forgotMyPassword = {
                ...this.forgotMyPassword,
                messageError: error?.message
                    ? error.message
                    : 'Servidor indisponível, tente novamente mais tarde.'
            };
        }
    };

    updateOldPassword = async (data) => {
        try {
            const { currentPassword, newPassword, confirmNewPassword } = data;
            const { userId } = UserStore;

            const obj = {
                codigo_usuario: userId,
                senha_anterior: currentPassword,
                senha_atual: newPassword,
                senha_atual_compara: confirmNewPassword
            };

            const response = await api.put('/usuario/credencial', obj);

            const { status, result } = response.data;

            const { error } = result;

            if (status !== 200) {
                throw new Error(
                    error ?? 'Servidor indisponível, tente novamente mais tarde.'
                );
            }

            toast.success('Senha atualizada com sucesso!');

            return true;
        } catch (error) {
            toast.error(error.message);

            return false;
        }
    };

    clearForgotMyPassword = () => {
        this.forgotMyPassword = {
            user: null,
            user_id: null,
            valid: false,
            message: null,
            messageSuccess: null,
            messageError: null
        };
    };

    clearError = () => {
        this.error = null;
    };
}

export default new AuthStore();

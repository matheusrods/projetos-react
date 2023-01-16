import { api } from '../../api';
import {
    tranformInspectionsData,
    transformMyTeamInspectionData,
    transformPendingInspectionsData
} from '../../transforms/inspections';
import { toast } from 'react-toastify';

const getMyTeamInspections = async () => {
    try {
        const response = await api.get(`/usuarios/inspecao`);
        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformMyTeamInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar lista de equipe`);
    }
};
const getMyTeamListInspections = async () => {
    try {
        const response = await api.get(`/inspecao/meu-time`);
        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return tranformInspectionsData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar lista de inspeções da equipe`);
    }
};

const getMyTeamUserListInspections = async (userId) => {
    try {
        const response = await api.get(`/inspecao/meu-time/${userId}`);
        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return tranformInspectionsData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar lista de inspeções do usuário`);
    }
};

const getMyTeamPendingListInspections = async (clientId) => {
    try {
        const response = await api.get(`/inspecao/acoes_pendentes/meu_time/${clientId}`);
        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformPendingInspectionsData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar lista de inspeções do usuário`);
    }
};

export {
    getMyTeamInspections,
    getMyTeamListInspections,
    getMyTeamUserListInspections,
    getMyTeamPendingListInspections
};

import { api } from '../../api';
import {
    tranformInspectionsData,
    transformPendingInspectionsData
} from '../../transforms/inspections';
import { toast } from 'react-toastify';

const getInspections = async (clientCode) => {
    try {
        const response = await api.get(`/inspecao/${clientCode}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return tranformInspectionsData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar as inspeções`);
    }
};

const getPendingActionsInspections = async (clientCode) => {
    try {
        const response = await api.get(`/inspecao/acoes_pendentes/${clientCode}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformPendingInspectionsData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar as inspeções`);
    }
};



export {
    getInspections,
    getPendingActionsInspections,
};

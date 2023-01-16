import { api } from '../../api';
import {
    transformAreaInspectionData,
    transformTipoInspectionData,
    transformFormInspectionData,
    transformBasicInfoInspectionData,
    transformResponsibleInspectionData,
    transformInsertResponseInspectionData
} from '../../transforms/inspections';
import { toast } from 'react-toastify';

const getTipoInspecaoInspections = async () => {
    try {
        const response = await api.get(`/inspecao/tipo_inspecao`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformTipoInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar os tipos de inspeção`);
    }
};

const getAreaInspecaoInspections = async (clientCode, codigoArea) => {
    try {
        const response = await api.get(`/auditoria/processos?codigo_cliente=${clientCode}&codigo_area=${codigoArea}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformAreaInspectionData(result.processos);
    } catch (error) {
        toast.error(`Falha ao retornar as áreas de inspeção`);
    }
};


const getFormInspections = async (clientCode, type) => {
    try {
        const response = await api.get(`/inspecao/forms/${clientCode}/${type}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformFormInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar os tipos de formulário`);
    }
};

const getOpCoInspections = async (clientCode, companyCode) => {
    try {
        const response = await api.get(`/inspecao/opco/${clientCode}/${companyCode}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformBasicInfoInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar a lista de OpCo`);
    }
};

const getBuInspections = async (clientCode, companyCode) => {
    try {
        const response = await api.get(`/inspecao/bu/${clientCode}/${companyCode}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformBasicInfoInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar a lista de BU`);
    }
};

const getResponsiblesInspections = async () => {
    try {
        const response = await api.get(`/usuario/clientes/funcionarios?interno=1`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformResponsibleInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar a lista de resonsáveis`);
    }
};

const insertFormInspections = async (data) => {
    try {
        const response = await api.post(`/inspecao`, data);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformInsertResponseInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao inserir uma programação de inspeção`);
    }
};



export {
    getTipoInspecaoInspections,
    getAreaInspecaoInspections,
    getFormInspections,
    getOpCoInspections,
    getBuInspections,
    getResponsiblesInspections,
    insertFormInspections
};

import { api } from '../../api';
import {
    transformInspectionData,
    transformInspectionUpdateData,
    transformQuestionsListInspectionData,
    transformPhotoInspectionData,
    transformAnswerInspectionData,
    transformSignatureInspectionData,
    transformActionQuestionInspectionData,
    transformImprovementActionInspectionData,
    transformAnsweredQuestionListInspectionData
} from '../../transforms/inspections';
import { toast } from 'react-toastify';

const getInspectionById = async (clientId,id) => {
    try {
        const response = await api.get(`/inspecao/${clientId}/${id}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao retornar os tipos de inspeção`);
    }
};

const updateInspection = async (inspection) => {
    try {
        const response = await api.put(`/inspecao/${inspection.codigo}`, inspection);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformInspectionUpdateData(result.data);
    } catch (error) {
        toast.error(`Falha ao atualizar a inspeção`);
    }
};

const getQuestionsByFormInspection = async (clientId, formId) => {
    try {
        const response = await api.get(`/inspecao/questoes/${clientId}/${formId}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformQuestionsListInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao recuperar as questões do formulário`);
    }
};

const saveAnswerQuestion = async (answer) => {
    try {
        const response = await api.post(`/inspecao/resposta`, answer);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformAnswerInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha salvar a resposta da questão`);
    }
};

const saveAnswerPhoto = async (answerPhoto) => {
    try {
        const response = await api.post(`/inspecao/resposta/fotos`, answerPhoto);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformPhotoInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha salvar a foto da resposta`);
    }
};
const saveSignatureInspection = async (signature) => {
    try {
        const response = await api.post(`/inspecao/assinatura`, signature);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformSignatureInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao salvar a assinatura`);
    }
};

const linkQuestionToAction = async (data) => {
    try {
        const response = await api.post(`/inspecao/acao_melhorias`, data);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformActionQuestionInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao salvar ao vincular a ação de melhoria a questão`);
    }
};

const saveImprovementActions = async (data) => {
    try {
        const response = await api.post(`/acao-melhoria`, data);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformImprovementActionInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao salvar a ação de melhoria`);
    }
};

const getAnsweredQuestionsByInspection = async (clientId, inspectionId) => {
    try {
        const response = await api.get(`/inspecao/respondidos/${clientId}/${inspectionId}`);

        const { result, status } = response.data;
        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }
        return transformAnsweredQuestionListInspectionData(result.data);
    } catch (error) {
        toast.error(`Falha ao recuperar as questões respondidas`);
    }
};
export {
    getInspectionById,
    updateInspection,
    getQuestionsByFormInspection,
    saveAnswerQuestion,
    saveAnswerPhoto,
    saveSignatureInspection,
    linkQuestionToAction,
    saveImprovementActions,
    getAnsweredQuestionsByInspection
};

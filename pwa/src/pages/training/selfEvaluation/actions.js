import { trainingActionTypes } from '../../../mobx/stores/training';

export const getFilters = () => {
    return {
        store: 'TrainingResumeStore',
        action: trainingActionTypes.GET_EVALUATIONS_FILTERS,
        data: undefined,
        url: `/trainings/evaluations/filters`,
        method: 'get',
        effect: 'getFiltrosRequest'
    };
};

export const getEvaluations = (competencias, status, periodo) => {
    return {
        store: 'TrainingResumeStore',
        action: trainingActionTypes.GET_EVALUATIONS,
        data: undefined,
        url: `/trainings/evaluations/?competencias=${competencias}&status=${status}&periodo=${periodo}`,
        method: 'get',
        effect: 'getAvaliacoesRequest'
    };
};

export const getEvaluation = (codigo) => {
    return {
        store: 'TrainingEvaluationsStore',
        action: trainingActionTypes.GET_EVALUATION_QUESTIONS,
        data: undefined,
        url: `/trainings/questions/${codigo}`,
        method: 'get',
        effect: 'getQuestionarioRequest'
    };
};

export const patchEvaluation = (data, codigo) => {
    return {
        store: 'TrainingResumeStore',
        action: trainingActionTypes.PATCH_EVALUATION,
        data,
        url: `/trainings/evaluations/${codigo}`,
        method: 'patch',
        effect: 'patchAvaliacoesRequest'
    };
};

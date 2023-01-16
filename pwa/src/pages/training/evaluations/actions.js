import { trainingActionTypes } from '../../../mobx/stores/training';

export const getExamsFilters = () => {
    return {
        store: 'TrainingExamsStore',
        action: trainingActionTypes.GET_EXAMS_FILTERS,
        data: undefined,
        url: `/trainings/provas/filtros`,
        method: 'get',
        effect: 'getProvasRequest'
    };
};

export const getExams = () => {
    return {
        store: 'TrainingExamsStore',
        action: trainingActionTypes.GET_EXAMS,
        data: undefined,
        url: `/trainings/provas`,
        method: 'get',
        effect: 'getProvasRequest'
    };
};

export const getExamsByFilter = (filtros) => {
    return {
        store: 'TrainingExamsStore',
        action: trainingActionTypes.GET_EXAMS,
        data: undefined,
        url: `/trainings/provas?${Object.keys(filtros)
            .map((k) => `${k}=${filtros[k]}`)
            .join('&')}`,
        method: 'get',
        effect: 'getProvasRequest'
    };
};

export const patchExam = (data, codigo) => {
    return {
        store: 'TrainingExamsStore',
        action: trainingActionTypes.PATCH_EXAMS,
        data,
        url: `/trainings/provas/${codigo}`,
        method: 'patch',
        effect: 'patchProvaRequest'
    };
};

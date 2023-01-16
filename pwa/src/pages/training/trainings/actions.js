import { trainingActionTypes } from '../../../mobx/stores/training';

export const getTrainings = () => {
    return {
        store: 'TrainingsStore',
        action: trainingActionTypes.GET_TRAININGS,
        data: undefined,
        url: `/trainings/trainings`,
        method: 'get',
        effect: 'getTreinamentosRequest'
    };
};

export const postTraining = (data) => {
    return {
        store: 'TrainingsStore',
        action: trainingActionTypes.POST_TRAINING,
        data,
        url: `/trainings/trainings`,
        method: 'post',
        effect: 'postTreinamentoRequest'
    };
};

export const patchTraining = (data) => {
    return {
        store: 'TrainingsStore',
        action: trainingActionTypes.PATCH_TRAINING,
        data,
        url: `/trainings/treinamentos/${data.codigo}`,
        method: 'patch',
        effect: 'patchTreinamentoRequest'
    };
};

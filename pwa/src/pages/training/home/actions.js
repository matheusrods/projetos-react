import { trainingActionTypes } from '../../../mobx/stores/training';

export const getResume = () => {
    return {
        store: 'TrainingHomeStore',
        action: trainingActionTypes.GET_RESUME,
        data: undefined,
        url: `/trainings/resume`,
        method: 'get',
        effect: 'getResumoRequest'
    };
};

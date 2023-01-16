import { trainingActionTypes } from '../../../mobx/stores/training';

export const getNotifications = () => {
    return {
        store: 'TrainingNotificationsStore',
        action: trainingActionTypes.GET_NOTIFICATIONS,
        data: undefined,
        url: `/trainings/notifications`,
        method: 'get'
    };
};

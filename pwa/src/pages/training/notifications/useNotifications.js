import { flowResult } from 'mobx';
import { useObserver } from 'mobx-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { TrainingContext } from '..';

import { stores } from '../../../mobx';
import { trainingActionTypes } from '../../../mobx/stores/training';

const useNotifications = () => {
    const { notifications } = useContext(TrainingContext);
    const { TrainingNotificationsStore } = useObserver(() => stores);

    const [selected, setselected] = useState();

    const handleRemove = useCallback(
        async (codigo) => {
            await flowResult(
                TrainingNotificationsStore.fetch(
                    trainingActionTypes.PATCH_NOTIFICATION,
                    { persistir: false },
                    `/trainings/notifications/${codigo}`,
                    'patch',
                    'patchNotificacoesRequest'
                )
            );
        },
        [TrainingNotificationsStore]
    );

    useEffect(() => {
        if (selected) handleRemove(selected);
    }, [selected, handleRemove]);

    useEffect(() => {
        if (notifications.patchNotificacoesRequest.success)
            setselected(undefined);
    }, [notifications]);

    return { setselected, selected, ...notifications };
};

export default useNotifications;

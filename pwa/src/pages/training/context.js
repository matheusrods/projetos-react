import { flowResult } from 'mobx';
import { useObserver, observer } from 'mobx-react';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { stores } from '../../mobx';
import Onboarding from './onboarding/page';
import { getResume } from './home';
import { getNotifications } from './notifications';

const TrainingContext = createContext();

const TrainingView = ({ isReady, didOnboarding, children }) => {
    if (!isReady) return <p>loading</p>;

    if (!didOnboarding) return <Onboarding />;

    return children;
};

const TrainingProvider = observer(({ children }) => {
    const {
        TrainingHomeStore,
        TrainingNotificationsStore,
        TrainingEvaluationsStore,
        TrainingResumeStore,
        TrainingsStore,
        TrainingExamsStore
    } = useObserver(() => stores);

    const [isReady, setisReady] = useState(false);
    const [showNotifications, setshowNotifications] = useState(false);
    const [didOnboarding, setdidOnboarding] = useState(undefined);

    const { pathname } = useLocation();

    const getDidOnboarding = useCallback(async () => {
        return localStorage.getItem('didOnboarding');
    }, []);

    const setDidOnboarding = useCallback(async () => {
        localStorage.setItem('didOnboarding', 'true');

        setdidOnboarding(await getDidOnboarding());
    }, [getDidOnboarding]);

    const handleNotificationsView = useCallback(() => {
        setshowNotifications((curNotificationState) => !curNotificationState);
    }, []);

    const fetch = useCallback(async ({ store, ...rest }) => {
        await flowResult(stores[store].fetch({ ...rest }));
    }, []);

    useEffect(() => {
        const onStartAsync = async () =>
            setdidOnboarding(await getDidOnboarding());

        onStartAsync();
    }, [getDidOnboarding]);

    useEffect(() => {
        setshowNotifications(false);
    }, [pathname]);

    useEffect(() => {
        const handleResumeAsync = async () => {
            await fetch(getResume());
            await fetch(getNotifications());

            setisReady(true);
        };

        if (didOnboarding) handleResumeAsync();
        if (didOnboarding === null) setisReady(true);
    }, [didOnboarding, fetch]);

    return (
        <TrainingContext.Provider
            value={{
                didOnboarding,
                isReady,
                setDidOnboarding,
                handleNotificationsView,
                showNotifications,
                fetch,
                home: { ...TrainingHomeStore.state },
                notifications: { ...TrainingNotificationsStore.state },
                resume: { ...TrainingResumeStore.state },
                evaluation: { ...TrainingEvaluationsStore.state },
                trainings: { ...TrainingsStore.state },
                exams: { ...TrainingExamsStore.state }
            }}
        >
            <TrainingView isReady={isReady} didOnboarding={didOnboarding}>
                {children}
            </TrainingView>
        </TrainingContext.Provider>
    );
});

export { TrainingProvider, TrainingContext };

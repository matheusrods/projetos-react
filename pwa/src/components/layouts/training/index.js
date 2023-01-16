import React, { useContext } from 'react';

import { BottomNavigation, Header } from '../../organisms';
import useTrainingLayout from './training.hook';
import { Container } from './training.styles';
import {
    TrainingContext,
    TrainingNotificationsPage,
    TrainingProvider
} from '../../../pages/training';

const Layout = ({ children }) => {
    const { didOnboarding, handleNotificationsView, showNotifications } =
        useContext(TrainingContext);
    const { items } = useTrainingLayout();

    return (
        <>
            {didOnboarding && (
                <Header
                    notificationsAction={handleNotificationsView}
                    notificationsBadge
                />
            )}

            <Container didOnboarding={didOnboarding}>
                {showNotifications ? <TrainingNotificationsPage /> : children}
            </Container>

            {didOnboarding && <BottomNavigation items={items} />}
        </>
    );
};

const TrainingLayout = ({ children }) => (
    <TrainingProvider>
        <Layout>{children}</Layout>
    </TrainingProvider>
);

export default TrainingLayout;

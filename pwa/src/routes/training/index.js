import React from 'react';
import { Switch } from 'react-router-dom';

import RouteWrapper from '../routeWrapper';
import routes, { trainingBaseUrl } from './training.service';

const TrainingNavigation = () => {
    return (
        <Switch>
            <RouteWrapper
                path={`${trainingBaseUrl}/${routes.home.path}`}
                exact
                component={routes.home.component}
                isPrivate
            />

            <RouteWrapper
                path={`${trainingBaseUrl}/${routes.selfEvaluation.path}`}
                exact
                component={routes.selfEvaluation.component}
                isPrivate
            />

            <RouteWrapper
                path={`${trainingBaseUrl}/${routes.trainings.path}`}
                exact
                component={routes.trainings.component}
                isPrivate
            />

            <RouteWrapper
                path={`${trainingBaseUrl}/${routes.tests.path}`}
                exact
                component={routes.tests.component}
                isPrivate
            />
        </Switch>
    );
};

export default TrainingNavigation;

import React from 'react';
import { Switch } from 'react-router';
import RouteWrapper from '../routeWrapper';

/* Pages - Home */
import Home from '../../pages/action-plan';

/* Pages - View Photo */
import ViewPhoto from '../../pages/action-plan/view-photo';

/* Pages - Coverage Analysis */
import CoverageAnalysis from '../../pages/action-plan/coverage-analysis';
import CoverageAnalysisDetourDetails from '../../pages/action-plan/coverage-analysis/detour-details';
import CoverageAnalysisActionDetails from '../../pages/action-plan/coverage-analysis/action-details';

const ActionPlan = ({ baseUrl = '/action-plan' }) => (
    <Switch>
        {/* Pages - Home */}
        <RouteWrapper path={`${baseUrl}`} exact component={Home} isPrivate />
        {/* Pages - View Photo */}
        <RouteWrapper path={`${baseUrl}/:id/view-photo`} exact component={ViewPhoto} isPrivate />
        {/* Pages - Coverage Analysis */}
        <RouteWrapper path={`${baseUrl}/coverage-analysis`} exact component={CoverageAnalysis} isPrivate />
        <RouteWrapper path={`${baseUrl}/coverage-analysis/:id/detour-details`} component={CoverageAnalysisDetourDetails} isPrivate />
        <RouteWrapper path={`${baseUrl}/coverage-analysis/:id/action-details/:mainImprovementActionId?`} component={CoverageAnalysisActionDetails} isPrivate />
    </Switch>
);


export default ActionPlan;

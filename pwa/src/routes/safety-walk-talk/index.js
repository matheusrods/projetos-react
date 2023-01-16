import React from 'react';
import RouteWrapper from '../routeWrapper';

/* Pages - Home */
import { default as Home } from '../../pages/safety-walk-talk';
import Details from '../../pages/safety-walk-talk/details';
import Goals from '../../pages/safety-walk-talk/goals';

/* Pages - New Register */
import NewRegisterObserver from '../../pages/safety-walk-talk/new-register/observer';
import NewRegisterRegistrationLocation from '../../pages/safety-walk-talk/new-register/registration-location';
import NewRegisterChangeLocation from '../../pages/safety-walk-talk/new-register/registration-location/change-location';
import NewRegisterAreaObservations from '../../pages/safety-walk-talk/new-register/area-observations';
import NewRegisterSummary from '../../pages/safety-walk-talk/new-register/summary';
import NewRegisterOtherParticipants from '../../pages/safety-walk-talk/new-register/other-participants';
import NewRegisterDynamicForm from '../../pages/safety-walk-talk/new-register/dynamic-form';
import NewRegisterDynamicFormEditItem from '../../pages/safety-walk-talk/new-register/dynamic-form/edit-item';
import NewRegisterFacilitator from '../../pages/safety-walk-talk/new-register/facilitator';
import NewRegisterCommitments from '../../pages/safety-walk-talk/new-register/commitments';
import NewRegisterImprovementActions from '../../pages/safety-walk-talk/new-register/improvement-actions';
import NewRegisterImprovementActionsLink from '../../pages/safety-walk-talk/new-register/improvement-actions/link';
import NewRegisterImprovementActionsConfirm from '../../pages/safety-walk-talk/new-register/improvement-actions/confirm';
import NewRegisterPerceptionIndex from '../../pages/safety-walk-talk/new-register/perception-index';
import NewRegisterImprovementActionsIncludeAction from '../../pages/safety-walk-talk/new-register/improvement-actions/include-action';

/* Pages - Quality Analysis */
import QualityAnalysis from '../../pages/safety-walk-talk/quality-analysis';
import QualityAnalysisDynamicForm from '../../pages/safety-walk-talk/quality-analysis/dynamic-form';
import QualityAnalysisDynamicFormEditItem from '../../pages/safety-walk-talk/quality-analysis/dynamic-form/edit-item';
import QualityAnalysisConfirm from '../../pages/safety-walk-talk/quality-analysis/confirm';
import QualityAnalysisIndex from '../../pages/safety-walk-talk/quality-analysis/quality-index';
import { Switch } from 'react-router';

const SafetyWalkTalk = ({ baseUrl = '/safety-walk-talk' }) => {
    return (
        <>
            <Switch>
                <RouteWrapper
                    path={`${baseUrl}`}
                    exact
                    component={Home}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/details/:id`}
                    component={Details}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/goals`}
                    component={Goals}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/quality-analysis/:id`}
                    exact
                    component={QualityAnalysis}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/quality-analysis/:id/dynamic-form/:step`}
                    exact
                    component={QualityAnalysisDynamicForm}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/quality-analysis/:id/dynamic-form/:step/question/:question`}
                    component={QualityAnalysisDynamicFormEditItem}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/quality-analysis/:id/confirm`}
                    component={QualityAnalysisConfirm}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/quality-analysis/:id/index`}
                    component={QualityAnalysisIndex}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/observer`}
                    component={NewRegisterObserver}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/registration-location`}
                    exact
                    component={NewRegisterRegistrationLocation}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/registration-location/change-location`}
                    component={NewRegisterChangeLocation}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/area-observations`}
                    component={NewRegisterAreaObservations}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/summary`}
                    component={NewRegisterSummary}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/other-participants`}
                    component={NewRegisterOtherParticipants}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/facilitator`}
                    component={NewRegisterFacilitator}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/dynamic-form/:step`}
                    exact
                    component={NewRegisterDynamicForm}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/dynamic-form/:step/question/:question`}
                    component={NewRegisterDynamicFormEditItem}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/commitments`}
                    component={NewRegisterCommitments}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/improvement-actions`}
                    exact
                    component={NewRegisterImprovementActions}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/improvement-actions/link/:id?`}
                    component={NewRegisterImprovementActionsLink}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/improvement-actions/confirm`}
                    component={NewRegisterImprovementActionsConfirm}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/improvement-actions/include-action/:id?`}
                    component={NewRegisterImprovementActionsIncludeAction}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/perception-index`}
                    component={NewRegisterPerceptionIndex}
                    isPrivate
                />
            </Switch>
        </>
    );
};

export default SafetyWalkTalk;

import { Router, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import { flowResult } from 'mobx';

import history from '../services/history';
import RouteWrapper from './routeWrapper';

import ActionPlan from './action-plan';
import SafetyWalkTalk from './safety-walk-talk';
import ObserverEHS from './observer-ehs';
import Training from './training';

/* Pages - Auth */
import Login from '../pages/login';
import ForgotMyPassword from '../pages/forgot-my-password';
import SendCode from '../pages/forgot-my-password/send-code';
import NewPassword from '../pages/forgot-my-password/new-password';

/* Pages - Home */
import WantToSee from '../pages/WantToSee';

/* Pages - Privacy Policies & Terms of Use */
import PrivacyPolicies from '../pages/privacy-policies';
import TermsOfUse from '../pages/terms-of-use';

/* Pages - New action */
import NewActionType from '../pages/new-action/type';
import NewActionObserver from '../pages/new-action/observer';
import NewActionRegistrationLocation from '../pages/new-action/registration-location';
import NewActionChangeLocation from '../pages/new-action/registration-location/change-location';
import NewActionRecordSource from '../pages/new-action/record-source';
import NewActionVarious from '../pages/new-action/various';
import ImprovementActionForm from '../pages/new-action/improvement-action-form';
import NewActionDetails from '../pages/new-action/details';

/* Pages - Complete action */
import CompleteAction from '../pages/complete-action';
import ViewPhoto from '../pages/complete-action/view-photo';
import EditPhoto from '../pages/complete-action/edit-photo';

/* Pages - Action */
import ActionDetails from '../pages/action-plan/action-details';
import RequestCancellation from '../pages/request-cancellation';
import RequestPostponement from '../pages/action-plan/request-postponement';
import SendFeedback from '../pages/send-feedback';

/* Pages - Available Actions */
import AvailableActions from '../pages/action-plan/available-actions';
import AvailableActionsDetails from '../pages/action-plan/available-actions/details';
import AvailableActionsDetailsRefuse from '../pages/action-plan/available-actions/details/refuse';
import AvailableActionsDetailsTransfer from '../pages/action-plan/available-actions/details/transfer';

/* Pages - Postponed Actions */
import PostponedActions from '../pages/action-plan/postponed-actions';
import PostponedActionsDetails from '../pages/action-plan/postponed-actions/details';
import PostponedActionsDetailsRefuse from '../pages/action-plan/postponed-actions/details/refuse';

/* Pages - Canceled Actions */
import CanceledActions from '../pages/canceled-actions';
import CanceledActionsDetails from '../pages/canceled-actions/details';
import CanceledActionsDetailsRefuse from '../pages/canceled-actions/details/refuse';

/* Pages - Nearly Expired Actions */
import NearlyExpiredActions from '../pages/nearly-expired-actions';

/* Pages - Late Team Actions */
import LateTeamActions from '../pages/late-team-actions';
import LateTeamActionsDetails from '../pages/late-team-actions/details';

/* Pages - Waiting Analysis Actions */
import WaitingAnalysisActionsImplementation from '../pages/waiting-analysis-actions/implementation';
import WaitingAnalysisActionsEfficiency from '../pages/waiting-analysis-actions/efficiency';
import WaitingAnalysisActionDetails from '../pages/waiting-analysis-actions/action-details';

import EditPassword from '../pages/edit-password';
import Audit from './audit';
import ChangeResponsible from '../pages/action-plan/action-details/change-responsible';

import { LoadingUserContainer } from '../components/molecules';
import InspectionAssessmentRoutes from './inspection-assessment';

const Routes = ({ UserStore, SessionStore: { getSession } }) => {
    const authStore = getSession('actionPlan@authStore');

    const [loading, setLoading] = useState(authStore?.userId ? true : false);

    const fetchUser = useCallback(async () => {
        if (authStore?.userId) {
            setLoading(true);

            await flowResult(UserStore.getUserAuthenticated());

            setLoading(false);
        }
    }, [UserStore, authStore?.userId]);

    useEffect(() => fetchUser(), [fetchUser]);

    return loading ? (
        <LoadingUserContainer />
    ) : (
        <Router history={history}>
            <Switch>
                {/* Pages - Auth */}
                <RouteWrapper path={'/'} exact component={Login} />
                <RouteWrapper
                    path={'/edit-password'}
                    exact
                    component={EditPassword}
                    isPrivate
                />
                <RouteWrapper
                    path={'/forgot-my-password'}
                    exact
                    component={ForgotMyPassword}
                />
                <RouteWrapper
                    path={'/forgot-my-password/send-code'}
                    component={SendCode}
                />
                <RouteWrapper
                    path={'/forgot-my-password/new-password'}
                    component={NewPassword}
                />
                {/* Pages - Home */}
                <RouteWrapper
                    path={'/want-to-see'}
                    exact
                    component={WantToSee}
                    isPrivate
                />
                {/* Pages - Privacy Policies & Terms of Use */}
                <RouteWrapper
                    path={'/privacy-policies'}
                    exact
                    component={PrivacyPolicies}
                    isPrivate
                />
                <RouteWrapper
                    path={'/terms-of-use'}
                    exact
                    component={TermsOfUse}
                    isPrivate
                />
                {/* Pages - Action */}
                <RouteWrapper
                    path={'/action/details/:id'}
                    component={ActionDetails}
                    isPrivate
                    exact
                />
                <RouteWrapper
                    path={'/action/details/:id/change-responsible'}
                    component={ChangeResponsible}
                    isPrivate
                    exact
                />
                <RouteWrapper
                    path={'/action/request-postponement/:id'}
                    component={RequestPostponement}
                    isPrivate
                />
                <RouteWrapper
                    path={'/action/send-feedback/:id'}
                    component={SendFeedback}
                    isPrivate
                />
                <RouteWrapper
                    path={'/action/request-cancellation/:id'}
                    component={RequestCancellation}
                    isPrivate
                />
                {/* Pages - New action */}
                <RouteWrapper
                    path={'/new-action/type'}
                    component={NewActionType}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/observer'}
                    exact
                    component={NewActionObserver}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/registration-location'}
                    exact
                    component={NewActionRegistrationLocation}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/registration-location/change-location'}
                    component={NewActionChangeLocation}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/record-source'}
                    component={NewActionRecordSource}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/various'}
                    component={NewActionVarious}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/improvement-action-form/:id?'}
                    component={ImprovementActionForm}
                    isPrivate
                />
                <RouteWrapper
                    path={'/new-action/details/:id?'}
                    component={NewActionDetails}
                    isPrivate
                />
                {/* Pages - Complete action */}
                <RouteWrapper
                    path={'/complete-action/:id'}
                    exact
                    component={CompleteAction}
                    isPrivate
                />
                <RouteWrapper
                    path={'/complete-action/:id/view-photo'}
                    component={ViewPhoto}
                    isPrivate
                />
                <RouteWrapper
                    path={'/complete-action/:id/edit-photo'}
                    component={EditPhoto}
                    isPrivate
                />
                {/* Pages - Available Actions */}
                <RouteWrapper
                    path={'/available-actions'}
                    exact
                    component={AvailableActions}
                    isPrivate
                />
                <RouteWrapper
                    path={'/available-actions/details/:id'}
                    exact
                    component={AvailableActionsDetails}
                    isPrivate
                />
                <RouteWrapper
                    path={'/available-actions/details/:id/refuse/:requestId'}
                    component={AvailableActionsDetailsRefuse}
                    isPrivate
                />
                <RouteWrapper
                    path={'/available-actions/details/:id/transfer/:requestId'}
                    component={AvailableActionsDetailsTransfer}
                    isPrivate
                />
                {/* Pages - Postponed Actions */}
                <RouteWrapper
                    path={'/postponed-actions'}
                    exact
                    component={PostponedActions}
                    isPrivate
                />
                <RouteWrapper
                    path={'/postponed-actions/details/:id'}
                    exact
                    component={PostponedActionsDetails}
                    isPrivate
                />
                <RouteWrapper
                    path={'/postponed-actions/details/:id/refuse/:requestId'}
                    component={PostponedActionsDetailsRefuse}
                    isPrivate
                />
                {/* Pages - Canceled Actions */}
                <RouteWrapper
                    path={'/canceled-actions'}
                    exact
                    component={CanceledActions}
                    isPrivate
                />
                <RouteWrapper
                    path={'/canceled-actions/details/:id'}
                    exact
                    component={CanceledActionsDetails}
                    isPrivate
                />
                <RouteWrapper
                    path={'/canceled-actions/details/:id/refuse/:requestId'}
                    component={CanceledActionsDetailsRefuse}
                    isPrivate
                />
                {/* Pages - Nearly Expired Actions */}
                <RouteWrapper
                    path={'/nearly-expired-actions'}
                    exact
                    component={NearlyExpiredActions}
                    isPrivate
                />
                {/* Pages - Late Team Actions */}
                <RouteWrapper
                    path={'/late-team-actions'}
                    exact
                    component={LateTeamActions}
                    isPrivate
                />
                <RouteWrapper
                    path={'/late-team-actions/details/:id'}
                    component={LateTeamActionsDetails}
                    isPrivate
                />

                {/* Pages - Waiting Analysis Actions */}
                <RouteWrapper
                    path={'/waiting-analysis-actions/:id/action-details'}
                    exact
                    component={WaitingAnalysisActionDetails}
                    isPrivate
                />
                <RouteWrapper
                    path={'/waiting-analysis-actions/:id/implementation'}
                    exact
                    component={WaitingAnalysisActionsImplementation}
                    isPrivate
                />
                <RouteWrapper
                    path={'/waiting-analysis-actions/:id/efficiency'}
                    exact
                    component={WaitingAnalysisActionsEfficiency}
                    isPrivate
                />
            </Switch>

            <ActionPlan />

            <SafetyWalkTalk />

            <ObserverEHS />

            {/* <InspectionAssessmentRoutes />

            <Audit />

            <Training /> */}
        </Router>
    );
};

export default inject('UserStore', 'SessionStore')(observer(Routes));

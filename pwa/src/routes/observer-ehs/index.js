import React from 'react';
import RouteWrapper from '../routeWrapper';
import { Switch } from 'react-router';

/* Pages - Home */
import { default as Home } from '../../pages/observer-ehs';
import Details from '../../pages/observer-ehs/details';
/* Pages - New Register */
import NewRegisterType from '../../pages/observer-ehs/new-register/type';
import NewRegisterObserver from '../../pages/observer-ehs/new-register/observer';
import NewRegisterRegistrationLocation from '../../pages/observer-ehs/new-register/registration-location';
import NewRegisterChangeLocation from '../../pages/observer-ehs/new-register/registration-location/change-location';
import NewRegisterDateTime from '../../pages/observer-ehs/new-register/date-time';
import NewRegisterDescription from '../../pages/observer-ehs/new-register/description';
import NewRegisterPictures from '../../pages/observer-ehs/new-register/pictures';
import NewRegisterPicturesViewPhoto from '../../pages/observer-ehs/new-register/pictures/view-photo';
import NewRegisterPicturesEditPhoto from '../../pages/observer-ehs/new-register/pictures/edit-photo';
import NewRegisterRiskImpact from '../../pages/observer-ehs/new-register/risk-impact';
import NewRegisterCheckObservation from '../../pages/observer-ehs/new-register/check-observation';
import NewRegisterIncludeRiskImpact from '../../pages/observer-ehs/new-register/risk-impact/include-risk-impact';
import NewRegisterComplete from '../../pages/observer-ehs/new-register/complete';
/* Pages - Risk Rating */
import RiskRating from '../../pages/observer-ehs/risk-rating';
import RiskRatingCancel from '../../pages/observer-ehs/risk-rating/cancel';
import RiskRatingEdit from '../../pages/observer-ehs/risk-rating/edit';
import RiskRatingCriticism from '../../pages/observer-ehs/risk-rating/criticism';
import RiskRatingImprovementActions from '../../pages/observer-ehs/risk-rating/improvement-actions';
import RiskRatingImprovementActionsLink from '../../pages/observer-ehs/risk-rating/improvement-actions/link';
import RiskRatingImprovementActionsIncludeAction from '../../pages/observer-ehs/risk-rating/improvement-actions/include-action';
import RiskRatingQuality from '../../pages/observer-ehs/risk-rating/quality';
import RiskRatingCheckObservation from '../../pages/observer-ehs/risk-rating/check-observation';
import RiskRatingComplete from '../../pages/observer-ehs/risk-rating/complete';
import ViewPhoto from '../../pages/observer-ehs/view-photo';

const ObserverEHS = ({ baseUrl = '/observer-ehs' }) => {
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
                    path={`${baseUrl}/:id/view-photo`}
                    exact
                    component={ViewPhoto}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/details/:id`}
                    component={Details}
                    isPrivate
                />
                {/* Pages - New Register */}
                <RouteWrapper
                    path={`${baseUrl}/new-register/type`}
                    exact
                    component={NewRegisterType}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/observer`}
                    exact
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
                    path={`${baseUrl}/new-register/date-time`}
                    exact
                    component={NewRegisterDateTime}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/description`}
                    exact
                    component={NewRegisterDescription}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/pictures`}
                    exact
                    component={NewRegisterPictures}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/pictures/:id/view-photo`}
                    component={NewRegisterPicturesViewPhoto}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/pictures/:id/edit-photo`}
                    component={NewRegisterPicturesEditPhoto}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/risk-impact`}
                    exact
                    component={NewRegisterRiskImpact}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/risk-impact/include-risk-impact/:id?`}
                    component={NewRegisterIncludeRiskImpact}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/check-observation`}
                    component={NewRegisterCheckObservation}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/new-register/complete`}
                    component={NewRegisterComplete}
                    isPrivate
                />
                {/* Pages - Risk Rating */}
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation`}
                    exact
                    component={RiskRating}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/cancel`}
                    component={RiskRatingCancel}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/edit`}
                    component={RiskRatingEdit}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/criticism`}
                    component={RiskRatingCriticism}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/improvement-actions`}
                    exact
                    component={RiskRatingImprovementActions}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/improvement-actions/link/:id?`}
                    component={RiskRatingImprovementActionsLink}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/improvement-actions/include-action/:id?`}
                    component={RiskRatingImprovementActionsIncludeAction}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/quality`}
                    component={RiskRatingQuality}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/check-observation`}
                    component={RiskRatingCheckObservation}
                    isPrivate
                />
                <RouteWrapper
                    path={`${baseUrl}/risk-rating/:idObservation/complete`}
                    component={RiskRatingComplete}
                    isPrivate
                />
            </Switch>
        </>
    );
};

export default ObserverEHS;

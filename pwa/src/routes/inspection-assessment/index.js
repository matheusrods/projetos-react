import React from 'react';
import { Switch } from 'react-router';

import PermittedRoute from '../permittedRoute';
import InspectionAssessment from '../../pages/inspection-assessment/home';
import Inspections from '../../pages/inspection-assessment/inspections';
import FormInspection from '../../pages/inspection-assessment/form-inspection';
import Inspection from '../../pages/inspection-assessment/inspection';
import QuestionsInspection from '../../pages/inspection-assessment/questions';


const InspectionAssessmentRoutes = ({ baseUrl = '/inspection-assessment' }) => {
    return (
        <>
            <Switch>

                <PermittedRoute
                    path={`${baseUrl}`}
                    exact
                    component={InspectionAssessment}
                    isPrivate
                />

                <PermittedRoute
                    path={`${baseUrl}/inspections/:type`}
                    exact
                    component={Inspections}
                    isPrivate
                />

                <PermittedRoute
                    path={`${baseUrl}/inspections/:type/team/:userId`}
                    exact
                    component={Inspections}
                    isPrivate
                />
                <PermittedRoute
                    path={`${baseUrl}/inspection/new`}
                    exact
                    component={FormInspection}
                    isPrivate
                />

                <PermittedRoute
                    path={`${baseUrl}/inspection/:id`}
                    exact
                    component={Inspection}
                    isPrivate
                />

                <PermittedRoute
                    path={`${baseUrl}/inspection/:id/form`}
                    exact
                    component={QuestionsInspection}
                    isPrivate
                />
            </Switch>
        </>
    );
};

export default InspectionAssessmentRoutes;

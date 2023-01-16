import React from 'react';
import { Switch } from 'react-router';

import AuditSes from '../../pages/audit/ses';
import AuditSesFinal from '../../pages/audit/ses/final-audit-schedule';
import AuditSesConfirmed from '../../pages/audit/ses/confirmed-audit-schedule';
import DetailsConfirmedAudit from '../../pages/audit/ses/confirmed-audit-schedule/details';
import AuditSesStarted from '../../pages/audit/ses/started-audit-schedule';
import DetailsStartedAudit from '../../pages/audit/ses/started-audit-schedule/details';

import AuditHeadQuality from '../../pages/audit/head-quality';
import AuditHeadQualityPendingReview from '../../pages/audit/head-quality/pending-review-audit-schedule';
import SchedulePendentReviewResume from '../../pages/audit/head-quality/pending-review-audit-schedule/schedule-audit-steps';
import SchedulePendentReviewDate from '../../pages/audit/head-quality/pending-review-audit-schedule/schedule-audit-steps/schedule-dates';
import AuditHeadQualityConfirmed from '../../pages/audit/head-quality/confirmed-audit-schedule';
import AuditHeadQualityConfirmedDetails from '../../pages/audit/head-quality/confirmed-audit-schedule/details';
import AuditHeadQualityNCOM from '../../pages/audit/head-quality/ncom-audit-schedule';
import AuditHeadQualityNCOMDetails from '../../pages/audit/head-quality/ncom-audit-schedule/details';
import IndicatedNCOMHeadQuality from '../../pages/audit/head-quality/ncom-audit-schedule/details/indicated';
import ScheduleAuditHeadQuality from '../../pages/audit/head-quality/confirmed-audit-schedule/details/schedule';
import ScheduleResumeAuditHeadQuality from '../../pages/audit/head-quality/confirmed-audit-schedule/details/schedule/resume';
import AuditResponsibleDealt from '../../pages/audit/responsible-dealt';
import AuditResponsibleDealtTeamAnalysis from '../../pages/audit/responsible-dealt/dealt-steps/team-analysis';
import AuditResponsibleDealtChooseMethodology from '../../pages/audit/responsible-dealt/dealt-steps/choose-methodology';
import AuditResponsibleDealtIshikawa from '../../pages/audit/responsible-dealt/dealt-steps/ishikawa';
import IshikawaOptionsSteps from '../../pages/audit/responsible-dealt/dealt-steps/ishikawa/option-steps';
import ResponsibleDealtInvestigationCause from '../../pages/audit/responsible-dealt/dealt-steps/investigation-cause';
import AuditResponsibleDealt5pqs from '../../pages/audit/responsible-dealt/dealt-steps/5pqs';
import AuditResponsibleDealt5w2h from '../../pages/audit/responsible-dealt/dealt-steps/5w2h';
import AuditRensponsibleDealtImprovementActions from '../../pages/audit/responsible-dealt/dealt-steps/improvement-actions';
import AuditRensponsibleDealtImprovementActionsCreate from '../../pages/audit/responsible-dealt/dealt-steps/improvement-actions/include-action';
import AuditRensponsibleDealtImprovementActionsLink from '../../pages/audit/responsible-dealt/dealt-steps/improvement-actions/link';
import AuditResponsibleDealtPendingDeals from '../../pages/audit/responsible-dealt/pending-deals';
import AuditResponsibleProcess from '../../pages/audit/responsible-process';
import AuditResponsibleProcessDetails from '../../pages/audit/responsible-process/awaiting-analysis';
import IndicatedNCOMResponsibleProcess from '../../pages/audit/responsible-process/awaiting-analysis/indicated';

import AuditorHome from '../../pages/audit/profile-auditor/home';
import AuditorNCOMDetails from '../../pages/audit/profile-auditor/ncom';
import AuditorNCOMStartDealt from '../../pages/audit/profile-auditor/ncom/start-dealt';
import RateContestedAudit from '../../pages/audit/profile-auditor/contestation/rating';
import StartRateContestedAudit from '../../pages/audit/profile-auditor/contestation/rating/start-contestation';
import RateContestedAuditDetails from '../../pages/audit/profile-auditor/contestation/rating/details';
import AuditPending from '../../pages/audit/profile-auditor/audit/audit-pending';
import AuditCompleted from '../../pages/audit/profile-auditor/audit/audit-completed';
import AuditNCOMPrevious from '../../pages/audit/profile-auditor/audit/ncom-previous';
import AuditNCOMPreviousDetails from '../../pages/audit/profile-auditor/audit/ncom-previous/details';
import AuditStartAuditViewAnnotations from '../../pages/audit/profile-auditor/audit/start-audit/annotations/view-annotations';
import AuditStartAuditNewAnnotation from '../../pages/audit/profile-auditor/audit/start-audit/annotations/new-annotation';
import AuditStartAuditRequirementsApplicable from '../../pages/audit/profile-auditor/audit/start-audit/requirements-apply';
import AuditStartAuditRequirementsApplicableDetails from '../../pages/audit/profile-auditor/audit/start-audit/requirements-apply/details';
import AuditStartAuditRequirementsApplicableDetailsCompleted from '../../pages/audit/profile-auditor/audit/start-audit/requirements-apply/completed-details';
import AuditStartAuditAuditingRequirements from '../../pages/audit/profile-auditor/audit/start-audit/auditing-requirements';
import AuditStartAuditingRequirementsPictures from '../../pages/audit/profile-auditor/audit/start-audit/auditing-requirements/pictures';
import AuditStartAuditingRequirementsPicturesEdit from '../../pages/audit/profile-auditor/audit/start-audit/auditing-requirements/pictures/edit-photo';
import AuditStartAuditingRequirementsPicturesView from '../../pages/audit/profile-auditor/audit/start-audit/auditing-requirements/pictures/view-photo';
import AuditSignatures from '../../pages/audit/profile-auditor/audit/end-of-audit/signatures';
import AuditSignaturesReview from '../../pages/audit/profile-auditor/audit/end-of-audit/signatures/review';

import Agenda from '../../pages/audit/common/agenda';
import AuditDetails from '../../pages/audit/common/agenda/details';
import Schedule from '../../pages/audit/common/schedule-audit';
import ScheduleResumeAudit from '../../pages/audit/common/schedule-audit/resume';
import AuditNew from '../../pages/audit/common/new-audit';
import AuditEdit from '../../pages/audit/common/edit-audit';
import ResumeAuditNew from '../../pages/audit/common/new-audit/resume';
import ViewOnePhoto from '../../pages/audit/common/view-photo';

import PermittedRoute from '../permittedRoute';

const Audit = ({ baseUrl = '/audit' }) => {
    return (
        <>
            <Switch>
                {/* TODO PLANEJAMENTO DE AUDITORIA - SES */}
                {/* Programação de Auditoria para validação final */}
                <PermittedRoute
                    path={`${baseUrl}/ses`}
                    exact
                    component={AuditSes}
                    isPrivate
                    permissions={[23, 24, 25, 26]}
                />
                <PermittedRoute
                    path={`${baseUrl}/ses/final`}
                    exact
                    component={AuditSesFinal}
                    isPrivate
                    permissions={[24]}
                />
                {/* Programação de Auditoria confirmada */}
                <PermittedRoute
                    path={`${baseUrl}/ses/confirmed`}
                    exact
                    component={AuditSesConfirmed}
                    isPrivate
                    permissions={[25]}
                />
                <PermittedRoute
                    path={`${baseUrl}/ses/confirmed/details`}
                    exact
                    component={DetailsConfirmedAudit}
                    isPrivate
                    permissions={[25]}
                />
                {/* Programação de Auditoria iniciada */}
                <PermittedRoute
                    path={`${baseUrl}/ses/started`}
                    exact
                    component={AuditSesStarted}
                    isPrivate
                    permissions={[26]}
                />
                <PermittedRoute
                    path={`${baseUrl}/ses/started/details`}
                    exact
                    component={DetailsStartedAudit}
                    isPrivate
                    permissions={[26]}
                />

                {/* TODO PROGRAMAÇÃO DE AUDITORIA - HEAD QUALITY */}
                <PermittedRoute
                    path={`${baseUrl}/head-quality`}
                    exact
                    component={AuditHeadQuality}
                    isPrivate
                    permissions={[27, 28, 29, 30]}
                />
                {/* Análise Pendente */}
                <PermittedRoute
                    path={`${baseUrl}/head-quality/pending-review`}
                    exact
                    component={AuditHeadQualityPendingReview}
                    isPrivate
                    permissions={[28]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/pending-review/schedule`}
                    exact
                    component={SchedulePendentReviewResume}
                    isPrivate
                    permissions={[28]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/pending-review/schedule/date`}
                    exact
                    component={SchedulePendentReviewDate}
                    isPrivate
                    permissions={[28]}
                />
                {/* Auditoria Confirmada */}
                <PermittedRoute
                    path={`${baseUrl}/head-quality/confirmed`}
                    exact
                    component={AuditHeadQualityConfirmed}
                    isPrivate
                    permissions={[29]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/confirmed/details`}
                    exact
                    component={AuditHeadQualityConfirmedDetails}
                    isPrivate
                    permissions={[29]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/confirmed/details/schedule`}
                    exact
                    component={ScheduleAuditHeadQuality}
                    isPrivate
                    permissions={[29]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/confirmed/details/schedule/resume`}
                    exact
                    component={ScheduleResumeAuditHeadQuality}
                    isPrivate
                    permissions={[29]}
                />
                {/* NC/OM */}
                <PermittedRoute
                    path={`${baseUrl}/head-quality/nc-om`}
                    exact
                    component={AuditHeadQualityNCOM}
                    isPrivate
                    permissions={[30]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/nc-om/details`}
                    exact
                    component={AuditHeadQualityNCOMDetails}
                    isPrivate
                    permissions={[30]}
                />
                <PermittedRoute
                    path={`${baseUrl}/head-quality/nc-om/details/indicated`}
                    exact
                    component={IndicatedNCOMHeadQuality}
                    isPrivate
                    permissions={[30]}
                />

                {/* TODO RESPONSAVEL PELA TRATATIVA */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt`}
                    exact
                    component={AuditResponsibleDealt}
                    isPrivate
                    permissions={[36]}
                />
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/pending-deals`}
                    exact
                    component={AuditResponsibleDealtPendingDeals}
                    isPrivate
                    permissions={[36]}
                />
                {/* team analysis */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/team-analysis`}
                    exact
                    component={AuditResponsibleDealtTeamAnalysis}
                    isPrivate
                    permissions={[36]}
                />
                {/* choose-methodology */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/choose-methodology`}
                    exact
                    component={AuditResponsibleDealtChooseMethodology}
                    isPrivate
                    permissions={[36]}
                />
                {/* Methodology Ishikawa*/}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/ishikawa`}
                    exact
                    component={AuditResponsibleDealtIshikawa}
                    isPrivate
                    permissions={[36]}
                />
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/ishikawa/options`}
                    exact
                    component={IshikawaOptionsSteps}
                    isPrivate
                    permissions={[36]}
                />
                {/* Methodology 5pqs */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/5pqs`}
                    exact
                    component={AuditResponsibleDealt5pqs}
                    isPrivate
                    permissions={[36]}
                />
                {/* Methodology 5w2h */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/5w2h`}
                    exact
                    component={AuditResponsibleDealt5w2h}
                    isPrivate
                    permissions={[36]}
                />
                {/* Methodology Investigation */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/investigation-cause`}
                    exact
                    component={ResponsibleDealtInvestigationCause}
                    isPrivate
                    permissions={[36]}
                />
                {/* Improvement action */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/actions`}
                    exact
                    component={AuditRensponsibleDealtImprovementActions}
                    isPrivate
                    permissions={[36]}
                />
                {/* Improvement action - create */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/actions/include-action`}
                    exact
                    component={AuditRensponsibleDealtImprovementActionsCreate}
                    isPrivate
                    permissions={[36]}
                />
                {/* Improvement action - link */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-dealt/steps/actions/link`}
                    exact
                    component={AuditRensponsibleDealtImprovementActionsLink}
                    isPrivate
                    permissions={[36]}
                />

                {/* TODO PERFIL AUDITOR */}
                {/* Home */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor`}
                    exact
                    component={AuditorHome}
                    isPrivate
                    permissions={[31, 32, 33, 34, 35]}
                />
                {/* NOTE Fluxo 1 - Contestation */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/contestation/rating`}
                    exact
                    component={RateContestedAudit}
                    isPrivate
                    permissions={[35]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/contestation/rating/start-contestation`}
                    exact
                    component={StartRateContestedAudit}
                    isPrivate
                    permissions={[35]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/contestation/rating/details`}
                    exact
                    component={RateContestedAuditDetails}
                    isPrivate
                    permissions={[35]}
                />
                {/* NOTE Fluxo 2 - NC & OM */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/ncom`}
                    exact
                    component={AuditorNCOMDetails}
                    isPrivate
                    permissions={[34]}
                />
                {/* AuditorNCOMDetails Start Dealt*/}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/ncom/start-deal`}
                    exact
                    component={AuditorNCOMStartDealt}
                    isPrivate
                    permissions={[34]}
                />
                {/* NOTE Fluxo 5 - Audit Completed */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/audit-completed`}
                    exact
                    component={AuditCompleted}
                    isPrivate
                    permissions={[33]}
                />
                {/* NOTE Fluxo 4 - Audit Pending */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/audit-pending`}
                    exact
                    component={AuditPending}
                    isPrivate
                    permissions={[31]}
                />
                {/* NOTE Fluxo 3 - Start Audit - View Annotations */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit`}
                    exact
                    component={AuditStartAuditViewAnnotations}
                    isPrivate
                    permissions={[31, 32]}
                />
                {/* Start Audit - New Annotation */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/new-annotation`}
                    exact
                    component={AuditStartAuditNewAnnotation}
                    isPrivate
                    permissions={[31, 32]}
                />
                {/* Start Audit - Requirements Applicable */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/requirements-applicable`}
                    exact
                    component={AuditStartAuditRequirementsApplicable}
                    isPrivate
                    permissions={[31, 32]}
                />
                {/* Start Audit - Requirements Applicable - Details */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/requirements-applicable/details`}
                    exact
                    component={AuditStartAuditRequirementsApplicableDetails}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/requirements-applicable/completed/details`}
                    exact
                    component={AuditStartAuditRequirementsApplicableDetailsCompleted}
                    isPrivate
                    permissions={[31, 32]}
                />
                {/* Start Audit - Auditing Requirements */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/auditing-requirements`}
                    exact
                    component={AuditStartAuditAuditingRequirements}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/auditing-requirements/pictures`}
                    exact
                    component={AuditStartAuditingRequirementsPictures}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/auditing-requirements/pictures/edit-photo`}
                    exact
                    component={AuditStartAuditingRequirementsPicturesEdit}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/auditing-requirements/pictures/view-photo`}
                    exact
                    component={AuditStartAuditingRequirementsPicturesView}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/signatures`}
                    exact
                    component={AuditSignatures}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/signatures/review`}
                    exact
                    component={AuditSignaturesReview}
                    isPrivate
                    permissions={[31, 32]}
                />
                {/* NCOM previous */}
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/ncom-previous`}
                    exact
                    component={AuditNCOMPrevious}
                    isPrivate
                    permissions={[31, 32]}
                />
                <PermittedRoute
                    path={`${baseUrl}/profile-auditor/start-audit/ncom-previous/details`}
                    exact
                    component={AuditNCOMPreviousDetails}
                    isPrivate
                    permissions={[31, 32]}
                />

                {/* TODO PERFIL RESPONSÁVEL PELO PROJETO */}
                {/* Home */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-process`}
                    exact
                    component={AuditResponsibleProcess}
                    isPrivate
                    permissions={[37]}
                />
                {/* Details */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-process/awaiting-analysis`}
                    exact
                    component={AuditResponsibleProcessDetails}
                    isPrivate
                    permissions={[37]}
                />
                {/* nc/om apontadas */}
                <PermittedRoute
                    path={`${baseUrl}/responsible-process/awaiting-analysis/indicated`}
                    exact
                    component={IndicatedNCOMResponsibleProcess}
                    isPrivate
                    permissions={[37]}
                />

                {/* TODO ROTAS COMUNS */}
                {/* Agenda */}
                <PermittedRoute
                    path={`${baseUrl}/agenda`}
                    exact
                    component={Agenda}
                    isPrivate
                />
                {/* calendar audit details */}
                <PermittedRoute
                    path={`${baseUrl}/details`}
                    exact
                    component={AuditDetails}
                    isPrivate
                />
                {/* schedule */}
                <PermittedRoute
                    path={`${baseUrl}/schedule`}
                    exact
                    component={Schedule}
                    isPrivate
                    permissions={[25, 26]}
                />
                {/* resume schedule */}
                <PermittedRoute
                    path={`${baseUrl}/schedule/resume`}
                    exact
                    component={ScheduleResumeAudit}
                    isPrivate
                    permissions={[25, 26]}
                />
                {/* new-audit */}
                <PermittedRoute
                    path={`${baseUrl}/new-audit`}
                    exact
                    component={AuditNew}
                    isPrivate
                    permissions={[23, 27]}
                />
                {/* edit-audit */}
                <PermittedRoute
                    path={`${baseUrl}/edit-audit`}
                    exact
                    component={AuditEdit}
                    isPrivate
                    permissions={[23, 27]}
                />
                {/* resume new-audit */}
                <PermittedRoute
                    path={`${baseUrl}/new-audit/resume`}
                    exact
                    component={ResumeAuditNew}
                    isPrivate
                    permissions={[23, 27]}
                />
                {/* view one photo */}
                <PermittedRoute
                    path={`${baseUrl}/view-photo`}
                    exact
                    component={ViewOnePhoto}
                    isPrivate
                />
            </Switch>
        </>
    );
};

export default Audit;

import AuthStore from './stores/auth';
import ProfileStore from './stores/profile';
import SessionStore from './stores/session';
import UserStore from './stores/user';
import PermissionStore from './stores/permission';
import NewActionStore from './stores/new-action';
import CompleteActionStore from './stores/action-plan/complete-action';
/* Safety Walk & Talk */
import NewRegisterSWT from './stores/safety-walk-talk/new-register';
import QualityAnalysisSWT from './stores/safety-walk-talk/quality-analysis';
import HomeStore from './stores/safety-walk-talk/home';
/* Observer EHS */
import NewRegisterObserver from './stores/observer/new-register';
import HomeObserverStore from './stores/observer/home';
import ClassificationStore from './stores/observer/classification';

/* Audit */
import NewAudit from './stores/audit/new-audit';
import DealtNcom from './stores/audit/dealt-ncom';
import AuditSesStore from './stores/audit/ses';
import Auditing from './stores/audit/auditing';
import Signatures from './stores/audit/signatures';
import ScheduleAuditHeadQuality from './stores/audit/schedule-head-quality';
import ConfirmedScheduleAuditHeadQuality from './stores/audit/confirmed-schedule-head-quality';
import AuditProfileAuditorStore from './stores/audit/audit-profile-auditor';

/* Inspection & Assessment */
import HomeInspectionStore from './stores/inspection-assessment/home';
import TeamInspectionStore from './stores/inspection-assessment/team';
import InspectionScheduleStore from './stores/inspection-assessment/inspection-schedule';
import InspectionQuestionsStore from './stores/inspection-assessment/inspection-questions';

import * as Training from './stores/training';

export const stores = {
    AuthStore,
    ProfileStore,
    UserStore,
    SessionStore,
    NewActionStore,
    CompleteActionStore,
    NewRegisterSWT,
    QualityAnalysisSWT,
    HomeStore,
    NewRegisterObserver,
    HomeObserverStore,
    NewAudit,
    DealtNcom,
    AuditSesStore,
    ClassificationStore,
    PermissionStore,
    Auditing,
    Signatures,
    ScheduleAuditHeadQuality,
    ConfirmedScheduleAuditHeadQuality,
    AuditProfileAuditorStore,
    HomeInspectionStore,
    TeamInspectionStore,
    InspectionScheduleStore,
    InspectionQuestionsStore,
    ...Training
};

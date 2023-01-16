import { makeAutoObservable } from 'mobx';
import {
    getInfoAuditByIdForSchedule,
    getResponsibleForScheduleAudit,
    createAuditSchedule
} from '../../../services/endpoints/audit/head-quality/infos-audit-schedule';
// import UserStore from '../user';

class ConfirmedScheduleAuditHeadQuality {
    // DATA API
    auditInfos = {};
    responsible = [];
    // DATA STORE
    auditInfosForPost = {
        date: null,
        startTime: null,
        endTime: null,
        qtdContributors: null
    };
    responsibleForPost = [];

    constructor() {
        makeAutoObservable(this);
    }

    createAuditSchedule = () => {
        const response = createAuditSchedule({
            ...this.auditInfosForPost,
            responsible: this.auditInfosForPost
        });
        return response;
    };

    setAuditInfosForPost = (data) => {
        this.auditInfosForPost = data;
    };

    setResponsibleForPost = (data) => {
        this.responsibleForPost = data;
    };

    getResponsibleForScheduleAudit = async (data) => {
        const result = await getResponsibleForScheduleAudit(data);
        this.responsible = result;
        return result;
    };

    getAuditForScheduleById = async (id) => {
        const result = await getInfoAuditByIdForSchedule(id);
        this.auditInfos = result;
        return result;
    };

    existAuditInfosForPost = () => {
        if (
            !this.auditInfosForPost.date ||
            !this.auditInfosForPost.startTime ||
            !this.auditInfosForPost.endTime ||
            !this.auditInfosForPost.qtdContributors
        ) {
            return false;
        }
        return true;
    };

    reset = () => {
        this.auditInfos = {};
        this.auditInfosForPost = {};
        this.responsibleForPost = [];
    };
}

export default new ConfirmedScheduleAuditHeadQuality();

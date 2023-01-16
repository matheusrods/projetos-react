import { flow, makeAutoObservable } from 'mobx';
import moment from '../../../config/moment';
import { toast } from 'react-toastify';
import { getCriticismOptions } from '../../../services/endpoints/actions';
import { getProgrammingAudits, postAnnotationsProgrammingAudit, postRequirementsThemeAudited, postPointedRequirementsThemeAudited } from '../../../services/endpoints/audit/profile-auditor';
import { getAuditRequirements, transformAnnotation, transformResponseAudit, transformThemeAudited } from '../../../services/transforms/audits';

class AuditProfileAuditorStore {
    programmings = [];
    stateFetch = 'pending';

    programmingInEditing = null;
    stepThemeIndex = 0;
    titlePhotoInEditingIndex = 0;
    requirementPhotoInEditingIndex = 0;
    photoInEditingIndex = 0;
    themesInAuditing = [];
    criticalities = [];
    themeInDeal = [];
    programmingInView = null;

    signaturesAudit = [];

    constructor() {
        makeAutoObservable(this, {
            fetch: flow
        });
    }

    get annotations() {
        if (!this.programmingInEditing) {
            return [];
        }

        const { programmingInEditing: { annotations = [] } } = this;

        return annotations;
    }

    consultDataForAudit = async (clientId = null) => {
        let typeToast = 'warning';

        try {
            if (!clientId) {
                typeToast = 'error';

                throw new Error('Não foi possível consultar os requisitos a serem auditados!');
            }

            const { criticismOptions = [] } = await getCriticismOptions({
                onlyActive: true,
                clientId: clientId,
                appId: 4
            });

            if (criticismOptions.length === 0) {
                throw new Error('Os valores da criticidade não foram configurados!');
            }

            const themes = getAuditRequirements(
                this.programmingInEditing,
                criticismOptions
            );

            if (themes.length === 0) {
                throw new Error('Para essa auditoria não existe mais nenhum requisito a ser auditado!');
            }

            const indexThemeActive = themes.findIndex(theme => !theme?.submittedAudit)

            this.themesInAuditing = themes;
            this.criticalities = criticismOptions;
            this.stepThemeIndex = indexThemeActive !== -1 ? indexThemeActive : 0;

            return true;
        } catch (error) {
            if (typeToast === 'error') {
                toast.error(error.message);
            } else {
                toast.warn(error.message);
            }

            return false;
        }
    }

    updateLinkedAnnotations = (indexTheme, annotations = []) => {
        const newThemes = this.themesInAuditing;

        newThemes[indexTheme]
            .annotations = annotations;

        this.themesInAuditing = newThemes;
    }

    updateStepAuditing = (type = 'add', value = null) => {
        if (type === 'add') {
            const newStepThemeIndex = this.stepThemeIndex + 1;

            if (typeof this?.themesInAuditing[newStepThemeIndex] !== 'undefined') {
                this.stepThemeIndex = newStepThemeIndex;

                return false;
            }

            return true;
        } else if (type === 'subtract') {
            const newStepThemeIndex = this.stepThemeIndex - 1;

            if (typeof this?.themesInAuditing[newStepThemeIndex] !== 'undefined') {
                this.stepThemeIndex = newStepThemeIndex;

                return false;
            }

            return true;
        } else if (type === 'custom' && value !== null) {
            const customValue = parseInt(value);

            if (typeof this?.themesInAuditing[customValue] !== 'undefined') {
                this.stepThemeIndex = customValue;

                return false;
            }

            return true;
        }

        return false;
    }

    addUnConformed = (
        indexTheme,
        indexTitle,
        indexRequirement
    ) => {
        const newThemes = this.themesInAuditing;

        newThemes[indexTheme]
            .titles[indexTitle]
            .requirements[indexRequirement]
            .answers
            .unConformities
            .push({
                classification: 2,
                criticality: this.criticalities[0]?.startValue ? this.criticalities[0].startValue : 1,
                evidence: '',
                opportunityImprovement: ''
            });

        this.themesInAuditing = newThemes;
    }

    updateStatusRequirement = (
        indexTheme,
        indexTitle,
        indexRequirement,
        value
    ) => {
        const newThemes = this.themesInAuditing;

        newThemes[indexTheme]
            .titles[indexTitle]
            .requirements[indexRequirement]
            .status = value;

        this.themesInAuditing = newThemes;
    }

    updateAnswer = (
        typeAnswer,
        indexTheme,
        indexTitle,
        indexRequirement,
        indexClassification = null,
        field,
        value
    ) => {
        const newThemes = this.themesInAuditing;

        if (indexClassification !== null) {
            newThemes[indexTheme]
                .titles[indexTitle]
                .requirements[indexRequirement]
                .answers[typeAnswer][indexClassification][field] = value;
        } else {
            newThemes[indexTheme]
                .titles[indexTitle]
                .requirements[indexRequirement]
                .answers[typeAnswer][field] = value;
        }

        this.themesInAuditing = newThemes;
    }

    addAnnotation = async (annotation = {}) => {
        const response = await postAnnotationsProgrammingAudit(this.programmingInEditing.id, [annotation]);

        if (response.error) {
            return false;
        }

        this.setProgrammingInEditing({
            ...this.programmingInEditing,
            annotations: [
                ...this.programmingInEditing.annotations,
                ...response.data.map(transformAnnotation)
            ]
        });

        return true;
    }

    addOrUpdatePhoto = (
        indexTheme,
        file,
        indexTitle,
        indexRequirement,
        indexPhoto = null
    ) => {
        if (indexPhoto !== null) {
            const newThemes = this.themesInAuditing;

            newThemes[indexTheme]
                .titles[indexTitle]
                .requirements[indexRequirement]
                .photos[indexPhoto] = file;

            this.themesInAuditing = newThemes;
        } else {
            const newThemes = this.themesInAuditing;

            newThemes[indexTheme]
                .titles[indexTitle]
                .requirements[indexRequirement]
                .photos.push(file);

            this.themesInAuditing = newThemes;
        }
    }

    removePhoto = (indexTheme, indexTitle, indexRequirement, indexPhoto) => {
        const newThemes = this.themesInAuditing;

        newThemes[indexTheme]
            .titles[indexTitle]
            .requirements[indexRequirement]
            .photos
            .splice(indexPhoto, 1);

        this.themesInAuditing = newThemes;
    }

    setRequirementPhotoInEditingIndex = (indexTitle, indexRequirement) => {
        this.titlePhotoInEditingIndex = indexTitle;
        this.requirementPhotoInEditingIndex = indexRequirement;
    }

    setPhotoInEditingIndex = (indexPhoto) => {
        this.photoInEditingIndex = indexPhoto;
    }

    setProgrammingInEditing = (programming = {}) => {
        this.programmingInEditing = programming;
    }

    setProgrammingInView = (programming = null) => {
        this.programmingInView = programming;
    }

    setThemeInDeal = (theme = {}) => {
        this.themeInDeal = theme;
    }

    sendPointedRequirementsThemeAudited = async (responsibleUsers = []) => {
        const data = {
            codigo_auditoria_programacao: this.programmingInEditing.id,
            codigo_auditoria_programacao_tema_auditado_requisito: this.themeInDeal.requirementAuditedId,
            valida: responsibleUsers.length ? this.themeInDeal.isValid : null,
            aceita: !responsibleUsers.length ? this.themeInDeal.isAccepted : null,
            justificativa: this.themeInDeal?.justification ? this.themeInDeal?.justification : '',
            justificativa_contestacao: this.themeInDeal?.justification_contestation ? this.themeInDeal?.justification_contestation : '',
            responsaveis: responsibleUsers
        }

        const response = await postPointedRequirementsThemeAudited(data, 'auditor');

        if (response.error) {
            return false;
        }

        return true;
    }

    sendThemeAudited = async (indexTheme) => {
        const response = await postRequirementsThemeAudited(
            this.programmingInEditing.id,
            this.themesInAuditing[indexTheme],
            this.criticalities
        );

        if (response.error) {
            return false;
        }

        const themesSend = response.data.map(transformThemeAudited);

        this.programmingInEditing = {
            ...this.programmingInEditing,
            themesAudited: [
                ...this.programmingInEditing.themesAudited,
                ...themesSend
            ].sort((a, b) => a.id - b.id)
        }

        const newThemes = this.themesInAuditing;

        newThemes[indexTheme] = {
            ...newThemes[indexTheme],
            submittedAudit: true,
            submittedAuditDate: moment().format('DD/MM/YYYY'),
        };

        this.themesInAuditing = newThemes;

        return true;
    }

    resetAuditingVariables = () => {
        this.themesInAuditing = [];
        this.criticalities = [];
        this.stepThemeIndex = 0;
        this.titlePhotoInEditingIndex = 0;
        this.requirementPhotoInEditingIndex = 0;
        this.photoInEditingIndex = 0;
    }

    setSignature = (data) => {
        this.signaturesAudit = [...this.signaturesAudit, data];
    }

    resetSignatures = () => {
        this.signaturesAudit = [];
    }

    setPointedRequirement = (type, value) => {
        this.themeInDeal[type] = value
    }

    resetPointedRequirement = () => {
        this.themeInDeal.isValid = 1;
        this.themeInDeal.isAccepted = 1;
        this.themeInDeal.justification = '';
        this.themeInDeal.justification_contestation = '';
    }

    *fetch(unityId) {
        this.stateFetch = 'pending';

        try {
            if (!unityId) {
                throw new Error('Id do cliente não foi especificado!');
            }

            const response = yield getProgrammingAudits(unityId);

            if (response.error) {
                throw new Error('Falha ao buscar auditorias');
            }

            const { data = {} } = response;

            const programmings = {};

            const audits = data.map(transformResponseAudit).sort((a, b) => parseInt(b.id) - parseInt(a.id));
            const unConformities = audits.filter(audit => audit.themesAudited.some(theme => theme.requirements.some(requirement => requirement.status === 2 && requirement.deals.length === 0)));
            const contestations = unConformities.filter(audit => audit.themesAudited.some(theme => theme.requirements.some(requirement => requirement.deals.some(deal => deal.valid === 0))));

            programmings.pending = audits.filter((programming) => programming.statusAuditor.id === 5);
            programmings.inProgress = audits.filter((programming) => programming.statusAuditor.id === 6);
            programmings.completed = audits.filter((programming) => programming.statusAuditor.id === 7);
            programmings.unConformities = unConformities;
            programmings.contestations = contestations;

            this.programmings = programmings;

            this.stateFetch = 'done';
        } catch (error) {
            this.stateFetch = 'error';
        }
    }
}

export default new AuditProfileAuditorStore();

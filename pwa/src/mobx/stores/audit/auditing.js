import { makeAutoObservable, action, flow } from 'mobx';
import { toast } from 'react-toastify';
import { setAuditingRequirements } from '../../../services/endpoints/audit/auditing/auditing-requirements';
import { getNormsForAuditing } from '../../../services/endpoints/audit/auditing/norms-auditing';
import { getAnnotationsForAuditing } from '../../../services/endpoints/audit/auditing/annotations-auditing';
import { getProgrammingAudits } from '../../../services/endpoints/audit/programming-audits';
import {
    transformResponseAudit,
    transformResponseAuditDeals
} from '../../../services/transforms/audits';
import { postPointedRequirementsThemeAudited } from '../../../services/endpoints/audit/profile-auditor';

class Auditing {
    sourcePage = null;
    programmingInEditing = null;

    // DATA API
    annotations = [];
    norms = [];

    // DATA INTERN
    pictures = [];
    annotationsSelectedIds = [];
    normsOnlyPendentNotAuditedForAudit = [];

    programmings = {};
    final = [];
    initial = [];
    confirmed = [];
    state = 'pending'; // "pending", "done" or "error"

    unConformityAudit = null;
    unConformityRequirement = null;

    dealInEditing = {
        methodology: null,
        fileMethodology: null,
        participants: [],
        textInvestigation: '',
        response: {
            methodology5W2H: [
                {
                    questions5W: {
                        what: '',
                        why: '',
                        where: '',
                        when: '',
                        who: ''
                    },
                    questions2H: {
                        how: '',
                        howMuch: ''
                    }
                }
            ],
            methodology5PQs: [
                {
                    problem: '',
                    cause: '',
                    firstWhy: {
                        why: '',
                        answer: ''
                    },
                    secondWhy: {
                        why: '',
                        answer: ''
                    },
                    thirdWhy: {
                        why: '',
                        answer: ''
                    },
                    fourthWhy: {
                        why: '',
                        answer: ''
                    },
                    fifthWhy: {
                        why: '',
                        answer: ''
                    }
                }
            ],
            methodologyIshikawa: {
                typesSelected: [],
                typesResponse: {
                    method: [{ cause: '' }],
                    labor: [{ cause: '' }],
                    machine: [{ cause: '' }],
                    measure: [{ cause: '' }],
                    material: [{ cause: '' }],
                    environment: [{ cause: '' }]
                }
            }
        },
        improvementActions: []
    };

    improvementActionDealtId = null;

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            getInProgress: action
        });
    }

    // Recebe um objeto
    // Insere apenas uma anotação por vez
    setAnnotations = (data) => {
        this.annotations = [...this.annotations, data];
        // mandar para api ao invés de alterar store
    };

    // Recebe um array de objetos
    // Insere um array com varias anotações
    setManyAnnotations = (data) => {
        this.annotations = data;
    };

    // Recebe um array
    // Insere um array com varias normas
    setNormsForAudit = (data) => {
        this.norms = data;
        this.normsOnlyPendentNotAuditedForAudit = data;
    };

    // Recebe um array
    // Insere um array com varias normas
    setNormsOnlyPendentNotAuditedForAudit = (data) => {
        this.normsOnlyPendentNotAuditedForAudit = data;
    };

    // Recebe um array
    setNormsSelected = (data) => {
        this.normsSelected = this.norm;
    };

    // fetch na API
    setRequirementAudited = async (params) => {
        const result = await setAuditingRequirements();
        if (result === 200 || result === 201) {
            toast.success('Requisito auditado e salvo com sucesso', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        return result;
    };

    // Recebe um array
    // Usado para salvar os ids das anotações que foram
    // selecionadas para anexar a um requisito
    setAnnotationsSelectedIds = (ids) => {
        this.annotationsSelectedIds = ids;
    };

    setNewNorms = () => {};

    // consulta das anotações na API
    getAllAnnotations = async () => {
        const result = await getAnnotationsForAuditing();
        this.setManyAnnotations(result);
    };

    // traz as normas para auditar
    getNorms = async () => {
        const result = await getNormsForAuditing();
        this.setNormsForAudit(result);
    };

    setNewRegisterData = (params, updateLocal = true) => {
        for (const key in params) {
            this[key] = params[key];
        }
    };

    reset = () => {
        this.annotationsSelectedIds = [];
        this.pictures = [];
        this.normsOnlyPendentNotAuditedForAudit = [];
        this.annotations = [];
        this.norms = [];
    };

    resetNextRequirement = async () => {
        this.annotationsSelectedIds = [];
        this.pictures = [];
    };

    setProgrammingInEditing = (programming = {}) => {
        this.programmingInEditing = programming;
    };

    setSourcePage = (sourcePage = null) => {
        this.sourcePage = sourcePage;
    };

    setUnConformity = (unConformityAudit = null) => {
        this.unConformityAudit = unConformityAudit;
    };

    setUnConformityRequirement = (unConformityRequirement = null) => {
        this.unConformityRequirement = unConformityRequirement;
    };

    setUnConformityRequirementInDeal = (type, value) => {
        this.unConformityRequirement[type] = value;
    };

    resetUnConformityRequirementInDeal = () => {
        this.unConformityRequirement.isValid = 1;
        this.unConformityRequirement.isAccepted = 1;
        this.unConformityRequirement.justification = '';
    };

    sendUnConformityRequirementDeal = async (responsibleUsers = []) => {
        const data = {
            codigo_auditoria_programacao: this.unConformityAudit.id,
            codigo_auditoria_programacao_tema_auditado_requisito:
                this.unConformityRequirement.requirementAuditedId,
            valida: this.unConformityRequirement.isValid,
            justificativa: this.unConformityRequirement.responsibleAnalisys,
            responsaveis: responsibleUsers
        };

        const response = await postPointedRequirementsThemeAudited(
            data,
            'responsavel-processo'
        );

        if (response.error) {
            return false;
        }

        return true;
    };

    setDealInEditing = (properties = {}, reset = false) => {
        if (reset) {
            this.dealInEditing = {
                methodology: null,
                fileMethodology: null,
                participants: [],
                textInvestigation: '',
                response: {
                    methodology5W2H: [
                        {
                            questions5W: {
                                what: '',
                                why: '',
                                where: '',
                                when: '',
                                who: ''
                            },
                            questions2H: {
                                how: '',
                                howMuch: ''
                            }
                        }
                    ],
                    methodology5PQs: [
                        {
                            problem: '',
                            cause: '',
                            firstWhy: {
                                why: '',
                                answer: ''
                            },
                            secondWhy: {
                                why: '',
                                answer: ''
                            },
                            thirdWhy: {
                                why: '',
                                answer: ''
                            },
                            fourthWhy: {
                                why: '',
                                answer: ''
                            },
                            fifthWhy: {
                                why: '',
                                answer: ''
                            }
                        }
                    ],
                    methodologyIshikawa: {
                        typesSelected: [],
                        typesResponse: {
                            method: [{ cause: '' }],
                            labor: [{ cause: '' }],
                            machine: [{ cause: '' }],
                            measure: [{ cause: '' }],
                            material: [{ cause: '' }],
                            environment: [{ cause: '' }]
                        }
                    }
                },
                improvementActions: []
            };
        } else {
            this.dealInEditing = {
                ...this.dealInEditing,
                ...properties
            };
        }
    };

    setImprovementActionDealtId = (id = null) => {
        this.improvementActionDealtId = id;
    };

    addResponseInMethodology5W2H = () => {
        this.dealInEditing = {
            ...this.dealInEditing,
            response: {
                ...this.dealInEditing.response,
                methodology5W2H: [
                    ...this.dealInEditing.response.methodology5W2H,
                    {
                        questions5W: {
                            what: '',
                            why: '',
                            where: '',
                            when: '',
                            who: ''
                        },
                        questions2H: {
                            how: '',
                            howMuch: ''
                        }
                    }
                ]
            }
        };
    };

    addResponseInMethodology5PQs = () => {
        this.dealInEditing = {
            ...this.dealInEditing,
            response: {
                ...this.dealInEditing.response,
                methodology5PQs: [
                    ...this.dealInEditing.response.methodology5PQs,
                    {
                        problem: '',
                        cause: '',
                        firstWhy: {
                            why: '',
                            answer: ''
                        },
                        secondWhy: {
                            why: '',
                            answer: ''
                        },
                        thirdWhy: {
                            why: '',
                            answer: ''
                        },
                        fourthWhy: {
                            why: '',
                            answer: ''
                        },
                        fifthWhy: {
                            why: '',
                            answer: ''
                        }
                    }
                ]
            }
        };
    };

    addResponseInMethodologyIshikawa = (type) => {
        this.dealInEditing = {
            ...this.dealInEditing,
            response: {
                ...this.dealInEditing.response,
                methodologyIshikawa: {
                    ...this.dealInEditing.response.methodologyIshikawa,
                    typesResponse: {
                        ...this.dealInEditing.response.methodologyIshikawa
                            .typesResponse,
                        [type]: [
                            ...this.dealInEditing.response.methodologyIshikawa
                                .typesResponse[type],
                            {
                                cause: ''
                            }
                        ]
                    }
                }
            }
        };
    };

    updateResponseInMethodology = (
        methodologyName,
        indexQuestion,
        subtypeQuestion = null,
        questionName,
        value
    ) => {
        if (subtypeQuestion && indexQuestion !== null) {
            const response = this.dealInEditing.response;

            response[methodologyName][indexQuestion][subtypeQuestion][
                questionName
            ] = value;

            this.dealInEditing = {
                ...this.dealInEditing,
                response: response
            };
        } else if (indexQuestion !== null) {
            const response = this.dealInEditing.response;

            response[methodologyName][indexQuestion][questionName] = value;

            this.dealInEditing = {
                ...this.dealInEditing,
                response: response
            };
        } else {
            const response = this.dealInEditing.response;

            response[methodologyName][questionName] = value;

            this.dealInEditing = {
                ...this.dealInEditing,
                response: response
            };
        }
    };

    updateResponseInMethodologyIshikawa = (type, indexCause, value) => {
        const response = this.dealInEditing.response;

        response.methodologyIshikawa.typesResponse[type][indexCause].cause =
            value;

        this.dealInEditing = {
            ...this.dealInEditing,
            response: response
        };
    };

    addImprovementActionsInDealt = (actions = []) => {
        this.dealInEditing = {
            ...this.dealInEditing,
            improvementActions: [
                ...this.dealInEditing.improvementActions,
                ...actions
            ]
        };
    };

    updateImprovementAction = (id, data) => {
        this.dealInEditing = {
            ...this.dealInEditing,
            improvementActions: this.dealInEditing.improvementActions.map(
                (improvementAction) => {
                    if (id === improvementAction.id) {
                        return {
                            ...improvementAction,
                            ...data
                        };
                    }

                    return improvementAction;
                }
            )
        };
    };

    removeImprovementAction = (id) => {
        this.dealInEditing = {
            ...this.dealInEditing,
            improvementActions: this.dealInEditing.improvementActions.filter(
                (action) => action.id !== id
            )
        };
    };

    /**
     * @description
     * Alimenta store com programações de auditoria previamente registradas no portal.
     * @param {Object} options - Opções de filtros.
     * @param {Number} options.codigo_unidade
     * @param {Date} options.data_agenda
     * @param {Number} options.codigo_auditor
     * @param {Number} options.codigo_processo
     * @param {Number} options.codigo_requisito
     * @param {Number} options.codigo_area
     * @param {Number} options.codigo_responsavel_tratativa
     * @param {String} flow - Fluxo no qual o usuário se encontra
     */
    *fetch(options, flow = null) {
        this.state = 'pending';

        try {
            if (!flow) {
                throw new Error(
                    'É obrigatório passar o tipo do fluxo da aplicação'
                );
            }

            const response = yield getProgrammingAudits(options);

            if (response?.data?.error) {
                throw new Error(response.data.error);
            }

            const { data = {} } = response;

            const programmings = {};

            const programmingsData = data
                .map(transformResponseAudit)
                .sort((a, b) => parseInt(b.id) - parseInt(a.id));

            switch (flow) {
                case 'ses':
                    programmings.initial = programmingsData.filter(
                        (programming) => programming.statusSes.id === '1'
                    );

                    programmings.final = programmingsData.filter(
                        (programming) => programming.statusSes.id === '4'
                    );

                    programmings.confirmed = programmingsData.filter(
                        (programming) => programming.statusSes.id === '2'
                    );
                    break;
                case 'head-quality':
                    programmings.pendingAnalysis = programmingsData.filter(
                        (programming) =>
                            programming.statusHeadQuality.id === '3'
                    );

                    programmings.confirmed = programmingsData.filter(
                        (programming) =>
                            programming.statusHeadQuality.id === '2'
                    );

                    programmings.unConformities = programmingsData
                        .filter((programming) => programming.hasPendingDeal)
                        .sort((a, b) => parseInt(b.id) - parseInt(a.id));
                    break;
                case 'responsible-dealt':
                    programmings.unConformities = data
                        .map(transformResponseAuditDeals)
                        .filter((item) => item.dealsPending.length > 0)
                        .sort((a, b) => parseInt(b.id) - parseInt(a.id));
                    break;
                default:
                    break;
            }

            this.programmings = programmings;

            this.state = 'done';
        } catch (error) {
            this.state = 'error';
        }
    }
}

export default new Auditing();

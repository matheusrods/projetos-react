import moment from '../../config/moment';
import { transformResponse as transformResponseAction } from './action';

function sortByNumber(a, b) {
    return a.order - b.order;
};

function sortByRequirementAuditedId(a, b) {
    return a.requirementAuditedId - b.requirementAuditedId;
};

function sortByTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
};

function sortByName(a, b) {
    if (a.name > b.name) {
        return 1;
    }

    if (a.name < b.name) {
        return -1;
    }

    return 0;
};

function formatTime(time) {
    let stringTime = time.toString();

    if (stringTime.length < 4) {
        stringTime = `0${stringTime}`;
    }

    return `${stringTime.substr(0, 2)}:${stringTime.substr(2, 2)}`;
};

function getMinutesTime(time) {
    const timeFormatted = formatTime(time);

    return (Number(timeFormatted.split(':')[0]) * 60) + Number(timeFormatted.split(':')[1]);
};

function transformAnnotation(annotation = {}) {
    return {
        id: annotation?.codigo,
        title: annotation?.titulo,
        description: annotation?.descricao,
        image: annotation?.anotacao_url
    };
};

function transformThemeAudited(themeAudited = {}) {
    return {
        id: themeAudited?.codigo,
        themeId: themeAudited?.codigo_auditoria_tema,
        dateInclusion: themeAudited?.data_inclusao,
        dateInclusionFormatted: themeAudited?.data_inclusao ? moment(themeAudited.data_inclusao).format('DD/MM/YYYY') : null,
        requirements: themeAudited?.requisitos?.map(requirement => ({
            id: requirement?.codigo,
            requirementId: requirement?.codigo_auditoria_tema_requisito,
            status: requirement?.status,
            photos: requirement?.fotos?.map(photo => ({
                id: photo?.codigo,
                file: photo?.foto_url
            })) || [],
            classifications: requirement?.classificacoes?.map(classification => ({
                id: classification?.codigo,
                classification: classification?.classificacao_nao_conformidade,
                evidence: classification?.descricao_evidencias,
                opportunityImprovement: classification?.descricao_oportunidade_melhorias,
                criticality: {
                    id: classification?.criticidade?.codigo,
                    description: classification?.criticidade?.descricao,
                    color: `#${classification?.criticidade?.cor}`,
                }
            })) || [],
            deals: requirement?.tratativas?.map(deal => ({
                id: deal?.codigo,
                requirementAuditedThemeId: deal?.codigo_auditoria_programacao_tema_auditado_requisito,
                justification: deal?.justificativa,
                justificationContestation: deal?.justificativa_contestacao,
                accepted: deal?.aceita,
                valid: deal?.valida
            })) || [],
        })) || [],
        annotations: themeAudited?.anotacoes?.map(annotation => annotation.codigo_auditoria_programacao_anotacao) || []
    };
};

function transformResponseAudit(audit = {}) {
    const auditors = audit?.auditores?.map(auditor => ({
        id: auditor.codigo,
        name: auditor.nome
    })) || [];

    const auditorsLabel = auditors.length > 0
        ? auditors.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current.name;
            }

            return `${previous}, ${current.name}`;
        }, '')
        : 'Não informado';

    const responsibleProcesses = [];
    const responsibleProcessesName = [];

    const auditableProcesses = audit?.processos_auditaveis?.map((auditableProcess) => {
        const { processo: { requisitos_disponiveis = [], responsavel = null } } = auditableProcess;

        if (responsavel?.nome && !responsibleProcessesName.includes(responsavel.nome)) {
            responsibleProcessesName.push(responsavel.nome);
            responsibleProcesses.push(responsavel.codigo);
        }

        const themes = requisitos_disponiveis.reduce(
            (previous, current,) => {
                const themeIndex = previous.findIndex(theme => theme.id === current.codigo_tema);

                const orderLabelRequirement = `${current.auditoria_tema_titulo_ordem}.${current.ordem}`;

                if (themeIndex === -1) {
                    const theme = {
                        id: current.codigo_tema,
                        title: current.auditoria_tema,
                        description: current.auditoria_tema_descricao,
                        knowMore: current.auditoria_tema_saiba_mais,
                        titles: [
                            {
                                id: current.codigo_tema_titulo,
                                order: parseFloat(current.auditoria_tema_titulo_ordem),
                                orderLabel: current.auditoria_tema_titulo_ordem,
                                title: current.auditoria_tema_titulo_titulo,
                                requirements: [
                                    {
                                        id: current.codigo,
                                        order: parseFloat(orderLabelRequirement),
                                        orderLabel: orderLabelRequirement,
                                        title: current.requisito,
                                        knowMore: current.requisito_saiba_mais || null
                                    }
                                ]
                            }
                        ]
                    };

                    previous.push(theme);
                } else {
                    const titles = previous[themeIndex].titles;
                    const titleIndex = titles.findIndex(title => title.id === current.codigo_tema_titulo);

                    if (titleIndex === -1) {
                        titles.push({
                            id: current.codigo_tema_titulo,
                            order: parseFloat(current.auditoria_tema_titulo_ordem),
                            orderLabel: current.auditoria_tema_titulo_ordem,
                            title: current.auditoria_tema_titulo_titulo,
                            requirements: [
                                {
                                    id: current.codigo,
                                    order: parseFloat(orderLabelRequirement),
                                    orderLabel: orderLabelRequirement,
                                    title: current.requisito,
                                    knowMore: current.requisito_saiba_mais || null
                                }
                            ]
                        });
                    } else {
                        const requirements = titles[titleIndex].requirements;
                        const requirementIndex = requirements.findIndex(requirement => requirement.id === current.codigo);

                        if (requirementIndex === -1) {
                            requirements.push({
                                id: current.codigo,
                                order: parseFloat(orderLabelRequirement),
                                orderLabel: orderLabelRequirement,
                                title: current.requisito,
                                knowMore: current.requisito_saiba_mais || null
                            });
                        }

                        titles[titleIndex] = {
                            ...titles[titleIndex],
                            requirements: requirements.sort(sortByNumber)
                        };
                    }

                    previous[themeIndex] = {
                        ...previous[themeIndex],
                        titles: titles.sort(sortByNumber)
                    };
                }

                return previous.sort(sortByTitle);
            },
            []
        );

        const process = {
            id: auditableProcess.codigo_processo,
            description: auditableProcess.processo_descricao,
            parts: auditableProcess.processo_partes,
            responsibleId: auditableProcess.processo_responsavel,
            themes
        };

        return process;
    }) || [];

    const responsibleProcessesLabel = responsibleProcessesName.length > 0
        ? responsibleProcessesName.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current;
            }

            return `${previous}, ${current}`;
        }, '')
        : 'Não informado';

    const { hora_inicio_agenda = '', hora_fim_agenda = '' } = audit;

    const timeLabel = (hora_inicio_agenda !== '' && hora_fim_agenda !== '')
        ? ` (${hora_inicio_agenda}-${hora_fim_agenda})`
        : '';

    const responsibleProcess = audit?.responsaveis_processo?.map(responsible => ({
        id: responsible.usuario.codigo,
        name: responsible.usuario.nome
    })) || [];

    const themesAudited = audit?.temas_auditados ? audit.temas_auditados.map(transformThemeAudited) : [];

    let pendingDeal = false;

    themesAudited.forEach(theme => {
        if (pendingDeal) return;

        const { requirements = [] } = theme;

        requirements.forEach(requirement => {
            if (requirement.status === 2 && requirement.deals.length === 0) {
                pendingDeal = true;
            }
        });
    });

    const themesDetails = auditableProcesses.reduce((previous, current) => {
        const { themes } = current;

        themes.forEach(theme => {
            const { id, title, description, knowMore, titles } = theme;

            if (previous.find(i => i.id === theme.id)) {
                return;
            }

            const themeRequirements = titles.reduce((previous, current) => {
                const { requirements } = current;

                return [...previous, ...requirements]
            }, []);

            previous.push({
                id,
                title,
                description,
                knowMore,
                requirements: themeRequirements
            })
        })

        return previous;
    }, []);

    const deals = [];

    audit?.temas_auditados?.forEach(theme => {
        const { requisitos = [], data_inclusao } = theme;

        const themeDetail = themesDetails.find(i => i.id === theme.codigo_auditoria_tema);

        requisitos.forEach(requirement => {
            const {
                tratativas = [],
                codigo_auditoria_programacao_tema_auditado,
                codigo_auditoria_tema_requisito,
                fotos = []
            } = requirement;

            const requirementDetail = themeDetail?.requirements.find(r => r.id === codigo_auditoria_tema_requisito) || {};

            tratativas.forEach(deal => {
                const {
                    codigo,
                    codigo_auditoria_programacao_tema_auditado_requisito,
                    valida,
                    justificativa,
                    justificativa_contestacao,
                    arquivo_metodologia_url,
                    descricao_analise_causa,
                    status_tratativa_avaliacao,
                    resposta_formulario_metodologia,
                    participantes = [],
                    acoes_melhorias = [],
                    data_inclusao: data_inclusao_tratativa = null
                } = deal;

                deals.push({
                    id: codigo,
                    inclusionDate: data_inclusao_tratativa ? moment(data_inclusao_tratativa).format('DD/MM/YYYY') : null,
                    isValid: valida,
                    justification: justificativa,
                    justificationContestation: justificativa_contestacao,
                    requirementId: codigo_auditoria_tema_requisito,
                    themeAuditedRequirementId: codigo_auditoria_programacao_tema_auditado_requisito,
                    themeAuditedId: codigo_auditoria_programacao_tema_auditado,
                    themeAuditedCreatedAt: data_inclusao ? moment(data_inclusao).format('DD/MM/YYYY') : null,
                    themeId: themeDetail?.id,
                    themeTitle: themeDetail?.title,
                    requirementTitle: requirementDetail?.title,
                    orderLabel: requirementDetail?.orderLabel,
                    fileMethodologyUrl: arquivo_metodologia_url || null,
                    statusEvaluationDeal: status_tratativa_avaliacao,
                    descriptionAnalysisCause: descricao_analise_causa,
                    answerFormMethodology: resposta_formulario_metodologia || null,
                    responsibleProcessesLabel,
                    responsibleProcesses,
                    photos: fotos.map(photo => ({
                        id: photo.codigo,
                        file: photo.foto_url
                    })),
                    participants: participantes?.map(participant => ({
                        id: participant.codigo,
                        name: participant.nome
                    })) || [],
                    improvementActions: acoes_melhorias?.length > 0 ? transformResponseAction(acoes_melhorias) : []
                });
            });
        });
    });

    return {
        id: audit.codigo,
        type: audit?.auditoria_tipo,
        numberEmployees: audit?.numero_colaboradores,
        calendarDate: audit?.data_agenda,
        calendarDateFormatted: audit?.data_agenda ? moment(audit.data_agenda).format('DD/MM/YYYY') + timeLabel : null,
        startTime: hora_inicio_agenda,
        endTime: hora_fim_agenda,
        areaDescription: audit?.area_descricao,
        area: {
            id: audit?.codigo_area
        },
        unity: {
            id: audit?.codigo_unidade,
            fantasyName: audit?.unidade_nome_fantasia
        },
        businessUnit: {
            id: audit?.codigo_cliente_bu,
            description: audit?.bu_descricao,
            external: audit?.bu_externo,
        },
        opco: {
            id: audit?.codigo_cliente_opco,
            description: audit?.opco_descricao,
            external: audit?.opco_externo,
        },
        statusHeadQuality: {
            id: audit?.status_hq?.codigo,
            color: audit?.status_hq?.cor,
            description: audit?.status_hq?.descricao
        },
        statusSes: {
            id: audit?.status_ses?.codigo,
            color: audit?.status_ses?.cor,
            description: audit?.status_ses?.descricao
        },
        statusAuditor: {
            id: audit?.status_auditor?.codigo,
            color: audit?.status_auditor?.cor,
            description: audit?.status_auditor?.descricao
        },
        auditors,
        auditorsLabel,
        auditableProcesses,
        auditableProcessesIds: auditableProcesses?.map(item => item.id),
        auditableProcessesLabel: auditableProcesses.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current.description;
            }

            return `${previous}; ${current.description}`;
        }, ''),
        auditableRequirements: audit?.requisitos_auditaveis?.map(item => item.codigo_auditoria_tema_requisito) || [],
        responsibleProcess,
        annotations: audit?.anotacoes ? audit.anotacoes.map(transformAnnotation) : [],
        themesAudited,
        responsibleProcessesLabel,
        responsibleProcesses,
        hasPendingDeal: pendingDeal,
        themeDeals: deals.reduce((previous, current) => {
            const themeDealIndex = previous.findIndex(theme => theme.id === current.themeId);

            if (themeDealIndex !== -1) {
                previous[themeDealIndex] = {
                    ...previous[themeDealIndex],
                    deals: [
                        ...previous[themeDealIndex].deals,
                        current
                    ].sort((a, b) => parseFloat(a.orderLabel) - parseFloat(b.orderLabel))
                };

                return previous;
            } else {
                previous.push({
                    id: current.themeId,
                    title: current.themeTitle,
                    deals: [current]
                });

                return previous;
            }
        }, [])
    };
};

function transformResponseAuditDeals(audit = {}) {
    const auditors = audit?.auditores?.map(auditor => ({
        id: auditor.codigo,
        name: auditor.nome
    })) || [];

    const auditorsLabel = auditors.length > 0
        ? auditors.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current.name;
            }

            return `${previous}, ${current.name}`;
        }, '')
        : 'Não informado';

    const responsibleProcesses = [];
    const responsibleProcessesName = [];

    const auditableProcesses = audit?.processos_auditaveis?.map((auditableProcess) => {
        const { processo: { requisitos_disponiveis = [], responsavel = null } } = auditableProcess;

        if (responsavel?.nome && !responsibleProcessesName.includes(responsavel.nome)) {
            responsibleProcessesName.push(responsavel.nome);
            responsibleProcesses.push(responsavel.codigo);
        }

        const themes = requisitos_disponiveis.reduce(
            (previous, current,) => {
                const themeIndex = previous.findIndex(theme => theme.id === current.codigo_tema);

                const orderLabelRequirement = `${current.auditoria_tema_titulo_ordem}.${current.ordem}`;

                if (themeIndex === -1) {
                    const theme = {
                        id: current.codigo_tema,
                        title: current.auditoria_tema,
                        description: current.auditoria_tema_descricao,
                        knowMore: current.auditoria_tema_saiba_mais,
                        titles: [
                            {
                                id: current.codigo_tema_titulo,
                                order: parseFloat(current.auditoria_tema_titulo_ordem),
                                orderLabel: current.auditoria_tema_titulo_ordem,
                                title: current.auditoria_tema_titulo_titulo,
                                requirements: [
                                    {
                                        id: current.codigo,
                                        order: parseFloat(orderLabelRequirement),
                                        orderLabel: orderLabelRequirement,
                                        title: current.requisito,
                                        knowMore: current.requisito_saiba_mais || null
                                    }
                                ]
                            }
                        ]
                    };

                    previous.push(theme);
                } else {
                    const titles = previous[themeIndex].titles;
                    const titleIndex = titles.findIndex(title => title.id === current.codigo_tema_titulo);

                    if (titleIndex === -1) {
                        titles.push({
                            id: current.codigo_tema_titulo,
                            order: parseFloat(current.auditoria_tema_titulo_ordem),
                            orderLabel: current.auditoria_tema_titulo_ordem,
                            title: current.auditoria_tema_titulo_titulo,
                            requirements: [
                                {
                                    id: current.codigo,
                                    order: parseFloat(orderLabelRequirement),
                                    orderLabel: orderLabelRequirement,
                                    title: current.requisito,
                                    knowMore: current.requisito_saiba_mais || null
                                }
                            ]
                        });
                    } else {
                        const requirements = titles[titleIndex].requirements;
                        const requirementIndex = requirements.findIndex(requirement => requirement.id === current.codigo);

                        if (requirementIndex === -1) {
                            requirements.push({
                                id: current.codigo,
                                order: parseFloat(orderLabelRequirement),
                                orderLabel: orderLabelRequirement,
                                title: current.requisito,
                                knowMore: current.requisito_saiba_mais || null
                            });
                        }

                        titles[titleIndex] = {
                            ...titles[titleIndex],
                            requirements: requirements.sort(sortByNumber)
                        };
                    }

                    previous[themeIndex] = {
                        ...previous[themeIndex],
                        titles: titles.sort(sortByNumber)
                    };
                }

                return previous.sort(sortByTitle);
            },
            []
        );

        const process = {
            id: auditableProcess.codigo_processo,
            description: auditableProcess.processo_descricao,
            parts: auditableProcess.processo_partes,
            responsibleId: auditableProcess.processo_responsavel,
            themes
        };

        return process;
    }) || [];

    const responsibleProcessesLabel = responsibleProcessesName.length > 0
        ? responsibleProcessesName.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current;
            }

            return `${previous}, ${current}`;
        }, '')
        : 'Não informado';

    const { hora_inicio_agenda = '', hora_fim_agenda = '' } = audit;

    const timeLabel = (hora_inicio_agenda !== '' && hora_fim_agenda !== '')
        ? ` (${hora_inicio_agenda}-${hora_fim_agenda})`
        : '';

    const { temas_auditados = [] } = audit;

    const themesDetails = auditableProcesses.reduce((previous, current) => {
        const { themes } = current;

        themes.forEach(theme => {
            const { id, title, description, knowMore, titles } = theme;

            if (previous.find(i => i.id === theme.id)) {
                return;
            }

            const themeRequirements = titles.reduce((previous, current) => {
                const { requirements } = current;

                return [...previous, ...requirements]
            }, []);

            previous.push({
                id,
                title,
                description,
                knowMore,
                requirements: themeRequirements
            })
        })

        return previous;
    }, []);

    const dealsPending = [];

    temas_auditados.forEach(theme => {
        const { requisitos = [], data_inclusao } = theme;

        const themeDetail = themesDetails.find(i => i.id === theme.codigo_auditoria_tema);

        requisitos.forEach(requirement => {
            const {
                tratativas = [],
                codigo_auditoria_programacao_tema_auditado,
                codigo_auditoria_tema_requisito
            } = requirement;

            const requirementDetail = themeDetail?.requirements.find(r => r.id === codigo_auditoria_tema_requisito) || {};

            tratativas.forEach(deal => {
                const {
                    codigo,
                    codigo_auditoria_programacao_tema_auditado_requisito,
                    valida,
                    justificativa,
                    justificativa_contestacao,
                    arquivo_metodologia_url,
                    descricao_analise_causa,
                    status_tratativa_avaliacao,
                    resposta_formulario_metodologia,
                    participantes = [],
                    acoes_melhorias = []
                } = deal;

                if (valida === 1 && status_tratativa_avaliacao === 1) {
                    dealsPending.push({
                        id: codigo,
                        justification: justificativa,
                        justificationContestation: justificativa_contestacao,
                        requirementId: codigo_auditoria_tema_requisito,
                        themeAuditedRequirementId: codigo_auditoria_programacao_tema_auditado_requisito,
                        themeAuditedId: codigo_auditoria_programacao_tema_auditado,
                        themeAuditedCreatedAt: data_inclusao ? moment(data_inclusao).format('DD/MM/YYYY') : null,
                        themeTitle: themeDetail?.title,
                        requirementTitle: requirementDetail?.title,
                        orderLabel: requirementDetail?.orderLabel,
                        fileMethodologyUrl: arquivo_metodologia_url || null,
                        statusEvaluationDeal: status_tratativa_avaliacao,
                        descriptionAnalysisCause: descricao_analise_causa,
                        answerFormMethodology: resposta_formulario_metodologia || null,
                        participants: participantes?.map(participant => ({
                            id: participant.codigo,
                            name: participant.nome
                        })) || [],
                        improvementActions: acoes_melhorias?.length > 0 ? transformResponseAction(acoes_melhorias) : []
                    });
                }
            });
        });
    });

    return {
        id: audit.codigo,
        type: audit?.auditoria_tipo,
        numberEmployees: audit?.numero_colaboradores,
        calendarDate: audit?.data_agenda,
        calendarDateFormatted: audit?.data_agenda ? moment(audit.data_agenda).format('DD/MM/YYYY') + timeLabel : null,
        startTime: hora_inicio_agenda,
        endTime: hora_fim_agenda,
        areaDescription: audit?.area_descricao,
        area: {
            id: audit?.codigo_area
        },
        unity: {
            id: audit?.codigo_unidade,
            fantasyName: audit?.unidade_nome_fantasia
        },
        businessUnit: {
            id: audit?.codigo_cliente_bu,
            description: audit?.bu_descricao,
            external: audit?.bu_externo,
        },
        opco: {
            id: audit?.codigo_cliente_opco,
            description: audit?.opco_descricao,
            external: audit?.opco_externo,
        },
        auditors,
        auditorsLabel,
        auditableProcesses,
        auditableProcessesIds: auditableProcesses?.map(item => item.id),
        auditableProcessesLabel: auditableProcesses.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current.description;
            }

            return `${previous}; ${current.description}`;
        }, ''),
        responsibleProcessesLabel,
        responsibleProcesses,
        dealsPending
    };
};

function filterAuditableRequirements(audit = {}) {
    const themesFiltered = [];

    const {
        auditableProcesses = [],
        auditableRequirements = [],
        themesAudited = [],
        themeDeals = []
    } = audit;

    auditableProcesses.forEach(auditableProcess => {
        const { themes } = auditableProcess;

        themes.forEach(theme => {
            const { id, titles } = theme;

            const themeAudited = themesAudited.find(t => t.themeId === id);
            const themeDealt = themeDeals.find(t => t.id === id);

            titles.forEach(title => {
                const { requirements } = title;

                requirements.forEach(requirement => {
                    const requirementDealt = themeDealt?.deals?.find(d => d.requirementId === requirement.id) || null;

                    if (auditableRequirements.includes(requirement.id)) {
                        const requirementAudited = themeAudited?.requirements?.find(r => r.requirementId === requirement.id) || null;
                        const themeIndex = themesFiltered.findIndex(item => item.id === theme.id);

                        if (themeIndex === -1) {
                            themesFiltered.push({
                                id: theme.id,
                                title: `Requisitos ${theme.title}`,
                                titleNotFormatted: theme.title,
                                knowMore: theme.knowMore,
                                submittedAudit: !!themeAudited,
                                submittedAuditDate: themeAudited?.dateInclusionFormatted || null,
                                requirements: [
                                    {
                                        titleId: title.id,
                                        label: title.orderLabel,
                                        value: title.title,
                                        nonConformity: false,
                                        requirementDealt: null
                                    },
                                    {
                                        requirementId: requirement.id,
                                        label: requirement.orderLabel,
                                        value: requirement.title,
                                        nonConformity: requirementAudited?.status === 2 && requirementDealt ? true : false,
                                        requirementDealt: requirementDealt ? JSON.parse(JSON.stringify(requirementDealt)) : null
                                    }
                                ]
                            });
                        } else {
                            const requirementsByTheme = themesFiltered[themeIndex].requirements;
                            const titleIndex = requirementsByTheme.findIndex(item => item.titleId === title.id);

                            if (titleIndex === -1) {
                                const requirements = [
                                    {
                                        titleId: title.id,
                                        label: title.orderLabel,
                                        value: title.title,
                                        nonConformity: false,
                                        requirementDealt: null
                                    },
                                    {
                                        requirementId: requirement.id,
                                        label: requirement.orderLabel,
                                        value: requirement.title,
                                        nonConformity: requirementAudited?.status === 2 && requirementDealt ? true : false,
                                        requirementDealt: requirementDealt ? JSON.parse(JSON.stringify(requirementDealt)) : null
                                    }
                                ];

                                themesFiltered[themeIndex] = {
                                    ...themesFiltered[themeIndex],
                                    requirements: [
                                        ...themesFiltered[themeIndex].requirements,
                                        ...requirements
                                    ].sort(sortByNumber)
                                };
                            } else {
                                const requirementIndex = requirementsByTheme.findIndex(item => item.requirementId === requirement.id);

                                if (requirementIndex === -1) {
                                    themesFiltered[themeIndex] = {
                                        ...themesFiltered[themeIndex],
                                        requirements: [
                                            ...themesFiltered[themeIndex].requirements,
                                            {
                                                requirementId: requirement.id,
                                                label: requirement.orderLabel,
                                                value: requirement.title,
                                                nonConformity: requirementAudited?.status === 2 && requirementDealt ? true : false,
                                                requirementDealt: requirementDealt ? JSON.parse(JSON.stringify(requirementDealt)) : null
                                            }
                                        ].sort(sortByNumber)
                                    };
                                }
                            }
                        }
                    }
                });
            });
        });
    });

    if (themesFiltered.length === 0) {
        return filterRequirements(audit);
    }

    return themesFiltered.sort(sortByTitle);
};

function filterRequirements(audit = {}) {
    const themesFiltered = [];

    const { auditableProcesses = [] } = audit;

    auditableProcesses.forEach(auditableProcess => {
        const { themes } = auditableProcess;

        themes.forEach(theme => {
            const { titles } = theme;

            titles.forEach(title => {
                const { requirements } = title;

                requirements.forEach(requirement => {
                    const themeIndex = themesFiltered.findIndex(item => item.id === theme.id);

                    if (themeIndex === -1) {
                        themesFiltered.push({
                            id: theme.id,
                            title: `Requisitos ${theme.title}`,
                            requirements: [
                                {
                                    titleId: title.id,
                                    label: title.orderLabel,
                                    value: title.title
                                },
                                {
                                    requirementId: requirement.id,
                                    label: requirement.orderLabel,
                                    value: requirement.title
                                }
                            ]
                        });
                    } else {
                        const requirementsByTheme = themesFiltered[themeIndex].requirements;
                        const titleIndex = requirementsByTheme.findIndex(item => item.titleId === title.id);

                        if (titleIndex === -1) {
                            const requirements = [
                                {
                                    titleId: title.id,
                                    label: title.orderLabel,
                                    value: title.title
                                },
                                {
                                    requirementId: requirement.id,
                                    label: requirement.orderLabel,
                                    value: requirement.title
                                }
                            ];

                            themesFiltered[themeIndex] = {
                                ...themesFiltered[themeIndex],
                                requirements: [
                                    ...themesFiltered[themeIndex].requirements,
                                    ...requirements
                                ].sort(sortByNumber)
                            };
                        } else {
                            const requirementIndex = requirementsByTheme.findIndex(item => item.requirementId === requirement.id);

                            if (requirementIndex === -1) {
                                themesFiltered[themeIndex] = {
                                    ...themesFiltered[themeIndex],
                                    requirements: [
                                        ...themesFiltered[themeIndex].requirements,
                                        {
                                            requirementId: requirement.id,
                                            label: requirement.orderLabel,
                                            value: requirement.title
                                        }
                                    ].sort(sortByNumber)
                                };
                            }
                        }
                    }
                });
            });
        });
    });

    return themesFiltered.sort(sortByTitle);
};

function filterRequirementsByProcess(processesRequirements = {}) {
    const themesFiltered = [];

    const themes = processesRequirements;

    themes.forEach(theme => {
        const { titles } = theme;

        titles.forEach(title => {
            const { requirements } = title;

            requirements.forEach(requirement => {
                const themeIndex = themesFiltered.findIndex(item => item.id === theme.id);

                if (themeIndex === -1) {
                    themesFiltered.push({
                        id: theme.id,
                        title: `Requisitos ${theme.title}`,
                        requirements: [
                            {
                                titleId: title.id,
                                label: title.orderLabel,
                                value: title.title
                            },
                            {
                                requirementId: requirement.id,
                                label: requirement.orderLabel,
                                value: requirement.title
                            }
                        ]
                    });
                } else {
                    const requirementsByTheme = themesFiltered[themeIndex].requirements;
                    const titleIndex = requirementsByTheme.findIndex(item => item.titleId === title.id);

                    if (titleIndex === -1) {
                        const requirements = [
                            {
                                titleId: title.id,
                                label: title.orderLabel,
                                value: title.title
                            },
                            {
                                requirementId: requirement.id,
                                label: requirement.orderLabel,
                                value: requirement.title
                            }
                        ];

                        themesFiltered[themeIndex] = {
                            ...themesFiltered[themeIndex],
                            requirements: [
                                ...themesFiltered[themeIndex].requirements,
                                ...requirements
                            ].sort(sortByNumber)
                        };
                    } else {
                        const requirementIndex = requirementsByTheme.findIndex(item => item.requirementId === requirement.id);

                        if (requirementIndex === -1) {
                            themesFiltered[themeIndex] = {
                                ...themesFiltered[themeIndex],
                                requirements: [
                                    ...themesFiltered[themeIndex].requirements,
                                    {
                                        requirementId: requirement.id,
                                        label: requirement.orderLabel,
                                        value: requirement.title
                                    }
                                ].sort(sortByNumber)
                            };
                        }
                    }
                }
            });
        });
    });

    return themesFiltered.sort(sortByTitle);
};

function getAuditRequirements(audit = {}, criticalities = []) {
    const { auditableProcesses = [], auditableRequirements = [], themesAudited = [] } = JSON.parse(JSON.stringify(audit));

    const criticalityDefault = criticalities[0]?.startValue
        ? criticalities[0].startValue
        : 1

    if (auditableRequirements.length === 0 || auditableProcesses.length === 0) {
        return [];
    }

    const themesAuditRequirement = auditableProcesses.reduce((previous, current) => {
        const { themes } = current;

        themes.forEach((theme) => {
            const themeIndex = previous.findIndex(item => item.id === theme.id);

            const themeAudited = themesAudited.find(t => t.themeId === theme.id);

            if (themeIndex === -1) {
                const { titles } = theme;

                const titlesFiltered = titles
                    .map(title => {
                        const { requirements } = title;

                        return {
                            ...title,
                            requirements: requirements
                                .filter(requirement => auditableRequirements.includes(requirement.id))
                                .map(requirement => {
                                    const requirementAudited = themeAudited?.requirements
                                        ? themeAudited
                                            .requirements
                                            .find(r => r.requirementId === requirement.id)
                                        : null;

                                    if (requirementAudited) {
                                        return ({
                                            ...requirement,
                                            status: requirementAudited?.status,
                                            photos: requirementAudited?.photos?.map(photo => photo?.file) || [],
                                            answers: {
                                                conformed: {
                                                    evidence: requirementAudited?.status === 1 && requirementAudited?.classifications[0]?.evidence
                                                        ? requirementAudited.classifications[0].evidence
                                                        : '',
                                                    opportunityImprovement: requirementAudited?.status === 1 && requirementAudited?.classifications[0]?.evidence
                                                        ? requirementAudited.classifications[0].opportunityImprovement
                                                        : ''
                                                },
                                                unConformities:
                                                    requirementAudited?.status === 2
                                                        && requirementAudited?.classifications
                                                        && requirementAudited.classifications.length > 0
                                                        ? requirementAudited.classifications.map(classification => ({
                                                            classification: classification?.classification,
                                                            evidence: classification?.evidence,
                                                            opportunityImprovement: classification?.opportunityImprovement,
                                                            criticality: criticalities?.find(criticality => criticality.id === classification.criticality.id)?.startValue || criticalityDefault
                                                        }))
                                                        : [
                                                            {
                                                                classification: 2,
                                                                criticality: criticalityDefault,
                                                                evidence: '',
                                                                opportunityImprovement: ''
                                                            },
                                                        ],
                                                notApplicable: {
                                                    evidence: requirementAudited?.status === 3 && requirementAudited?.classifications[0]?.evidence
                                                        ? requirementAudited.classifications[0].evidence
                                                        : ''
                                                }
                                            }
                                        });
                                    }

                                    return ({
                                        ...requirement,
                                        status: null,
                                        photos: [],
                                        answers: {
                                            conformed: {
                                                evidence: '',
                                                opportunityImprovement: ''
                                            },
                                            unConformities: [
                                                {
                                                    classification: 2,
                                                    criticality: criticalityDefault,
                                                    evidence: '',
                                                    opportunityImprovement: ''
                                                }
                                            ],
                                            notApplicable: {
                                                evidence: ''
                                            }
                                        }
                                    });
                                })
                        };
                    })
                    .filter(title => title.requirements.length > 0)
                    .sort(sortByNumber);

                if (titlesFiltered.length > 0) {
                    previous.push({
                        ...theme,
                        themeAuditedId: themeAudited?.id,
                        submittedAudit: !!themeAudited,
                        submittedAuditDate: themeAudited?.dateInclusionFormatted || null,
                        titles: titlesFiltered,
                        annotations: themeAudited?.annotations ? themeAudited.annotations : []
                    });
                }
            }
        });

        return previous.sort(sortByTitle);
    }, []);

    return themesAuditRequirement;
};

function getAuditNCOMRequirements(audit = {}, criticalities = []) {
    const { auditableProcesses = [], auditableRequirements = [], themesAudited = [] } = JSON.parse(JSON.stringify(audit));

    const criticalityDefault = criticalities[0]?.startValue
        ? criticalities[0].startValue
        : 1

    if (auditableRequirements.length === 0 || auditableProcesses.length === 0) {
        return [];
    }

    let requirementsUnConformities = [];

    auditableProcesses.forEach((process) => {
        const { themes } = process;

        themes.forEach((theme) => {
            const themeAudited = themesAudited.find(t => t.themeId === theme.id);

            if (themeAudited) {
                const { titles } = theme;

                titles.forEach(title => {
                    const { requirements } = title;

                    requirements.filter(requirement => auditableRequirements.includes(requirement.id)).forEach(requirement => {
                        const requirementAudited = themeAudited?.requirements
                            ? themeAudited
                                .requirements
                                .find(r => r.requirementId === requirement.id)
                            : null;

                        if (requirementAudited && requirementAudited?.status === 2 && !requirementAudited.deals.length) {
                            let unConformities = []
                            if (requirementAudited?.status === 2
                                && requirementAudited?.classifications
                                && requirementAudited.classifications.length > 0)
                                unConformities = requirementAudited.classifications.map(classification => ({
                                    classification: classification?.classification,
                                    evidence: classification?.evidence,
                                    opportunityImprovement: classification?.opportunityImprovement,
                                    criticality: criticalities?.find(criticality => criticality.id === classification.criticality.id)?.startValue || criticalityDefault
                                }))

                            requirementsUnConformities.push({
                                themeId: theme.id,
                                themeTitle: theme.title,
                                titleText: title.title,
                                titleOrderLabel: title.orderLabel,
                                themeAuditedId: themeAudited?.id,
                                dateInclusionFormatted: themeAudited?.dateInclusionFormatted,
                                requirementAuditedId: requirementAudited?.id,
                                classifications: requirementAudited.classifications,
                                isValid: 1,
                                isAccepted: 1,
                                ...requirement,
                                unConformities: unConformities
                            });
                        }
                    })
                })
            }
        });
    });

    return requirementsUnConformities.sort(sortByRequirementAuditedId);
};

function getAuditContestedRequirements(audit = {}, criticalities = []) {
    const { auditableProcesses = [], auditableRequirements = [], themesAudited = [] } = JSON.parse(JSON.stringify(audit));

    if (auditableRequirements.length === 0 || auditableProcesses.length === 0) {
        return [];
    }

    let requirementsContestations = [];

    auditableProcesses.forEach((process) => {
        const { themes } = process;

        themes.forEach((theme) => {
            const themeAudited = themesAudited.find(t => t.themeId === theme.id);

            if (themeAudited) {
                const { titles } = theme;

                titles.forEach(title => {
                    const { requirements } = title;

                    requirements.forEach(requirement => {
                        const requirementAudited = themeAudited.requirements.find((auditedRequirement) =>
                            auditedRequirement.requirementId === requirement.id &&
                            auditedRequirement?.deals.find((deal) => deal?.valid === 0))

                        if (!requirementAudited)
                            return

                        const requirementsAudited = themeAudited?.requirements
                            ? themeAudited
                                .requirements
                                .find(r => r.requirementId === requirement.id)
                            : null;

                        requirementsAudited &&
                            requirementsAudited?.status === 2 &&
                            requirementAudited.deals.forEach((deal, index, requirementAudited) => {
                                deal.pending = true;

                                if (deal.requirementAuditedThemeId === requirementAudited[index - 1]?.requirementAuditedThemeId
                                    && deal.accepted === 1) {
                                    requirementAudited[index - 1].justificationContestation = deal.justificationContestation
                                    requirementAudited[index - 1].pending = false
                                } else if (deal.requirementAuditedThemeId === requirementAudited[index - 1]?.requirementAuditedThemeId
                                    && deal.valid === 0) {
                                    requirementAudited[index - 1].justificationContestation = deal.justificationContestation
                                    requirementAudited[index - 1].pending = true
                                } else {
                                    requirementsContestations.push({
                                        themeId: theme.id,
                                        themeTitle: theme.title,
                                        titleText: title.title,
                                        titleOrderLabel: title.orderLabel,
                                        themeAuditedId: themeAudited?.id,
                                        dateInclusionFormatted: themeAudited?.dateInclusionFormatted,
                                        requirementAuditedId: requirementsAudited?.id,
                                        classifications: requirementsAudited.classifications,
                                        isValid: 1,
                                        isAccepted: 1,
                                        deal: deal,
                                        ...requirement
                                    });
                                }
                            })
                    })
                })
            }
        });
    });

    return requirementsContestations.sort(sortByRequirementAuditedId);
};

function getInstructionsRequirements(audit = {}) {
    let instructionsRequirements = '';

    const themes = filterAuditableRequirements(audit);

    themes.forEach((theme) => {
        if (theme?.knowMore) {
            instructionsRequirements += ` ${theme.knowMore}`;
        }
    });

    return instructionsRequirements.length > 0 ? instructionsRequirements : null;
};

function transformResponseDealSendServer(dealId = null, dealReview = {}) {
    const {
        methodology = null,
        fileMethodology = null,
        textInvestigation = null,
        response = {},
        participants = [],
        improvementActions = []
    } = dealReview;

    let responseForm = null;

    const { methodology5W2H = [], methodology5PQs = [], methodologyIshikawa = {} } = response;

    switch (methodology) {
        // Metodologia 5W2H
        case 1:
            responseForm = methodology5W2H.map(({ questions2H, questions5W }) => ({
                questoes_2H: {
                    como: questions2H.how,
                    quanto: questions2H.howMuch
                },
                questoes_5W: {
                    o_que: questions5W.what,
                    por_que: questions5W.why,
                    onde: questions5W.where,
                    quando: questions5W.when,
                    quem: questions5W.who
                }
            }));
            break;
        // Metodologia Ishikawa
        case 2:
            const formatMethodologyIshikawa = ({ cause }) => ({
                causa: cause
            });

            const getType = (type) => {
                const types = {
                    method: 'metodo',
                    labor: 'mao_de_obra',
                    machine: 'maquina',
                    measure: 'medida',
                    material: 'material',
                    environment: 'meio_ambiente'
                };


                return types[type];
            };

            responseForm = {};

            methodologyIshikawa.typesSelected.forEach(({ id }) => {
                responseForm[getType(id)] = methodologyIshikawa.typesResponse[id].map(formatMethodologyIshikawa);
            });
            break;
        // Metodologia 5PQs
        case 3:
            responseForm = methodology5PQs.map(({ problem, cause, ...questions }) => ({
                problema: problem,
                causa: cause,
                primeiro_porque: {
                    porque: questions.firstWhy.why,
                    resposta: questions.firstWhy.answer
                },
                segundo_porque: {
                    porque: questions.secondWhy.why,
                    resposta: questions.secondWhy.answer
                },
                terceiro_porque: {
                    porque: questions.thirdWhy.why,
                    resposta: questions.thirdWhy.answer
                },
                quarto_porque: {
                    porque: questions.fourthWhy.why,
                    resposta: questions.fourthWhy.answer
                },
                quinto_porque: {
                    porque: questions.fifthWhy.why,
                    resposta: questions.fifthWhy.answer
                }
            }));
            break;
        default:
            break;
    }

    return {
        codigo_auditoria_programacao_tema_auditado_requisito_tratativa: dealId,
        resposta_formulario_metodologia: responseForm ? JSON.stringify(responseForm) : null,
        metodologia: methodology,
        arquivo_metodologia: fileMethodology,
        descricao_analise_causa: textInvestigation,
        acoes_melhorias: improvementActions
            .filter(action => !action.itsLink)
            .map(action => ({
                codigo_origem_ferramenta: action.origin.id,
                codigo_cliente_observacao: action.location.id,
                codigo_usuario_identificador: action.user.id,
                codigo_usuario_responsavel: action.responsible.id,
                codigo_pos_criticidade: action.criticism.id,
                codigo_acoes_melhorias_tipo: action.type.id,
                codigo_acoes_melhorias_status: action.status.id,
                descricao_desvio: action.descriptionDeviation,
                descricao_acao: action.descriptionAction,
                descricao_local_acao: action.descriptionLocation,
                prazo: action?.deadline ? moment(action.deadline, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
            })),
        vinculo_acoes: improvementActions
            .filter(action => action.itsLink)
            .map(({ id }) => ({ codigo: id })),
        participantes: participants.map(participantId => ({ codigo_participante: participantId }))
    };
};

/**
 * Returns formatted auditors
 * @param {Array} auditors
 * @returns {Array.<{id: Number, name: String, schedule: Array.<{id: Number, startTime: String, startTimeNumber: Number, endTime: String, endTimeNumber: Number, weekDays: Array<String>}>}>}
 */
function transformResponseAuditors(auditors = []) {
    if (!Array.isArray(auditors)) {
        return [];
    }

    const auditorsFormatted = auditors.map((auditor) => ({
        id: auditor.codigo,
        name: auditor.nome,
        schedule: auditor.agendas.map((period) => ({
            id: period.codigo,
            startTime: formatTime(period.hora_inicio),
            startTimeNumber: getMinutesTime(period.hora_inicio),
            endTime: formatTime(period.hora_fim),
            endTimeNumber: getMinutesTime(period.hora_fim),
            weekDays: period.dias_semana.split(','),
        })) || []
    }));

    return auditorsFormatted.sort(sortByName);
};

export {
    transformAnnotation,
    transformResponseAudit,
    transformResponseAuditDeals,
    transformThemeAudited,
    filterAuditableRequirements,
    filterRequirements,
    filterRequirementsByProcess,
    getInstructionsRequirements,
    getAuditRequirements,
    getAuditNCOMRequirements,
    getAuditContestedRequirements,
    transformResponseAuditors,
    transformResponseDealSendServer
};

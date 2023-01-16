import moment from '../../config/moment';

export const transformResponse = (data) => {
    const transformed = data?.map((item) => {
        try {
            const { acoes_melhorias = [] } = item;
            const detailsItem = {
                id: item.codigo_observacao,
                observationTypeCode: item.codigo_categoria_observacao,
                observationType: item.categoria_descricao,
                observationLocation: item.localidades.local_empresa_descricao,
                observationCompanyId: item.localidades.codigo_local_empresa,
                observationClientId: item.localidades.codigo_localidade,
                opco: item.localidades?.codigo_opco,
                businessUnit: item.localidades?.codigo_bu,
                localId: item.codigo_local_observacao,
                localDescription: item.local_observacao,
                observer: item.observadores,
                date: item.observacao_data,
                hour: item.observacao_hora,
                description: item.descricao,
                whatWasObserved: item.descricao_usuario_observou,
                whatWasDone: item.descricao_usuario_acao,
                whatWasSuggested: item.descricao_usuario_sugestao,
                attachments: item.anexos?.map((anexo) => ({
                    code: anexo.codigo,
                    file: anexo.arquivo,
                })),
                risksAndImpacts: item.riscos?.map((risco) => ({
                    riskClientCode: risco?.codigo,
                    riskTypeCode: risco?.codigo_risco_tipo,
                    riskTypeIcon: risco?.risco_tipo_icone,
                    riskTypeColor: risco?.risco_tipo_cor,
                    riskDescription: risco?.descricao_risco_tipo,
                    riskImpactDescription: risco?.descricao_impacto,
                    riskImpactCode: risco?.codigo_impacto,
                    dangerAspectsDescription: risco?.descricao_aspecto,
                    dangerAspectsCode: risco?.codigo_aspecto,
                })),
                status: item.status_codigo,
                statusColor: item.status_cor,
                statusDescription: item.status_descricao,
                improvementActions: acoes_melhorias.map((action) => {
                    const { solicitacoes = [] } = action;
                    const responsibleForAcceptanceProcess = solicitacoes.find(
                        (solicitation) =>
                            solicitation.status === 1 && solicitation.codigo_acao_melhoria_solicitacao_tipo === 1
                    );
                    const dynamicFields = [];
                    let complementOrigin = null;
                    try {
                        const form = JSON.parse(action.formulario_resposta);
                        if (typeof form === 'object' && !Array.isArray(form)) {
                            for (const fieldKey in form) {
                                switch (fieldKey) {
                                    case 'codigo_observacao':
                                    case 'codigo_walk_talk':
                                        complementOrigin = ` #${form[fieldKey].id}`;
                                        break;
                                    default:
                                        break;
                                }
                                dynamicFields.push({
                                    id: form[fieldKey].id,
                                    fieldName: form[fieldKey].fieldName,
                                    value: form[fieldKey]?.name ?? '#' + form[fieldKey].id,
                                });
                            }
                            dynamicFields.sort((a, b) => {
                                if (a.fieldName > b.fieldName) {
                                    return 1;
                                }
                                if (a.fieldName < b.fieldName) {
                                    return -1;
                                }
                                return 0;
                            });
                        }
                    } catch (error) {
                        console.error('Formulário não é um objeto válido!');
                    }
                    return {
                        id: action.codigo,
                        type: {
                            id: action.tipo.codigo,
                            description: action.tipo.descricao,
                        },
                        origin: {
                            id: action.origem_ferramenta.codigo,
                            description:
                                action.origem_ferramenta.descricao + (complementOrigin ? complementOrigin : ''),
                        },
                        criticism: {
                            id: action.criticidade.codigo,
                            description: action.criticidade.descricao,
                            color: '#' + action.criticidade.cor,
                        },
                        status: {
                            id: action.status.codigo,
                            description: action.status.descricao,
                            color: action.status.cor,
                        },
                        responsible: {
                            id: action?.responsavel?.codigo,
                            name: action?.responsavel?.nome
                                ? action.responsavel.nome
                                : responsibleForAcceptanceProcess?.nome_novo_usuario_responsavel
                                    ? responsibleForAcceptanceProcess.nome_novo_usuario_responsavel
                                    : 'Sem responsável',
                        },
                        location: {
                            clientId: action.localidade.codigo,
                            fullAddress: action.endereco_completo_localidade,
                        },
                        user: {
                            id: action.identificador.codigo,
                            name: action.identificador.nome,
                            avatar: action?.identificador?.dados?.avatar,
                        },
                        date: moment(action.data_inclusao).format('DD/MM/YYYY'),
                        description: action.descricao_acao,
                        deadline: action.prazo ?? 'Não informado',
                    };
                }),
                criticism: {
                    id: item?.criticidade_codigo ? parseInt(item.criticidade_codigo) : null,
                    color: item?.criticidade_cor ? '#' + item.criticidade_cor : null,
                    description: item?.criticidade_descricao ? item.criticidade_descricao : null,
                }
            };
            return detailsItem;
        } catch (error) {
            console.log('>>>>>>', error);
            return [];
        }
    });
    return transformed;
};

export const transformObserverResponseSimplified = (
    data = [],
    selected = null
) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const registers = data.map((item) =>
        observerSimplifiedFactory(item, selected)
    );

    return registers.sort((a, b) => b.id - a.id);
};

const observerSimplifiedFactory = (item, selected) => ({
    id: parseInt(item.codigo_observacao),
    status: {
        label: item?.status_descricao,
        color: item?.status_cor
    },
    observationType: item.categoria_descricao,
    criticism: {
        id: item?.criticidade_codigo ? parseInt(item.criticidade_codigo) : null,
        color: item?.criticidade_cor ? '#' + item.criticidade_cor : null,
        description: item?.criticidade_descricao
            ? item.criticidade_descricao
            : null
    },
    user: {
        avatar: item?.observadores?.avatar ?? null,
        name: item?.observadores?.nome
    },
    location: item?.localidades?.local_empresa_descricao,
    date: item?.observacao_data,
    selected: selected === parseInt(item.codigo_observacao) ? true : false
});

export const transformResponseList = (data) => {
    const transformed = data?.map((item) => {
        try {
            const detailsItem = {
                id: item.codigo_observacao,
                observationTypeCode: item.codigo_categoria_observacao,
                observationType: item.categoria_descricao,
                observationLocation: item.localidades.local_empresa_descricao,
                observationCompanyId: item.localidades.codigo_local_empresa,
                observationClientId: item.localidades.codigo_localidade,
                opco: item.localidades?.codigo_opco,
                businessUnit: item.localidades?.codigo_bu,
                localId: item.codigo_local_observacao,
                localDescription: item.local_observacao,
                date: item.observacao_data,
                hour: item.observacao_hora,
                description: item.descricao,
                whatWasObserved: item.descricao_usuario_observou,
                whatWasDone: item.descricao_usuario_acao,
                whatWasSuggested: item.descricao_usuario_sugestao,
                attachments: item.anexos?.map((anexo) => ({
                    code: anexo.codigo,
                    file: anexo.arquivo,
                })),
                status: item.status_codigo,
                statusColor: item.status_cor,
                statusDescription: item.status_descricao,
                criticism: {
                    id: item?.criticidade_codigo ? parseInt(item.criticidade_codigo) : null,
                    color: item?.criticidade_cor ? '#' + item.criticidade_cor : null,
                    description: item?.criticidade_descricao ? item.criticidade_descricao : null,
                },
                observer: [
                    {
                        name: item.observador,
                        avatar: null,
                        id: null
                    }
                ],
                responsible: {
                    id: item.usuario_responsavel_codigo,
                    name: item.usuario_responsavel_nome,
                },
                actionsUnderUser: parseInt(item?.ams_responsabilidade) && parseInt(item.ams_responsabilidade) > 0
            };

            return detailsItem;
        } catch (error) {
            console.log('>>>>>>', error);
            return [];
        }
    });
    return transformed;
};
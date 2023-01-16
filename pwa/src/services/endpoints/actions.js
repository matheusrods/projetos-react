import moment from '../../config/moment';
import { api } from '../api';
import { toast } from 'react-toastify';
import { getBase64 } from '../../utils/base64';
import _, { isNull } from 'lodash';

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const getActions = async (params = {}) => {
    try {
        const {
            initialDeadline,
            finalDeadline,
            statusId,
            originId,
            responsibleUserId,
            orderBy,
            author,
            dateType,
        } = params;

        const response = await api.get(`/acao-melhoria`, {
            params: {
                codigo_acoes_melhorias_status: statusId,
                codigo_origem_ferramenta: originId,
                codigo_usuario_responsavel: responsibleUserId,
                ordenar_por: orderBy,
                autor: author,
                inicio_periodo: initialDeadline,
                fim_periodo: finalDeadline,
                data_tipo: (initialDeadline && finalDeadline) ? dateType : null,
            }
        });

        const { result, status } = response.data;

        let data = [];
        let pendencies = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.pendencias.forEach(
                    (item) => (pendencies[item.tipo] = item.quantidade)
                );

                result.data.acoes_melhorias.forEach((item) => {
                    let complementOrigin = null;

                    try {
                        const form = JSON.parse(item.formulario_resposta);

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
                            }
                        }
                    } catch (error) {
                        console.error('Formulário não é um objeto válido!');
                    }

                    const { solicitacoes = [], matriz_responsabilidade = [] } = item;

                    const responsibleForAcceptanceProcess = solicitacoes.find(
                        (solicitation) =>
                            solicitation.status === 1 &&
                            solicitation.codigo_acao_melhoria_solicitacao_tipo ===
                            1
                    );

                    const obj = {
                        id: item.codigo,
                        origin: {
                            id: item.origem_ferramenta.codigo,
                            description: item.origem_ferramenta.descricao + ((complementOrigin) ? complementOrigin : '')
                        },
                        criticism: {
                            id: item.criticidade.codigo,
                            description: item.criticidade.descricao,
                            color: '#' + item.criticidade.cor
                        },
                        type: {
                            id: item.tipo?.codigo,
                            description: item.tipo?.descricao
                        },
                        deadline: item.prazo ?? 'Não informado',
                        date: moment(item.data_inclusao).format('DD/MM/YYYY'),
                        responsible: {
                            id: item.responsavel?.codigo,
                            name: item?.responsavel?.nome
                                ? item.responsavel.nome
                                : responsibleForAcceptanceProcess?.nome_novo_usuario_responsavel
                                    ? responsibleForAcceptanceProcess.nome_novo_usuario_responsavel
                                    : 'Sem responsável'
                        },
                        user: {
                            id: item.identificador?.codigo,
                            name: item.identificador?.nome,
                            avatar: item.identificador?.dados?.avatar
                        },
                        location: {
                            clientId: item.localidade.codigo,
                            fullAddress: item.endereco_completo_localidade
                        },
                        status: {
                            id: item.status.codigo,
                            description: item.status.descricao,
                            color: item.status.cor
                        },
                        reopened: item.analise_implementacao_valida === false,
                        responsibilityMatrix: Array.isArray(matriz_responsabilidade)
                            ? matriz_responsabilidade.map((responsible) => parseInt(responsible.codigo_usuario))
                            : [],
                        implementationAnalysisRequired: item?.necessario_implementacao,
                        efficiencyAnalysisRequired: item?.necessario_eficacia,
                    };

                    data.push(obj);
                });
            }
        }

        return {
            actions: data,
            pendencies: pendencies
        };
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao Listar Ações`);

        return {
            actions: [],
            pendencies: []
        };
    }
};

const getPendingActions = async ({ statusId }) => {
    try {
        const response = await api.get(`/acao-melhoria/pendentes/${statusId}`);

        const { result: { data: { acoes_melhorias = [], regra_acao = {} } }, status } = response.data;

        let data = [];
        let actionRule = {};

        if (status === 200 || status === 201) {
            if (acoes_melhorias && Array.isArray(acoes_melhorias)) {
                acoes_melhorias.forEach((item) => {
                    let complementOrigin = null;

                    try {
                        const form = JSON.parse(item.formulario_resposta);

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
                            }
                        }
                    } catch (error) {
                        console.error('Formulário não é um objeto válido!');
                    }

                    const { solicitacoes = [] } = item;

                    const responsibleForAcceptanceProcess = solicitacoes.find(
                        (solicitation) =>
                            solicitation.status === 1 &&
                            solicitation.codigo_acao_melhoria_solicitacao_tipo ===
                            1
                    );

                    const obj = {
                        id: item.codigo,
                        origin: {
                            id: item.origem_ferramenta.codigo,
                            description: item.origem_ferramenta.descricao + ((complementOrigin) ? complementOrigin : '')
                        },
                        criticism: {
                            id: item.criticidade.codigo,
                            description: item.criticidade.descricao,
                            color: `#${item.criticidade.cor}`
                        },
                        type: {
                            id: item.tipo?.codigo,
                            description: item.tipo?.descricao
                        },
                        deviationDescription: item.descricao_desvio,
                        deadline: item.prazo ?? 'Não informado',
                        date: moment(item.data_inclusao).format('DD/MM/YYYY'),
                        responsible: {
                            id: item.responsavel?.codigo,
                            name: item?.responsavel?.nome
                                ? item.responsavel.nome
                                : responsibleForAcceptanceProcess?.nome_novo_usuario_responsavel
                                    ? responsibleForAcceptanceProcess.nome_novo_usuario_responsavel
                                    : 'Sem responsável'
                        },
                        user: {
                            id: item.identificador?.codigo,
                            name: item.identificador?.nome,
                            avatar: item.identificador?.dados?.avatar
                        },
                        location: {
                            clientId: item.localidade.codigo,
                            fullAddress: item.endereco_completo_localidade
                        },
                        status: {
                            id: item.status.codigo,
                            description: item.status.descricao,
                            color: item.status.cor
                        },
                        reopened: item.analise_implementacao_valida === false,
                        daysToExpire: item.dias_a_vencer
                            ? parseInt(item.dias_a_vencer)
                            : null,
                        relatedActionsCount: item?.acoes_associadas
                            ? item.acoes_associadas.length
                            : null
                    };

                    data.push(obj);
                });
            }

            if (regra_acao) {
                actionRule = {
                    id: regra_acao?.id,
                    clientId: regra_acao?.codigo_cliente,
                    daysToAcceptAction: regra_acao?.dias_a_aceitar ? parseInt(regra_acao.dias_a_aceitar) : null
                };
            }
        }

        return {
            actions: data,
            actionRule
        };
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao listar ações`);

        return {
            actions: [],
            actionRule: {},
        };
    }
};

const createActions = async (actions = []) => {
    try {
        let data = [];

        actions?.forEach((item) => {
            const obj = {
                codigo_origem_ferramenta: item.origin.id,
                codigo_cliente_observacao: item.location.clientId,
                codigo_usuario_identificador: item.user.id,
                codigo_usuario_responsavel: item.responsible.id,
                codigo_pos_criticidade: item.criticism.id,
                codigo_acoes_melhorias_tipo: item.type.id,
                codigo_acoes_melhorias_status: item.status.id,
                descricao_desvio: item.deviationDescription,
                descricao_acao: item.description,
                descricao_local_acao: item.actionLocationDescription,
                prazo: item.deadline ?? null,
                codigo_cliente_opco: item?.opco ?? null,
                codigo_cliente_bu: item?.businessUnit ?? null,
                formulario_resposta: item?.dynamicFieldsAnswers && _.isObject(item.dynamicFieldsAnswers) ? JSON.stringify(item.dynamicFieldsAnswers) : "{}",
            };

            if (item?.associations && item.associations.length > 0) {
                obj.associacoes = item.associations.map((association) => {
                    return {
                        codigo_acao_melhoria: parseInt(
                            association.improvementActionId
                        ),
                        tipo_relacao: association.typeRelationship
                    };
                });
            }

            data.push(obj);
        });

        const response = await api.post(`/acao-melhoria`, data);

        const { status, result } = response.data;

        if (status === 200) {

            toast.success('Sucesso ao salvar ações de melhorias.');
            return result?.data;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error('Erro ao salvar ações, tente novamente mais tarde.');
    }
};

const alertActions = async data => {

    try {
        await api.post(`/acao-melhoria/regras_gerais`, data);
    }
    catch (error) { console.log(error) }

};

const getStatusOptions = async ({ onlyActive = false } = {}) => {
    try {
        const response = await api.get(`/acao-melhoria/status`);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        name: item.descricao,
                        active: item.ativo,
                        color: item.cor
                    };

                    data.push(obj);
                });
            }
        }

        if (onlyActive) data = data.filter((item) => item.active);

        return {
            statusOptions: data
        };
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao Listar Opções de Status`);
        return false;
    }
};

const getCriticismOptions = async ({
    onlyActive = false,
    clientId,
    appId = 1
} = {}) => {
    try {
        const response = await api.get(
            `/acao-melhoria/criticidades/${clientId}/${appId}`
        );

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        name: item.descricao,
                        color: '#' + item.cor,
                        active: item.ativo,
                        startValue: Number(item.valor_inicio),
                        endValue: Number(item.valor_fim),
                        values: _.range(
                            Number(item.valor_inicio),
                            Number(item.valor_fim) + 1
                        )
                    };

                    data.push(obj);
                });
            }
        }

        if (onlyActive) data = data.filter((item) => item.active);

        return {
            criticismOptions: data
        };
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao Listar Opções de Criticidade`);
        return false;
    }
};

const getTypesOptions = async ({ onlyActive = false, clientId = null } = {}) => {
    try {
        const response = await api.get(isNull(clientId) ? '/acao-melhoria/tipos' : `/acao-melhoria/tipos/${clientId}`);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        name: item.descricao,
                        active: item.ativo
                    };

                    data.push(obj);
                });
            }
        }

        if (onlyActive) data = data.filter((item) => item.active);

        return {
            typesOptions: data
        };
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao Listar Opções de Tipo`);
        return false;
    }
};

const getAssociationDetails = async (id) => {
    try {
        const response = await api.get(`/acao-melhoria/associada/${id}`);

        const { result, status } = response.data;

        let obj = {};

        if (status === 200 || status === 201) {
            if (result.data) {
                const { data } = result;

                obj = {
                    id: data.codigo,
                    isComprehensive: data?.abrangente,
                    mainImprovementActionId:
                        data?.codigo_acao_melhoria_principal,
                    relatedImprovementActionId:
                        data?.codigo_acao_melhoria_relacionada,
                    typeRelationship: data?.tipo_relacao
                };
            }
        }

        return obj;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao consultar ação!`);
        return false;
    }
};

const getActionDetails = async (id) => {
    try {
        const response = await api.get(`/acao-melhoria/${id}`);

        const { result, status } = response.data;

        let obj = {};

        if (status === 200 || status === 201) {
            if (result.data) {
                const { data } = result;

                const { solicitacoes = [], matriz_responsabilidade = [] } = data;

                const responsibleForAcceptanceProcess = solicitacoes.find(
                    (solicitation) =>
                        solicitation.status === 1 &&
                        solicitation.codigo_acao_melhoria_solicitacao_tipo === 1
                );

                const dynamicFields = [];
                let complementOrigin = null;

                try {
                    const form = JSON.parse(data.formulario_resposta);

                    if (typeof form === 'object' && !Array.isArray(form)) {
                        if (form?.codigo_auditoria_programacao_tema_auditado_requisito_tratativa) {
                            complementOrigin = ` #${form.codigo_auditoria_programacao_tema_auditado_requisito_tratativa}`;

                            dynamicFields.push({
                                id: form.codigo_auditoria_programacao_tema_auditado_requisito_tratativa,
                                fieldName: 'Item auditado',
                                value: form.titulo_requisito ?? '#' + form.codigo_auditoria_programacao_tema_auditado_requisito_tratativa
                            });
                        } else {
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
                                    value: form[fieldKey]?.name ?? '#' + form[fieldKey].id
                                });
                            }
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

                obj = {
                    id: data.codigo,
                    isComprehensive: data?.abrangente,
                    origin: {
                        id: data.origem_ferramenta.codigo,
                        description: data.origem_ferramenta.descricao + ((complementOrigin) ? complementOrigin : '')
                    },
                    criticism: {
                        id: data.criticidade.codigo,
                        description: data.criticidade.descricao,
                        color: '#' + data.criticidade.cor
                    },
                    type: {
                        id: data.tipo.codigo,
                        description: data.tipo.descricao
                    },
                    deadline: data.prazo ?? 'Não informado',
                    registrationDateTime: moment(data.data_inclusao).format(
                        'DD/MM/YYYY HH:MM'
                    ),
                    registrationDate: moment(data.data_inclusao).format(
                        'DD/MM/YYYY'
                    ),
                    responsible: {
                        id: data.responsavel?.codigo,
                        name: data?.responsavel?.nome
                            ? data.responsavel.nome
                            : responsibleForAcceptanceProcess?.nome_novo_usuario_responsavel
                                ? responsibleForAcceptanceProcess.nome_novo_usuario_responsavel
                                : 'Sem responsável'
                    },
                    user: {
                        id: data.identificador.codigo,
                        name: data.identificador.nome,
                        avatar: data?.identificador?.avatar
                    },
                    location: {
                        clientId: data.localidade.codigo,
                        fullAddress: data.endereco_completo_localidade
                    },
                    status: {
                        id: data.status.codigo,
                        description: data.status.descricao,
                        color: data.status.cor
                    },
                    completed: {
                        date: data?.data_conclusao
                            ? moment(data.data_conclusao).format('DD/MM/YYYY')
                            : null,
                        comments: data?.conclusao_observacao
                    },
                    description: data.descricao_acao,
                    deviationDescription: data.descricao_desvio,
                    actionLocationDescription: data.descricao_local_acao,
                    requests: data.solicitacoes.map((request) => ({
                        id: request.codigo,
                        status: request.status,
                        justification: request.justificativa_solicitacao,
                        type: parseInt(request.codigo_acao_melhoria_solicitacao_tipo),
                        newDeadline: moment(request.novo_prazo).format(
                            'DD/MM/YYYY'
                        )
                    })),
                    reopened: data.analise_implementacao_valida === false,
                    implementation_analysis: {
                        valid: data.analise_implementacao_valida,
                        description: data.descricao_analise_implementacao,
                        responsibleUser:
                            data.codigo_usuario_responsavel_analise_implementacao,
                        analysisDate: data.data_analise_implementacao
                    },
                    effectiveness_analysis: {
                        valid: data.analise_eficacia_valida,
                        description: data.descricao_analise_eficacia,
                        responsibleUser:
                            data.codigo_usuario_responsavel_analise_eficacia,
                        analysisDate: data.data_analise_eficacia
                    },
                    relatedRecords: data.acoes_associadas.map((association) => {
                        return {
                            id: association.codigo,
                            improvementActionId: association.acao.codigo,
                            originDescription:
                                association.acao.origem_ferramenta.descricao,
                            typeRelationship: association.tipo_relacao,
                            isComprehensive: association?.abrangente,
                            completeAction: {
                                id: association?.acao?.codigo,
                                origin: {
                                    id:
                                        association?.acao?.origem_ferramenta
                                            ?.codigo,
                                    description:
                                        association?.acao?.origem_ferramenta
                                            ?.descricao
                                },
                                type: {
                                    id: association?.acao?.tipo.codigo,
                                    description:
                                        association?.acao?.tipo.descricao
                                },
                                user: {
                                    id: association?.acao?.identificador.codigo,
                                    name: association?.acao?.identificador.nome,
                                    avatar:
                                        association?.acao?.identificador?.dados
                                            ?.avatar
                                },
                                registrationDate:
                                    association?.acao?.data_inclusao &&
                                    moment(
                                        association.acao.data_inclusao
                                    ).format('DD/MM/YYYY'),
                                description: association?.acao?.descricao_acao
                            }
                        };
                    }),
                    dynamicFields,
                    responsibilityMatrix: Array.isArray(matriz_responsabilidade)
                        ? matriz_responsabilidade.map((responsible) => parseInt(responsible.codigo_usuario))
                        : [],
                    implementationAnalysisRequired: data?.necessario_implementacao,
                    efficiencyAnalysisRequired: data?.necessario_eficacia,
                };

                if (obj.completed && data.anexos.length > 0) {
                    let photos = [];
                    let documents = [];

                    data.anexos.forEach((item) => {
                        const file = {
                            id: item.codigo,
                            filename: item.arquivo_nome,
                            size: item.arquivo_tamanho,
                            type: item.arquivo_tipo,
                            url: item.arquivo_url
                        };

                        if (file.type === 1) {
                            photos.push(file);
                        } else if (file.type === 2) {
                            documents.push(file);
                        }
                    });

                    obj.completed.photos = photos;
                    obj.completed.documents = documents;
                }

                return obj;
            }

            return false;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao consultar ação!`);
        return false;
    }
};

const updateAction = async (id, data) => {
    const { conclusionDate, conclusionComments, statusId, deadline } = data;

    try {
        if (!id)
            throw new Error(
                'Id da ação de melhoria não foi especificado! - endpoints/actions'
            );

        const response = await api.put(`/acao-melhoria/${id}`, {
            conclusao_observacao: conclusionComments,
            data_conclusao: conclusionDate,
            codigo_acoes_melhorias_status: statusId,
            prazo: deadline
        });

        const { status } = response.data;

        if (status === 200 || status === 201) {
            toast.success(`Ação de melhoria atualizada com sucesso!`);
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao atualizar ação de melhoria`);
        return false;
    }
};

const updateActionCoverage = async (id, coverage) => {
    try {
        if (!id)
            throw new Error(
                'Id da ação de melhoria não foi especificado! - endpoints/actions'
            );

        const response = await api.put(`/acao-melhoria/${id}`, {
            abrangente: coverage
        });

        const { status } = response.data;

        if (status === 200 || status === 201) {
            toast.success(`Ação de melhoria atualizada com sucesso!`);
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao atualizar ação de melhoria`);
        return false;
    }
};

const updateAnalysis = async (id, data) => {
    const { implementationAnalysis, effectivenessAnalysis } = data;

    try {
        if (!id)
            throw new Error(
                'Id da ação de melhoria não foi especificado! - endpoints/actions'
            );

        let obj = {};

        if (implementationAnalysis) {
            obj = {
                ...obj,
                analise_implementacao_valida:
                    implementationAnalysis.approved === 1 ? 1 : 0,
                descricao_analise_implementacao:
                    implementationAnalysis.analysis,
                codigo_usuario_responsavel_analise_implementacao:
                    implementationAnalysis.responsible.id,
                data_analise_implementacao: moment(
                    implementationAnalysis.date
                ).format('YYYY-MM-DD')
            };
        }

        if (effectivenessAnalysis) {
            obj = {
                ...obj,
                analise_eficacia_valida:
                    effectivenessAnalysis.approved === 1 ? 1 : 0,
                descricao_analise_eficacia: effectivenessAnalysis.analysis,
                codigo_usuario_responsavel_analise_eficacia:
                    effectivenessAnalysis.responsible.id,
                data_analise_eficacia: moment(
                    effectivenessAnalysis.date
                ).format('YYYY-MM-DD')
            };
        }

        const response = await api.put(`/acao-melhoria/${id}`, { ...obj });

        const { status } = response.data;

        if (status === 200 || status === 201) {
            toast.success(`Ação de melhoria atualizada com sucesso!`);

            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao atualizar ação de melhoria`);
        return false;
    }
};

const updateAssociation = async (id, isComprehensive) => {
    try {
        if (!id)
            throw new Error(
                'Id da ação de melhoria relacionada não foi especificada! - endpoints/actions'
            );

        const response = await api.put(`/acao-melhoria/associada/${id}`, {
            abrangente: isComprehensive
        });

        const { status } = response.data;

        if (status === 200 || status === 201) {
            toast.success('Ação de melhoria atualizada com sucesso!');

            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao atualizar ação de melhoria');
        return false;
    }
};

const getFilesByActionId = async (id) => {
    try {
        if (!id)
            throw new Error(
                'Id da ação de melhoria não foi especificado! - endpoints/actions'
            );

        const response = await api.get(`/acao-melhoria/${id}/anexos`);

        const { result, status } = response.data;

        let files = [];
        let images = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        filename: item.arquivo_nome,
                        size: item.arquivo_tamanho,
                        type: item.arquivo_tipo,
                        url: item.arquivo_url,
                        base64: item.arquivo
                    };

                    if (obj.type === 1) {
                        images.push(obj);
                    } else if (obj.type === 2) {
                        files.push(obj);
                    }
                });
            }
        }

        return {
            files: files,
            images: images
        };
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao listar anexos da ação de melhoria`);
        return false;
    }
};

const createFile = async ({ actionId, fileType, file }) => {
    let fileBase64;
    let fileSize = formatBytes(file.size);

    await getBase64(file).then((result) => {
        fileBase64 = result;
    });

    try {
        const response = await api.post(`/acao-melhoria/anexos`, {
            arquivo_nome: file.name,
            arquivo_tamanho: fileSize,
            arquivo_tipo: fileType,
            arquivo: fileBase64,
            codigo_acao_melhoria: actionId
        });

        const { result, status } = response.data;

        if (status === 200 || status === 201) {
            if (result.data) {
                const {
                    arquivo_nome,
                    arquivo_tamanho,
                    arquivo_tipo,
                    arquivo_url,
                    codigo,
                    arquivo
                } = result.data;

                return {
                    id: codigo,
                    filename: arquivo_nome,
                    size: arquivo_tamanho,
                    type: arquivo_tipo,
                    url: arquivo_url,
                    base64: arquivo
                };
            }
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao enviar anexo de ação de melhoria`);
        return false;
    }
};

const updateFile = async ({ fileId, fileType, fileBase64 }) => {
    try {
        let fileSize = null;

        if (fileBase64) {
            const fileSizeBytes =
                fileBase64.length * (3 / 4) -
                (fileBase64.slice(-2) === '==' ? 2 : 1); // formula to get file size by base64 string;
            fileSize = formatBytes(fileSizeBytes);
        }

        const response = await api.put(`/acao-melhoria/anexos/${fileId}`, {
            arquivo_tipo: fileType,
            arquivo: fileBase64,
            arquivo_tamanho: fileSize
        });

        const { status } = response.data;

        if (status === 200 || status === 201) {
            toast.success('Anexo atualizado com sucesso!');
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao atualizar anexo de ação de melhoria`);
        return false;
    }
};

const deleteFile = async (fileId) => {
    try {
        const response = await api.delete(`/acao-melhoria/anexos/${fileId}`);

        const { result, status } = response.data;

        if (status === 200 || status === 201) {
            if (result.data.message) {
                toast.success(result.data.message);
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao deletar anexo de ação de melhoria`);
        return false;
    }
};

export {
    getActions,
    getPendingActions,
    createActions,
    getStatusOptions,
    getActionDetails,
    updateAction,
    getCriticismOptions,
    getTypesOptions,
    getFilesByActionId,
    createFile,
    updateFile,
    deleteFile,
    updateAnalysis,
    updateAssociation,
    getAssociationDetails,
    updateActionCoverage,
    formatBytes,
    alertActions
};

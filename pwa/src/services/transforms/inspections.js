import moment from '../../config/moment';

function transformPendingInspectionsData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo_inspecao,
        inspectionId: item.inspecao.codigo,
        actionId: item.codigo_inspecao,
        observedItem: item.inspecao.nome_plano_inspecao,
        linkObservedItem: {
            id: item.codigo_questao,
            name: item.inspecao.nome_plano_inspecao ?? '-',
        },
        origin: {
            id: item.null,
            description: item.origem_ferramenta
        },
        criticism: {
            id: null,
            description: item.criticidade,
            color: '#' + item.cor_criticidade
        },
        type: {
            id: null,
            description: item.acao_melhoria_tipo
        },
        deadline: item.prazo ?? 'Não informado',
        responsible: {
            id: null,
            name: item.usuario_responsavel
        },
        status: {
            id: null,
            description: item.acoes_melhorias_status,
            color: item.cor_acao_melhoria_status
        },
        description: item.descricao_acao
    }));
}
function tranformInspectionsData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        name: item.nome_plano_inspecao,
        createdAt: moment(item.data_inclusao).format('DD/MM/YYYY HH:mm'),
        updatedAt: item.data_alteracao !== null ? moment(item.data_alteracao).format('DD/MM/YYYY HH:mm') : null,
        status: item.codigo_status_inspecao,
        statusName: item.status_inspecao,
        criticality: item.criticidade,
        opcoId: item.codigo_cliente_opco,
        buId: item.codigo_cliente_bu,
        idUser: item.codigo_usuario_inclusao,
        validity: item.data_validade_inspecao !== null ? moment(item.data_validade_inspecao).format('DD/MM/YYYY') : '-',
        diff: moment(item.data_validade_inspecao).diff(moment().startOf('day'), 'days'),
        typeId: item.codigo_tipo_inspecao,
        typeName: item.tipo_inspecao,
        responsibleId: item.codigo_responsavel,
        responsibleName: item.responsavel,
        local: item.local_inspecao,
        forms: item.Formulario.map((form) => {
            return {
                id: form.codigo_form_inspecao,
                name: form.nome_form_inspecao,
                answered: form.respondido,
                frequency: form.periodicidade !== null ? form.periodicidade > 1 ? `${form.periodicidade} meses` : `${form.periodicidade} mês` : 'Não definido',
            }
        }),
        process: item.Processo.map((process) => {
            return {
                id: process.codigo_processo,
                name: process.processo,
                areaId: process.codigo_area ?? null,
                areaName: process.area_processo
            }
        }),
    }));
}

function transformMyTeamInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        name: item.nome,
        role: item.permissao,
    }));
}

function transformAreaInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        idArea: item.codigo_area_processo,
        name: `${item.area} - ${item.descricao}`,
        description: item.descricao,
        process: item.partes_do_processo,
        area: `${item.area} - ${item.descricao}`,
    }));
}
function transformTipoInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        name: item.descricao,
    }));
}

function transformFormInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        description: item.descricao,
        name: `${item.descricao} - Validade: ${item.validade !== null ? item.validade === 1 ? `${item.validade} mês` : `${item.validade} meses` : 'Não informado'}`,
        validity: item.validade,
        answerType: item.tipo_resposta,
    }));
}

function transformBasicInfoInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        name: item.descricao,
    }));
}

function transformResponsibleInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        name: item.nome,
    }));
}

function transformInsertResponseInspectionData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,
    };
}

function transformInspectionData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,
        name: data.nome_plano_inspecao,
        equipmentCode: data.codigo_equipamentos_inspecao,
        bu: data.codigo_cliente_bu,
        opco: data.codigo_cliente_opco,
        typeName: data.tipo_inspecao,
        typeId: data.codigo_tipo_inspecao,
        validity: data.data_validade_inspecao !== null ? moment(data.data_validade_inspecao).format('DD/MM/YYYY') : '-',
        responsibleName: data.responsavel,
        updateDate: data.data_alteracao !== null ? moment(data.data_alteracao).format('DD/MM/YYYY') : '-',
        atendimento: data.atendimento,
        conformes: data.conformes,
        parecer: data.parecer,
        statusName: data.status_inspecao,
        resultTotal: data.multi_atendimento !== '' ? data.multi_atendimento : '-',
        local: data.local_inspecao,
        actions: data.AcaoMelhoria.map((item) => {
            return {
                id: item.codigo_acao_melhoria,
                linkObservedItem: {
                    id: item.codigo_questao,
                    name: item.descricao_questao ?? '-',
                },
                origin: {
                    id: item.null,
                    description: item.origem_ferramenta
                },
                criticism: {
                    id: null,
                    description: item.criticidade,
                    color: '#' + item.cor_criticidade
                },
                type: {
                    id: null,
                    description: item.acao_melhoria_tipo
                },
                deadline: item.prazo ?? 'Não informado',
                responsible: {
                    id: null,
                    name: item.usuario_responsavel
                },
                status: {
                    id: null,
                    description: item.acoes_melhorias_status,
                    color: item.cor_acao_melhoria_status
                },
                description: item.descricao_acao
            }
        }),
        forms: data.Formulario.map((form) => {
            return {
                id: form.codigo_form_inspecao,
                name: form.nome_form_inspecao,
                type: form.tipo_resposta,
                answered: form.respondido,
                frequency: form.periodicidade !== null ? form.periodicidade > 1 ? `${form.periodicidade} meses` : `${form.periodicidade} mês` : 'Não definido',
                attendance: form.atendimento,
                conform: form.conformes,
                sight: form.parecer,
                sightDescription: form.descricao_parecer,
                aspectBlue: form.nota_azul,
                aspectRed: form.nota_vermelho,
                answers: form.respostas.map((answer) => {
                    return {
                        id: answer.codigo,
                        relatedFormId: answer.codigo_form_relacionado,
                        typeId: answer.tipo_resposta,
                        questionId: answer.codigo_questao,
                        order: answer.ordem,
                        conform: answer.conforme,
                        notApply: answer.nao_aplica,
                        deviance: answer.desvio,
                        criticism: answer.criticidade,
                        evidences: answer.evidencia_que_justifica,
                        grade: answer.nota,
                        aspectBlue: answer.aspecto_azul,
                        aspectRed: answer.aspecto_vermelho,
                        commentObservation: answer.comentarios_observacoes,
                        comment: answer.comentarios_observacoes,
                        answer: answer.resposta,
                        question: answer.questao,
                        files: answer.Anexos.map((file) => {
                            return {
                                id: answer.codigo,
                                url: answer.url,
                            }
                        }),
                    }
                }),
            }
        }),
        process: data.Processo.map((process) => {
            return {
                id: process.codigo_processo,
                name: process.processo,
                areaId: process.codigo_area,
                areaName: process.area_processo
            }
        }),
    };
}

function transformInspectionUpdateData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,
        name: data.nome_plano_inspecao,
        equipmentCode: data.codigo_equipamentos_inspecao,
        typeName: data.tipo_inspecao,
        typeId: data.codigo_tipo_inspecao,
        validity: data.data_validade_inspecao !== null ? moment(data.data_validade_inspecao).format('DD/MM/YYYY') : '-',
        responsibleName: data.responsavel,
        atendimento: data.atendimento,
        conformes: data.conformes,
        parecer: data.parecer,
        statusName: data.status_inspecao,
        local: data.local_inspecao,
    };
}

function transformQuestionsListInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo_questao,
        formId: item.codigo_form_inspecao,
        order: item.ordem,
        title: item.titulo,
        question: item.questao,
        info: item.informacao,
        knowMore: item.saiba_mais,
        filePath: item.caminho_arquivo_anexo,
        required: item.resposta_obrigatorio,
        commentRequired: item.comentario_obrigatorio,
        fileRequired: item.anexo_obrigatorio,
        type: item.tipo_resposta,
        grade: item.intervalo_nota,
        aspectDescription: item.aspecto,
        aspectId: item.codigo_aspecto,
        linked: item.vinculo.map((link) => {
            return {
                id: link.codigo_questao,
                formId: link.codigo_form_inspecao,
                linkQuestionId: item.codigo_questao,
                order: link.ordem,
                title: link.titulo,
                question: link.questao,
                info: link.informacao,
                knowMore: link.saiba_mais,
                filePath: link.caminho_arquivo_anexo,
                required: link.resposta_obrigatorio,
                commentRequired: link.comentario_obrigatorio,
                fileRequired: link.anexo_obrigatorio,
                type: link.tipo_resposta,
                grade: link.intervalo_nota,
                aspectDescription: link.aspecto,
                aspectId: link.codigo_aspecto,
            }
        }),
    }));
}

function transformPhotoInspectionData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,
        url: data.url,
        answerId: data.codigo_form_resposta,
    };
}
function transformSignatureInspectionData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,
        url: data.url,
        responsible: data.responsavel,
    };
}

function transformAnswerInspectionData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,

    };
}
function transformActionQuestionInspectionData(data = {}){
    if (!data) {
        return {};
    }
    return {
        id: data.codigo,
        actionId: data.codigo_acao,
        inspectionId: data.codigo_inspecao,
        questionId: data.codigo_questao,
    };
}

function transformImprovementActionInspectionData(data = []){
    if (!Array.isArray(data)) {
        return {};
    }
    return {
        id: data[0].codigo
    };
}

function transformAnsweredQuestionListInspectionData(data = []){
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item) => ({
        id: item.codigo,
        formId: item.codigo_form_relacionado,
        inspectionId: item.codigo_inspecao,
        typeId: item.tipo_resposta,
        questionId: item.codigo_questao,
        order: item.ordem,
        conform: item.conforme,
        notApply: item.nao_aplica,
        deviance: item.desvio,
        criticism: item.criticidade,
        evidences: item.evidencia_que_justifica,
        grade: item.nota,
        aspectBlue: item.aspecto_azul,
        aspectRed: item.aspecto_vermelho,
        commentObservation: item.comentarios_observacoes,
        comment: item.comentarios_observacoes
    }));
}
export {
    tranformInspectionsData,
    transformPendingInspectionsData,
    transformMyTeamInspectionData,
    transformAreaInspectionData,
    transformTipoInspectionData,
    transformFormInspectionData,
    transformBasicInfoInspectionData,
    transformResponsibleInspectionData,
    transformInsertResponseInspectionData,
    transformInspectionData,
    transformInspectionUpdateData,
    transformQuestionsListInspectionData,
    transformPhotoInspectionData,
    transformAnswerInspectionData,
    transformSignatureInspectionData,
    transformActionQuestionInspectionData,
    transformImprovementActionInspectionData,
    transformAnsweredQuestionListInspectionData
};

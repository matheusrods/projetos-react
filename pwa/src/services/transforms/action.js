import moment from '../../config/moment';

export const transformResponse = (data) => {
    const transformed = data.map((item) => {
        const { solicitacoes } = item;

        const responsibleForAcceptanceProcess = solicitacoes.find(
            (solicitation) =>
                solicitation.status === 1
                && solicitation.codigo_acao_melhoria_solicitacao_tipo === 1
        );

        const detailsItem = {
            id: item.codigo,
            origin: {
                id: item.origem_ferramenta.codigo,
                description: item.origem_ferramenta.descricao
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
            description: item.descricao_acao
        };

        return detailsItem;
    });

    return transformed;
};

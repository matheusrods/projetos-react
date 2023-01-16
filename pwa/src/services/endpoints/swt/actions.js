import { api } from '../../api';
import { toast } from 'react-toastify';
import moment from '../../../config/moment';

const getActions = async (params = {}) => {
    try {
        const {
            initialDeadline,
            finalDeadline,
            statusId,
            originId,
            responsibleUserId,
            orderBy,
            author
        } = params;

        const response = await api.get(`/acao-melhoria`, {
            params: {
                codigo_acoes_melhorias_status: statusId,
                codigo_origem_ferramenta: originId,
                codigo_usuario_responsavel: responsibleUserId,
                ordenar_por: orderBy,
                autor: author,
                inicio_periodo: initialDeadline,
                fim_periodo: finalDeadline
            }
        });

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.acoes_melhorias.forEach((item) => {
                    const {
                        complemento,
                        numero,
                        logradouro,
                        bairro,
                        cidade,
                        estado_descricao
                    } = item.localidade.endereco;

                    const obj = {
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
                            name: item.responsavel?.nome
                        },
                        user: {
                            id: item.identificador?.codigo,
                            name: item.identificador?.nome,
                            avatar: item.identificador?.dados?.avatar
                        },
                        location: {
                            clientId: item.localidade.codigo,
                            fullAddress: `${logradouro}, ${numero} ${complemento} - ${bairro} - ${cidade}/${estado_descricao}`
                        },
                        status: {
                            id: item.status.codigo,
                            description: item.status.descricao,
                            color: item.status.cor
                        },
                        reopened: item.analise_implementacao_valida === false
                    };

                    data.push(obj);
                });
            }
        }

        return data;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao consultar ações`);
        return [];
    }
};

export { getActions };

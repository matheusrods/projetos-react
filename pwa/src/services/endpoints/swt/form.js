import _ from 'lodash';
import { toast } from 'react-toastify';
import { api } from '../../api';

const getForm = async (clientId, type = 1) => {
    try {
        if (!clientId) throw new Error('Id do cliente não foi especificado!');

        const response = await api.get(`/swt/form/${clientId}/${type}`);
        const { result, status } = response.data;

        let obj = {};
        let item = result.data;

        if (status === 200 || status === 201) {
            if (item) {
                obj = {
                    id: item?.codigo_form,
                    toolOrigin: item?.codigo_origem_ferramenta,
                    topics: item?.quest
                        ? item.quest
                            .map((topic) => {
                                return {
                                    id: parseInt(topic.codigo),
                                    order: parseInt(topic.ordem),
                                    title: topic?.titulo,
                                    steps: topic?.passos,
                                    questions: topic?.questoes
                                        ? topic.questoes.map((question) => {
                                            return {
                                                id: parseInt(
                                                    question.codigo
                                                ),
                                                title: question?.questao,
                                                knowMore: question?.saiba_mais ?? null,
                                                criticalityLevels: question?.criticidade
                                                    ? question.criticidade.map(
                                                        (criticality) => {
                                                            return {
                                                                id: parseInt(
                                                                    criticality.codigo
                                                                ),
                                                                description:
                                                                    criticality?.label,
                                                                startValue: parseInt(
                                                                    criticality.valor_inicio
                                                                ),
                                                                color:
                                                                    criticality.cor,
                                                                endValue: parseInt(
                                                                    criticality.valor_fim
                                                                ),
                                                                values: _.range(
                                                                    parseInt(criticality.valor_inicio),
                                                                    (
                                                                        parseInt(criticality.valor_fim) + 1
                                                                    )
                                                                )
                                                            };
                                                        }
                                                    )
                                                    : []
                                            };
                                        })
                                        : []
                                };
                            })
                            .sort((a, b) => {
                                if (a.order > b.order) {
                                    return 1;
                                } else if (a.order === b.order) {
                                    return 0;
                                } else {
                                    return -1;
                                }
                            })
                        : []
                };
            }
        }

        return obj;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao consultar formulário');
        return false;
    }
};

const getQuantityParticipants = async (clientId) => {
    try {
        if (!clientId) throw new Error('Id do cliente não foi especificado!');

        const response = await api.get(`/swt/qtd/participantes/${clientId}`);

        const { result, status } = response.data;

        let obj = {};
        let item = result.data;

        if (status === 200 || status === 201) {
            if (item[0]) {
                obj = {
                    id: item[0]?.codigo,
                    clientId: item[0].codigo_cliente,
                    quantity: parseInt(item[0].quantidade)
                };
            }
        }

        return obj;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao consultar quantidade de participantes');
        return false;
    }
};

export { getForm, getQuantityParticipants };

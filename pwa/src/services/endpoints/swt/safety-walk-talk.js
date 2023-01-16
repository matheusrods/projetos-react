import { api } from '../../api';
import { toast } from 'react-toastify';
import { transformResponse } from '../../transforms/action';

const getDetailsById = async (id) => {
    try {
        if (!id)
            throw new Error('Id do safety walk talk não foi especificado!');

        const response = await api.get(`/swt/detalhes/${id}`);

        const { result, status } = response.data;

        let obj = {};
        let item = result.data;

        if (status === 200 || status === 201) {
            if (item) {
                const improvementActions = item?.detalhes?.acoes_melhorias
                    ?.registry
                    ? transformResponse(
                        item?.detalhes?.acoes_melhorias?.registry
                    )
                    : [];

                obj = {
                    id: item?.detalhes?.resumo?.codigo,
                    observerName: item?.detalhes?.resumo?.nome,
                    summary: {
                        description: item?.detalhes?.resumo?.descricao,
                        operation: null,
                        timeObservation: item?.detalhes?.resumo?.hora,
                        dateObservation: item?.detalhes?.resumo?.data,
                        dateTimeObservation: item?.detalhes?.resumo?.data_hora,
                        location: item?.detalhes?.resumo?.localidade,
                        clientLocation: item?.detalhes?.resumo
                            ?.codigo_cliente_localidade
                            ? parseInt(
                                item.detalhes.resumo.codigo_cliente_localidade
                            )
                            : null,
                        participants: (item?.detalhes?.resumo?.participantes ? item.detalhes.resumo.participantes : []).map((participante, index) => {

                            return {
                                id: participante.codigo,
                                name: participante.nome,
                                toString: function () { console.log(this); return this.name; }
                            };
                        })
                    },
                    observedItems: item?.detalhes?.respostas
                        ? item.detalhes.respostas.map((topic) => {
                            return {
                                title: topic?.titulo,
                                questions: topic?.questao
                                    ? topic.questao.map((question) => {
                                        const improvementActionsIds = question?.codigo_acao
                                            ? question?.codigo_acao?.map(
                                                (item) => item.codigo
                                            )
                                            : [];

                                        return {
                                            title: question?.descricao,
                                            radioButton: question?.resposta,
                                            criticality:
                                                question?.criticidade,
                                            criticalityColor: question?.criticidade_cor ? '#' + question.criticidade_cor : 'red',
                                            reason: question?.motivo,
                                            improvementActions: improvementActions.filter(
                                                (item) =>
                                                    improvementActionsIds.includes(
                                                        item.id
                                                    )
                                            )
                                        };
                                    })
                                    : []
                            };
                        })
                        : []
                };
            }
        }

        return obj;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao consultar safety walk talk');
        return false;
    }
};

const createQualityAnalysis = async (
    userId = null,
    safetyWalkTalkId = null,
    formId = null,
    answersData = {}
) => {
    try {
        if (!userId || !safetyWalkTalkId || !formId) {
            throw new Error('Ids não foram especificados!');
        }

        const answers = [];
        for (const topicId in answersData) {
            const questions = [];

            for (const questionId in answersData[topicId]) {
                questions.push({
                    codigo: parseInt(questionId),
                    resposta: answersData[topicId][questionId].radioButton,
                    criticidade: null,
                    motivo: answersData[topicId][questionId].reason
                });
            }

            answers.push({
                codigo_titulo: parseInt(topicId),
                questao: questions
            });
        }

        const data = {
            codigo_usuario: parseInt(userId),
            form_codigo: parseInt(formId),
            form_tipo: 2,
            codigo_form_respondido_swt: parseInt(safetyWalkTalkId),
            respostas: answers
        };

        const response = await api.post(`/swt/form`, data);

        const { status, result } = response.data;

        if (status === 200) {
            toast.success('Análise concluida com sucesso');
            const { resultado, texto } = result.data;
            return {
                content: {
                    title: texto.titulo,
                    subtitle: texto.sub_titulo
                },
                result: {
                    averageArea: resultado?.media_area
                        ? resultado.media_area.replace('.', ',')
                        : 'N/A',
                    averageClient: resultado?.media_cliente
                        ? resultado.media_cliente.replace('.', ',')
                        : 'N/A',
                    resultQualification: resultado?.resultado
                        ? resultado.resultado.replace('.', ',') + '%'
                        : 'N/A'
                }
            };
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error('Erro ao concluir análise, tente novamente mais tarde.');
    }
};

const createSwt = async (data) => {
    try {
        const response = await api.post(`/swt/form`, data);

        const { status, result } = response.data;

        if (status === 200) {
            toast.success('Cadastro concluído com sucesso', {
                autoClose: 4000
            });
            const { resultado, texto } = result.data;

            return {
                content: {
                    title: texto.titulo,
                    subtitle: texto.sub_titulo
                },
                result: {
                    averageArea: resultado?.media_area
                        ? resultado.media_area.replace('.', ',')
                        : 'N/A',
                    averageClient: resultado?.media_cliente
                        ? resultado.media_cliente.replace('.', ',')
                        : 'N/A',
                    resultQualification: resultado?.resultado
                        ? resultado.resultado.replace('.', ',') + '%'
                        : 'N/A'
                }
            };
        }

        result.error.forEach((item) => {
            const message = Object.entries(item).join(' ');
            toast.warn(message, { autoClose: 5000 });
        });

        return false;
    } catch (error) {
        console.error(error);
        toast.error(
            'Erro ao concluir cadastro SWT, tente novamente mais tarde.'
        );
    }
};

export { getDetailsById, createQualityAnalysis, createSwt };

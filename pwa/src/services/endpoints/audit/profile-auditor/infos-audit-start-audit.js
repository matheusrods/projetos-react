// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

const getInfoAuditByIdForStartAudit = async (id = null) => {
    //  Verificando se o id foi passado como parâmetro
    if (!id) {
        alert('Error: parâmetro é necessário');
        return false;
    }

    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );
        const response = {
            data: {
                id: id,
                area: 'Produção',
                supportArea: 'Planejamento',
                product: 'Materiais/Produção',
                auditor: 'Renato Saldanha',
                location: 'Anhanguera',
                date: '14/04/2021',
                hour: '13h00 às  14h00',
                status: 'done',
                subProcess: 'Treinamento de parceiros e suporte técnico',
                requirements: [
                    {
                        id: 1,
                        name: 'Requisitos ISO 9001:2015',
                        topics: [
                            {
                                '5.1.2': 'Foco no cliente'
                            },
                            {
                                7.1: 'Recursos'
                            },
                            {
                                7.2: 'Competência'
                            },
                            {
                                8.1: 'Planejamento e controle operacionais'
                            },
                            {
                                '8.2.1': 'Comunicação com o cliente'
                            },
                            {
                                '8.5.1':
                                    'Controle de produção e de provisão de serviços'
                            },
                            {
                                8.6: 'Liberação de produtos e serviços'
                            },
                            {
                                9.1: 'Monitoramento, medição, análise e avaliação'
                            },
                            {
                                '9.1.2': 'Satisfação do cliente'
                            },
                            {
                                '9.1.3': 'Análise e avaliação'
                            },
                            {
                                10.3: 'Melhoria contínua'
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'Requisitos ISO 14001:2015',
                        topics: [
                            {
                                5.2: 'Política'
                            },
                            {
                                '6.1.2': 'Aspectos ambientais'
                            },
                            {
                                7.2: 'Competência'
                            },
                            {
                                7.3: 'Conscientização'
                            },
                            {
                                7.4: 'Comunicação'
                            },
                            {
                                '7.5.3': 'Controle de informação documentada'
                            },
                            {
                                8.2: 'Preparação e resposta a emergências'
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: 'Requisitos OHSAS 18001:2007',
                        topics: [
                            {
                                4.2: 'Política de SST'
                            },
                            {
                                '4.3.1':
                                    'Identificação de perigos, avaliação de riscos e determinação de controles'
                            },
                            {
                                '4.3.3': 'Objetivos e programa(s)'
                            },
                            {
                                '4.4.2':
                                    'Competência, treinamento e conscientização'
                            },
                            {
                                '4.4.4': 'Documentação'
                            },
                            {
                                '4.4.7': 'Prontidão e resposta a emergências'
                            }
                        ]
                    }
                ]
            },
            status: 200
        };

        const result = response.data;

        // if (status !== 200 && status !== 201) {
        //     throw new Error('Ocorreu um erro na requisição');
        // }

        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export { getInfoAuditByIdForStartAudit };

// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';
import { toast } from 'react-toastify';

const getInfoAuditByIdForSchedule = async (id = null) => {
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
                infos: [
                    {
                        label: 'Localidade',
                        value: 'Jundiaí'
                    },
                    {
                        label: 'Subprocesso adicional',
                        value: 'Treinamento de parceiros e suporte técnico'
                    },
                    {
                        label: 'Auditor',
                        value: 'Renato Saldanha'
                    }
                ],
                request: [
                    {
                        title: 'Requisitos ISO 9001:2015',
                        requirements: [
                            {
                                label: '5.1.2',
                                value: 'Política'
                            },
                            {
                                label: '7.1',
                                value: 'Recursos'
                            },
                            {
                                label: '8.1',
                                value: 'Planejamento e controle operacionais'
                            },
                            {
                                label: '8.2.2',
                                value: 'Determinação de requisitos relativos a produtos e serviços'
                            },
                            {
                                label: '8.2.1',
                                value: 'Comunicação com o cliente'
                            },
                            {
                                label: '8.5.1',
                                value: 'Controle de produção e de provisão de serviços'
                            }
                        ]
                    },
                    {
                        title: 'Requisitos ISO 14001:2015',
                        requirements: [
                            {
                                label: '5.1.2',
                                value: 'Política'
                            },
                            {
                                label: '7.1',
                                value: 'Recursos'
                            },
                            {
                                label: '8.1',
                                value: 'Planejamento e controle operacionais'
                            },
                            {
                                label: '8.2.2',
                                value: 'Determinação de requisitos relativos a produtos e serviços'
                            },
                            {
                                label: '8.2.1',
                                value: 'Comunicação com o cliente'
                            },
                            {
                                label: '8.5.1',
                                value: 'Controle de produção e de provisão de serviços'
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
const getResponsibleForScheduleAudit = async (data = null) => {
    //  Verificando se o id foi passado como parâmetro
    if (!data) {
        alert('Error: parâmetro é necessário');
        return false;
    }

    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [
                {
                    id: 1,
                    name: 'João',
                    disabled: false
                },
                {
                    id: 2,
                    name: 'Carlos',
                    disabled: true
                },
                {
                    id: 3,
                    name: 'Maria',
                    disabled: false
                },
                {
                    id: 4,
                    name: 'Maraia',
                    disabled: false
                },
                {
                    id: 5,
                    name: 'Mardia',
                    disabled: false
                },
                {
                    id: 6,
                    name: 'Marsia',
                    disabled: false
                }
            ],
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
const createAuditSchedule = async (data = null) => {
    //  Verificando se o id foi passado como parâmetro
    if (!data) {
        alert('Error: parâmetro é necessário');
        return false;
    }

    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: {},
            status: 200
        };

        // const result = response.data;
        const status = response.status;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return status;
    } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro em programar a auditoria');
        return false;
    }
};

export {
    getInfoAuditByIdForSchedule,
    createAuditSchedule,
    getResponsibleForScheduleAudit
};

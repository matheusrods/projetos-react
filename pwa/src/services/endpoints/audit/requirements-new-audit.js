// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

const getRequirementsForNewAudit = async () => {
    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [
                {
                    id: 1,
                    title: 'ISO 9001:2015',
                    // Requisitos
                    requirements: [
                        {
                            id: 1,
                            title: '12. Contexto da organização',
                            // Itens que serão avaliados
                            items: [
                                {
                                    id: 4.1,
                                    label: '4.1 Entendendo a organização e seus contextos'
                                },
                                {
                                    id: 4.2,
                                    label: '4.2 Entendendo as necessidades e expectativas das partes interessadas'
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: '53. Liderança',
                            items: [
                                {
                                    id: 5.1,
                                    label: '5.1 Entendendo a organização e seus contextos'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'ISO 14001:2015',
                    // Requisitos
                    requirements: [
                        {
                            id: 3,
                            title: '4. Contexto da organização',
                            // Itens que serão avaliados
                            items: [
                                {
                                    id: 6.1,
                                    label: '6.1 Entendendo a organização e seus contextos'
                                },
                                {
                                    id: 6.2,
                                    label: '6.2 Entendendo as necessidades e expectativas das partes interessadas'
                                }
                            ]
                        },
                        {
                            id: 4,
                            title: '5. Liderança',
                            items: [
                                {
                                    id: 7.1,
                                    label: '7.1 Entendendo a organização e seus contextos'
                                }
                            ]
                        }
                    ]
                },
            ],
            status: 200
        };

        const result = response.data;

        // if (status !== 200 && status !== 201) {
        //     throw new Error('Ocorreu um erro na requisição');
        // }

        return (result);
    } catch (error) {
        console.error(error);
        return false;
    }
};

export { getRequirementsForNewAudit };

// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

const getNormsForAuditing = async () => {
    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [
                // Normas
                {
                    id: 1,
                    title: 'ISO 9001:2015',
                    // Requisitos
                    requirements: [
                        {
                            id: 1,
                            title: '4. Contexto da organização',
                            // Itens que serão avaliados
                            items: [
                                {
                                    id: 1,
                                    label: '4.1 Entendendo a organização ',
                                    info: 'Essa é uma mensagem de informação de teste 1'
                                },
                                {
                                    id: 21,
                                    label: '4.2 Entendendo as necessidades e expectativas das partes interessadas',
                                    info: 'Essa é uma mensagem de informação de teste 2'
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: '5. Liderança',
                            items: [
                                {
                                    id: 3,
                                    label: '5.1 Entendendo a organização e seus contextos'
                                }
                            ]
                        },
                        {
                            id: 3,
                            title: '91. Liderança',
                            items: [
                                {
                                    id: 4,
                                    label: '76.1 Entendendo a organização e seus contextos'
                                },
                                {
                                    id: 5,
                                    label: '762.1 Entendendo a organização e seus contextos'
                                },
                                {
                                    id: 6,
                                    label: '716.1 Entendendo a organização e seus contextos'
                                },
                                {
                                    id: 7,
                                    label: '763.1 Entendendo a organização e seus contextos'
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
                            title: '54. Contexto da organização abelha',
                            // Itens que serão avaliados
                            items: [
                                {
                                    id: 8,
                                    label: '44.1 Entendendo a organização e seus contextos',
                                    selected: true // false
                                },
                                {
                                    id: 9,
                                    label: '43.2 Entendendo as necessidades e expectativas das partes interessadas'
                                }
                            ]
                        },
                        {
                            id: 4,
                            title: '5. Liderança',
                            items: [
                                {
                                    id: 10,
                                    label: '52.1 Entendendo a organização e seus contextos'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'ISO 1403201:2017',
                    // Requisitos
                    requirements: [
                        {
                            id: 43,
                            title: '542. Contexto da organização abelha',
                            // Itens que serão avaliados
                            items: [
                                {
                                    id: 8321,
                                    label: '44.1 Entendendo a organização e seus contextos',
                                    selected: true // false
                                },
                                {
                                    id: 9321,
                                    label: '43.2 Entendendo as necessidades e expectativas das partes interessadas'
                                }
                            ]
                        },
                        {
                            id: 4123,
                            title: '5. Liderança',
                            items: [
                                {
                                    id: 32110,
                                    label: '52.1 Entendendo a organização e seus contextos'
                                }
                            ]
                        }
                    ]
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

export { getNormsForAuditing };

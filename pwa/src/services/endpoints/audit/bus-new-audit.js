// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

const getBusForNewAudit = async () => {
    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [
                {
                    id: 1,
                    name: 'BUS 1'
                },
                {
                    id: 2,
                    name: 'BUS 2'
                },
                {
                    id: 3,
                    name: 'BUS 3'
                }
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

export { getBusForNewAudit };

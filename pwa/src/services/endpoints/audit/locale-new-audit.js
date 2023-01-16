// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

const getLocaleForNewAudit = async () => {
    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [
                {
                    id: 1,
                    name: 'Local 1'
                },
                {
                    id: 2,
                    name: 'Local 2'
                },
                {
                    id: 3,
                    name: 'Local 3'
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

export { getLocaleForNewAudit };

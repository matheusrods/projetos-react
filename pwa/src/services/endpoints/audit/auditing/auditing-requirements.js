// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

import { toast } from "react-toastify";

const setAuditingRequirements = async (data) => {
    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [],
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
        toast.error(`Falha ao salvar`);
        return false;
    }
};

export { setAuditingRequirements };

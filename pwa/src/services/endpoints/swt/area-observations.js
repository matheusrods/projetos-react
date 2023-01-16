import { api } from '../../api';
import { toast } from 'react-toastify';
import { transformResponse } from '../../transforms/areaObservations';

const getAreaObservationsData = async (clientId) => {
    try {
        const response = await api.get(`/swt/observador/ehs/${clientId}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponse(result.data);
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao buscar dados para áreas de observações`);
    }
};

export { getAreaObservationsData };

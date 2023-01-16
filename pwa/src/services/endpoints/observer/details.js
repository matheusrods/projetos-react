import { api } from '../../api';
import { toast } from 'react-toastify';
import { transformResponse } from '../../transforms/observer';

const getObserverDetails = async (observerId) => {
    try {
        if (!observerId) {
            throw new Error('O código da observação não foi especificado!');
        }

        const response = await api.get(`/observador/observacoes/${observerId}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponse(result.data);
    } catch (error) {
        toast.error('Falha ao exibir detalhes da observação');

        return false;
    }
};

export { getObserverDetails };

import { api } from '../../api';
import { toast } from 'react-toastify';
import { transformResponse } from '../../transforms/obs-location';

const getObserverLocation = async (clientId) => {
    try {
        if (!clientId) {
            throw new Error('Código do cliente não especificado ou inválido!');
        }

        const response = await api.get(
            `/pos/obs/locais?codigo_cliente=${clientId}`
        );

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponse(result.data);
    } catch (error) {
        console.error(error);
        toast.error('Falha ao exibir detalhes da observação');
        return false;
    }
};

export { getObserverLocation };

import { api } from '../../../api';
import { toast } from 'react-toastify';

const getGraphicData = async (clientId = null) => {
    try {
        if (!clientId) {
            throw new Error('Parâmetros inválidos');
        }

        const response = await api.get(`/swt/meta/grafico/${clientId}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result.data;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao buscar dados para o gráfico`);
        throw error;
    }
};

export { getGraphicData };

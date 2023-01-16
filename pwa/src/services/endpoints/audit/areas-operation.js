import { api } from '../../api';
import { transformResponseAreasOperation } from '../../transforms/areasOperation'
import { toast } from 'react-toastify';

const getAreasOperation = async (clientId) => {
    try {
        let query = `?codigo_cliente=${clientId}`;

        const response = await api.get(`/auditoria/areas-atuacao${query}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponseAreasOperation(result.areas)
    } catch (error) {
        toast.error(`Falha ao buscar áreas de atuação`);
    }
}

export { getAreasOperation }
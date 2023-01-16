import { api } from '../../api';
import { toast } from 'react-toastify';
import { isEmpty } from '../../../utils/helpers';

const createClassification = async (data) => {
    try {
        if (isEmpty(data)) {
            throw new Error('Objeto de classificação está vazio');
        }

        const response = await api.post(
            '/observador/classificacoes-risco',
            data
        );

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result.data;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao exibir detalhes da observação');
        return false;
    }
};

export { createClassification };

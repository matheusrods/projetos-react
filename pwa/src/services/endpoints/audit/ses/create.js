import { api } from '../../../api';
import { toast } from 'react-toastify';

const create = async (data) => {
    try {
        const response = await api.post('/auditoria/programacoes/ses/', data);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao criar programação de auditoria`);
    }
};

export { create };

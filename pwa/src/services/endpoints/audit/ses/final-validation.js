import { api } from '../../../api';
import { toast } from 'react-toastify';

const finalValidation = async (data, id) => {
    try {
        const response = await api.put(
            `/auditoria/programacoes/ses/validacao-final/${id}`,
            data
        );

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao realizar validação final de auditoria`);
    }
};

export { finalValidation };

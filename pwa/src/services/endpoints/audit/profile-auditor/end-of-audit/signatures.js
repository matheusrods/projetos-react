import { api } from '../../../../api';
import { toast } from 'react-toastify';

const sendSignatures = async (data) => {
    try {
        const response = await api.post('/auditoria/programacoes/auditor/adicionar-assinaturas', data);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao registrar assinaturas`);
    }
};

export { sendSignatures };

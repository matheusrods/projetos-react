import { api } from '../../../api';
import { toast } from 'react-toastify';
import { transformResponseDealSendServer } from '../../../transforms/audits';

const addTreatmentReview = async (dealId, dealReview) => {
    try {
        const data = transformResponseDealSendServer(dealId, JSON.parse(JSON.stringify(dealReview)));

        const response = await api.post('/auditoria/programacoes/responsavel-tratativa/adicionar-avaliacao-tratativa', data);

        const { result, status } = response.data;

        if ((status !== 200 && status !== 201) || !result?.operacao) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return true;
    } catch (error) {
        toast.error('Falha ao enviar avaliação da tratativa');

        return false;
    }
};

export { addTreatmentReview };

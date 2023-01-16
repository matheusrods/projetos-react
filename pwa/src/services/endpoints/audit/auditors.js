import { api } from '../../api';
import { transformResponseAuditors } from '../../transforms/audits';
import { toast } from 'react-toastify';

const getAuditors = async (clientCode) => {
    try {
        let query = `?codigo_cliente=${clientCode}`;

        const response = await api.get(`/auditoria/auditores${query}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponseAuditors(result.auditores);
    } catch (error) {
        toast.error(`Falha ao buscar dados de auditores`);
    }
};

export { getAuditors };

import { api } from '../../api';
import { transformResponseProcesses } from '../../transforms/process';
import { toast } from 'react-toastify';

const getProcessForNewAudit = async (clientCode, areas) => {
    try {
        let query = `?codigo_cliente=${clientCode}&codigo_area=${areas.join()}`;

        const response = await api.get(`/auditoria/processos${query}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponseProcesses(result.processos)
    } catch (error) {
        toast.error(`Falha ao buscar dados de processos`);
    }
};

export { getProcessForNewAudit };

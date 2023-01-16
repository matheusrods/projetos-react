import { api } from '../../api';
import { toast } from 'react-toastify';

const getProgrammingAudits = async ({
    codigo_unidade = null,
    data_agenda = null,
    codigo_auditor = null,
    codigo_processo = null,
    codigo_requisito = null,
    codigo_area = null,
    codigo_responsavel_tratativa = null,
    codigo_responsavel_processo = null
}) => {
    try {
        let query = `?codigo_unidade=${codigo_unidade}`;

        if (data_agenda) {
            query = query.concat(`&data_agenda=${data_agenda}`);
        }

        if (codigo_auditor) {
            query = query.concat(`&codigo_auditor=${codigo_auditor}`);
        }

        if (codigo_processo) {
            query = query.concat(`&codigo_processo=${codigo_processo}`);
        }

        if (codigo_requisito) {
            query = query.concat(`&codigo_requisito=${codigo_requisito}`);
        }

        if (codigo_area) {
            query = query.concat(`&codigo_area=${codigo_area}`);
        }

        if (codigo_responsavel_tratativa) {
            query = query.concat(`&codigo_responsavel_tratativa=${codigo_responsavel_tratativa}`);
        }

        if (codigo_responsavel_processo) {
            // query = query.concat(`&codigo_responsavel_processo=${codigo_responsavel_processo}`);
            query = query.concat(`&codigo_responsavel_processo=73396`);
        }

        const response = await api.get(`/auditoria/programacoes${query}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result;
    } catch (error) {
        toast.error(`Falha ao buscar auditorias`);
    }
};

const getProgrammingAuditById = async (id) => {
    try {
        const response = await api.get(`/auditoria/programacoes/${id}`);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result.programacao;
    } catch (error) {
        toast.error(`Falha ao buscar auditoria id:${id}`);
    }
};

export { getProgrammingAudits, getProgrammingAuditById };

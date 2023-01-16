import { api } from '../../../api';
import { toast } from 'react-toastify';

const editAuditPendingReview = async (id, programming) => {
    try {
        const data = {
            data_agenda: programming.calendarDate,
            hora_inicio_agenda: programming.startTime,
            hora_fim_agenda: programming.endTime,
            responsaveis_processo: programming.responsibleProcess.map(responsible => ({ codigo_responsavel: responsible.id })),
            numero_colaboradores: programming.numberEmployees
        };

        const response = await api.put(
            `/auditoria/programacoes/head-quality/analise-pendente/${id}`,
            data
        );

        const { status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return true;
    } catch (error) {
        toast.error('Falha ao editar auditoria');

        return false;
    }
};

export { editAuditPendingReview };

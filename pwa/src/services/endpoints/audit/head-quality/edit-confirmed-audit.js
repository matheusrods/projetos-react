import { api } from '../../../api';
import { toast } from 'react-toastify';

/**
 * Returns boolean when editing a confirmed schedule
 * @param {Number} id
 * @param {object} programming
 * @param {Array.<{id: Number}>} programming.auditors
 * @param {String} programming.calendarDate
 * @param {String} programming.startTime
 * @param {String} programming.endTime
 * @returns {Promise<Boolean>}
 */
const editConfirmedAudit = async (id, programming) => {
    try {
        const data = {
            data_agenda: programming.calendarDate,
            hora_inicio_agenda: programming.startTime,
            hora_fim_agenda: programming.endTime,
            equipe_auditoria: programming.auditors.map(auditor => ({ codigo_auditor: auditor.id }))
        };

        const response = await api.put(
            `/auditoria/programacoes/head-quality/editar-confirmada/${id}`,
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

export { editConfirmedAudit };

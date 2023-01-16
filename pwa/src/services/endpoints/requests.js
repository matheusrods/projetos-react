import { toast } from "react-toastify";
import { api } from "../api";

const createRequest = async ({
    requestTypeId,
    actionId,
    justification,
    newDeadline = null,
    statusId = 1,
    responsibleId = null,
    newResponsibleId = null,
    antecedentRequestId = null,
}) => {
    try {
        const data = {
            codigo_acao_melhoria: actionId,
            codigo_acao_melhoria_solicitacao_tipo: requestTypeId,
            status: statusId,
            codigo_usuario_solicitado: responsibleId,
            justificativa_solicitacao: justification,
            novo_prazo: newDeadline,
            codigo_novo_usuario_responsavel: newResponsibleId,
            codigo_acao_melhoria_solicitacao_antecedente: antecedentRequestId,
        };

        const response = await api.post(`/acao-melhoria/solicitacoes`, data);

        const { status } = response.data;

        if (status === 200 || status === 201) {
            toast.success("Solicitação criada com sucesso!");
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error("Falha ao criar solicitação.");
        return false;
    }
};

const updateRequest = async ({
    requestId,
    statusId = 1,
    refuseJustification,
    showSuccessMessage = true,
    generateNewRequest = false,
}) => {
    try {
        const response = await api.put(
            `/acao-melhoria/solicitacoes/${requestId}`,
            {
                status: statusId,
                justificativa_recusa: refuseJustification,
                gerar_nova_solicitacao: generateNewRequest,
            }
        );

        const { status } = response.data;

        if (status === 200 || status === 201) {
            showSuccessMessage && toast.success("Solicitação atualizada com sucesso!");
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error("Falha ao atualizar solicitação.");
        return false;
    }
};

export { createRequest, updateRequest };

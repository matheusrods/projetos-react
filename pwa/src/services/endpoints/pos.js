import { toast } from "react-toastify";
import { api } from "../api";

const wantToSeeCount = async () => {
    try {
        const response = await api.get(
            `/pos`
        );

        const { result, status } = response.data;

        if (status === 200 || status === 201) {
            if(result.data){
                return {
                    observer: result.data.observador,
                    actionPlan: result.data.plano_acao,
                    swt: result.data.safety_walk_talk,
                    inspections: result.data.inspecao_assessment || 0,
                }
            }
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error("Falha ao consultar registros.");
        return false;
    }
};

const contentById = async (id) => {
    try {
        if (!id) {
            throw new Error('Informe o id para consultar o conteúdo.');
        }

        const response = await api.get(`/termos/${id}`);

        const { result, status } = response.data;

        if (status === 200 || status === 201) {
            if (result?.data?.descricao){
                return result.data.descricao;
            }
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error("Falha ao consultar registro.");
        return false;
    }
};

const consultRule  = async ({
    toolId = null,
    clientId = null,
    key = null,
}) => {
    try {
        const response = await api.get('/pos/configuracoes', {
            params: {
                codigo_ferramenta: toolId,
                codigo_cliente: clientId,
                chave: key
            },
        });

        const { result, status } = response.data;

        if (status === 200 || status === 201) {
            const { data } = result;

            if (data) {
                return {
                    id: data?.codigo ?? null,
                    toolId: data?.codigo_ferramenta ?? null,
                    clientId: data?.codigo_cliente ?? null,
                    key: data?.chave ?? null,
                    description: data?.descricao ?? null,
                    value: data?.valor ?? null,
                    observation: data?.observacao ?? null,
                    safetyWalkTalk: {
                        daysBacklog: data?.PosSwtRegras?.dias_registro_retroativo
                            ? parseInt(data.PosSwtRegras.dias_registro_retroativo)
                            : null
                    },
                };
            }
        }

        return false;
    } catch (error) {
        console.error(error);
        toast.error("Falha ao consultar regra.");
        return false;
    }
};

export { wantToSeeCount, consultRule, contentById };

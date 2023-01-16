import { api } from '../../api';
import { toast } from 'react-toastify';
import UserStore from '../../../mobx/stores/user';

const createObservations = async (observation = {}) => {
    try {
        const {
            loggedUser,
            description,
            observer,
            registrationLocation,
            dateTime,
            type,
            riskAgents,
            attachments = []
        } = observation;

        const data = {
            codigo_usuario: loggedUser.id,
            codigo_unidade: registrationLocation.company.clientId,
            codigo_categoria_observacao: type.id,
            codigo_local: description.local,
            observadores: [
                {
                    codigo_usuario: observer.id,
                }
            ],
            localidades: {
                codigo_local_empresa: registrationLocation.location.id,
                codigo_localidade: registrationLocation.company.clientId,
                codigo_bu: registrationLocation?.businessUnit?.id ?? null,
                codigo_opco: registrationLocation?.opco?.id ?? null,
            },
            observacao_data: dateTime?.date?.split('-')?.reverse()?.join('/'),
            observacao_hora: dateTime.time,
            descricao_usuario_observou: description.whatIObserved,
            descricao_usuario_acao: description.whatIDid,
            descricao_usuario_sugestao: description.complementaryAction,
            descricao_codigo_local: registrationLocation.location.id,
            descricao: description.description,
            riscos: riskAgents.map((item) => {
                const { dangerAspect, dangerAspectType, riskImpact } = item;
                return {
                    codigo_risco_tipo: dangerAspectType.id,
                    codigo_perigo_aspecto: dangerAspect.id,
                    codigo_risco_impacto: riskImpact.id
                };
            }),
            anexos: attachments.map((item) => ({
                arquivo: item
            }))
        };

        const response = await api.post(`/observador/observacoes`, data);

        const { status } = response.data;

        if (status === 200 || status === 201) {
            return true;
        }
        return false;
    } catch (error) {
        toast.error('Falha ao cadastrar observações');

        return false;
    }
};

const updateObservation = async (observation) => {
    if (!observation) {
        return;
    }

    try {
        const { user } = UserStore;

        const data = {
            codigo_observacao: observation?.id,
            codigo_usuario: user.id,
            codigo_unidade: observation?.observationClientId,
            codigo_categoria_observacao: observation?.observationTypeCode,
            codigo_local: observation?.localId,
            observadores: [
                {
                    codigo_usuario: observation?.observer?.userCode,
                    nome: observation?.observer?.name,
                }
            ],
            localidades: {
                codigo_local_empresa: observation?.observationCompanyId,
                codigo_localidade: observation?.observationClientId,
                codigo_bu: observation?.businessUnit ?? null,
                codigo_opco: observation?.opco ?? null,
            },
            observacao_data: observation?.date,
            observacao_hora: observation?.hour,
            descricao_usuario_observou: observation?.whatWasObserved,
            descricao_usuario_acao: observation?.whatWasDone,
            descricao_usuario_sugestao: observation?.whatWasSuggested,
            descricao_codigo_local: observation?.observationClientId,
            descricao: observation?.description,
            riscos: observation?.risksAndImpacts.map((item) => ({
                codigo_risco_tipo: item?.riskTypeCode,
                codigo_perigo_aspecto: item?.dangerAspectsCode,
                codigo_risco_impacto: item?.riskImpactCode
            })),
            anexos: []
        };

        const response = await api.post(`/observador/observacoes`, data);

        const { status } = response.data;

        if (status === 200 || status === 201) {
            return true;
        }
        return false;
    } catch (error) {
        toast.error('Falha ao atualizar observação');

        return false;
    }
};

const deleteObservation = async (observationId, data) => {
    if (!observationId) {
        return;
    }
    try {
        const response = await api.delete(
            `/observador/observacoes/${observationId}`,
            { data }
        );

        const { status } = response.data;

        if (status === 200 || status === 201) {
            return true;
        }

        return false;
    } catch (error) {
        toast.error('Falha ao deletar observação');

        return false;
    }
};

const getTypesOptions = async ({ clientId }) => {
    try {
        if (!clientId)
            throw new Error('Código do cliente não foi especificado!');

        const response = await api.get(`/observador/tipos-observacao`, {
            params: {
                codigo_unidade: clientId
            }
        });

        const { result, status } = response.data;

        let types = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                types = result.data.map((item) => ({
                    id: item.codigo,
                    name: item.descricao
                }));
            }
        }

        return {
            typesOptions: types
        };
    } catch (error) {
        toast.error('Falha ao listar tipos de observações');

        return false;
    }
};

export {
    getTypesOptions,
    createObservations,
    updateObservation,
    deleteObservation
};

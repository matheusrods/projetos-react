import { api } from '../../api';
import { toast } from 'react-toastify';

const getRiskTypes = async (clientId) => {
    try {
        if (!clientId) throw new Error('Código do cliente não foi especificado!');

        const response = await api.get(`/agentes-riscos/tipos-riscos/${clientId}`);

        const { result, status } = response.data;

        const data = [];

        if (status === 200 || status === 201) {
            if (result.dados) {
                result.dados.forEach((item) => {
                    if (item.ativo === 1) {
                        data.push({
                            id: item?.codigo,
                            name: item?.descricao,
                            icon: item?.icone,
                            color: item?.cor
                        });
                    }
                });
            }
        }

        return data;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao listar tipos de risco');
        return [];
    }
};

const getDangersAndAspects = async (clientId) => {
    try {
        if (!clientId) throw new Error('Código do cliente não foi especificado!');

        const response = await api.get(`/agentes-riscos/perigos-aspectos/${clientId}`);

        const { result, status } = response.data;

        const data = [];

        if (status === 200 || status === 201) {
            if (result.dados) {
                result.dados.forEach((item) => {
                    if (item.ativo === 1) {
                        data.push({
                            id: item?.codigo,
                            name: item?.descricao,
                            dangerAspectType: item?.codigo_risco_tipo
                        });
                    }
                });
            }
        }

        return data;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao listar perigos e/ou aspectos');
        return [];
    }
};

const getRisksAndImpacts = async (clientId) => {
    try {
        if (!clientId) throw new Error('Código do cliente não foi especificado!');

        const response = await api.get(`/agentes-riscos/riscos-impactos/${clientId}`);

        const { result, status } = response.data;

        const data = [];

        if (status === 200 || status === 201) {
            if (result.dados) {
                result.dados.forEach((item) => {
                    if (item.ativo === 1) {
                        data.push({
                            id: item?.codigo,
                            name: item?.descricao,
                            dangerAspect: item?.codigo_perigo_aspecto,
                            riskImpactType: item?.codigo_risco_impacto_tipo,
                        });
                    }
                });
            }
        }

        return data;
    } catch (error) {
        console.error(error);
        toast.error('Falha ao listar riscos e/ou impactos');
        return [];
    }
};

export { getRiskTypes, getDangersAndAspects, getRisksAndImpacts };

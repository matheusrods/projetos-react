import { toast } from 'react-toastify';
import { api } from '../api';

const getOrigins = async () => {
    try {
        const response = await api.get(`/origem-ferramenta`);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        name: item.descricao
                    };

                    data.push(obj);
                });
            }
        }

        return {
            origins: data
        };
    } catch (error) {
        console.error(error);
        toast.error('Falha ao listar Origens');
        return false;
    }
};

const getOriginsByClientId = async (id) => {
    try {
        if (!id)
            throw new Error(
                'Id do cliente não foi especificado! - endpoints/origins'
            );

        const response = await api.get(`/origem-ferramenta/cliente/${id}`);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item?.codigo,
                        name: item?.descricao,
                        key: item?.chave
                    };

                    data.push(obj);
                });
            }
        }

        return {
            origins: data
        };
    } catch (error) {
        console.error(error);
        toast.error('Falha ao Listar Origens pelo Id Cliente');
        return false;
    }
};

const getOriginDetails = async (id) => {
    try {
        if (!id)
            throw new Error(
                'Id da ferramenta de origem não foi especificado! - endpoints/origins'
            );

        const response = await api.get(`/origem-ferramenta/${id}`);

        const { result, status } = response.data;

        let obj = {};
        let item = result.data;

        if (status === 200 || status === 201) {
            if (item) {
                const formJson = JSON.parse(item.formulario);

                obj = {
                    id: item.codigo,
                    name: item.descricao,
                    form: formJson.map((field) => {
                        const fieldRequired = formJson.find(
                            (i) =>
                                parseInt(i.codigo) ===
                                parseInt(
                                    field?.codigo_campo_requerido
                                        ? field.codigo_campo_requerido
                                        : parseInt(field.codigo) === 3
                                        ? 2
                                        : null
                                )
                        );

                        return {
                            id: parseInt(field.codigo),
                            name: field.name,
                            label: field.descricao,
                            type: field.campo_tipo,
                            endpoint: field?.endpoint_url ?? null,
                            method: field?.endpoint_metodo ?? null,
                            fieldRequired: fieldRequired?.name
                                ? fieldRequired.name
                                : null,
                            category: field?.categoria ?? null
                        };
                    }),
                    active: item.ativo
                };
            }
        }

        return {
            origin: obj
        };
    } catch (error) {
        toast.error('Falha ao Listar detalhas da ferramenta de origem');

        return {
            origin: {}
        };
    }
};

export { getOrigins, getOriginsByClientId, getOriginDetails };

import _ from 'lodash';
import { api } from '../api';

const getEmployees = async (
    options = { internal: null, userPermission: null }
) => {
    try {
        let endpoint = '/usuario/clientes/funcionarios';

        if (
            typeof options.internal !== 'undefined' &&
            typeof options.userPermission !== 'undefined' &&
            !_.isNull(options.internal) &&
            !_.isNull(options.userPermission)
        ) {
            endpoint += `?interno=${options.internal}&permissao_usuario=${options.userPermission}`;
        } else if (
            typeof options.internal !== 'undefined' &&
            !_.isNull(options.internal)
        ) {
            endpoint += `?interno=${options.internal}`;
        } else if (
            typeof options.userPermission !== 'undefined' &&
            !_.isNull(options.userPermission)
        ) {
            endpoint += `?permissao_usuario=${options.userPermission}`;
        }

        const response = await api.get(endpoint);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        name: item.nome,
                        avatar: item.avatar,
                    };

                    data.push(obj);
                });
            }
        }

        return {
            employees: data
        };
    } catch (error) {
        return { error: `Falha ao Listar Funcionários - ${error.message}` };
    }
};

const getClientsByUserId = async (id) => {
    try {
        const response = await api.get(`/usuario/${id}/clientes`);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        clientId: item.codigo_cliente,
                        name: item.descricao,
                        units: item.unidades.map((unit) => {
                            const {
                                complemento,
                                numero,
                                logradouro,
                                bairro,
                                cidade,
                                estado_descricao,
                                centro_resultado
                            } = unit;

                            const businessUnits = [];
                            const opcos = [];

                            if (Array.isArray(centro_resultado) && centro_resultado.length > 0) {
                                centro_resultado.forEach(item => {
                                    businessUnits.push({
                                        id: parseInt(item.codigo),
                                        name: item.descricao
                                    });

                                    const opcosData = item.opcos;

                                    opcosData.forEach((opco) => {
                                        opcos.push({
                                            id: parseInt(opco.codigo),
                                            name: opco.descricao,
                                            businessUnitId: parseInt(item.codigo),
                                        });
                                    });
                                });
                            }

                            return {
                                id: unit.codigo_cliente,
                                name: unit.nome_fantasia,
                                fullAddress: `${logradouro}, ${numero} ${complemento} - ${bairro} - ${cidade}/${estado_descricao}`,
                                businessUnits,
                                opcos,
                            };
                        })
                    };

                    data.push(obj);
                });
            }
        }

        return {
            clients: data
        };
    } catch (error) {
        return {
            error: `Falha ao Listar unidades por usuário - ${error.message}`
        };
    }
};

const getClientsByUserIdAndClientId = async ({ userId, clientId }) => {
    try {
        const response = await api.get(
            `/usuario/${userId}/clientes/${clientId}`
        );

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                result.data.forEach((item) => {
                    const obj = {
                        id: item.codigo,
                        clientId: item.codigo_cliente,
                        name: item.descricao,
                        units: item.unidades.map((unit) => {
                            const {
                                complemento,
                                numero,
                                logradouro,
                                bairro,
                                cidade,
                                estado_descricao,
                                centro_resultado
                            } = unit;

                            const businessUnits = [];
                            const opcos = [];

                            if (Array.isArray(centro_resultado) && centro_resultado.length > 0) {
                                centro_resultado.forEach(item => {
                                    businessUnits.push({
                                        id: parseInt(item.codigo),
                                        name: item.descricao
                                    });

                                    const opcosData = item.opcos;

                                    opcosData.forEach((opco) => {
                                        opcos.push({
                                            id: parseInt(opco.codigo),
                                            name: opco.descricao,
                                            businessUnitId: parseInt(item.codigo),
                                        });
                                    });
                                });
                            }

                            return {
                                id: unit.codigo_cliente,
                                name: unit.nome_fantasia,
                                fullAddress: `${logradouro}, ${numero} ${complemento} - ${bairro} - ${cidade}/${estado_descricao}`,
                                businessUnits,
                                opcos
                            };
                        })
                    };

                    data.push(obj);
                });
            }
        }

        return {
            clients: data
        };
    } catch (error) {
        console.error(error);
        return {
            error: `Falha ao listar unidades por codigo de usuário e cliente - ${error.message}`
        };
    }
};

const getUserLocation = async (id) => {
    try {
        const response = await api.get(`/usuario-localidade/${id}`);

        const { result, status } = response.data;

        let data = [];

        if (status === 200 || status === 201) {
            if (result.data) {
                return result.data;
            }
        }

        return null;
    } catch (error) {

        return {
            error: `Falha ao obter localidade - ${error.message}`
        };
    }
};

export { getEmployees, getClientsByUserId, getClientsByUserIdAndClientId, getUserLocation };

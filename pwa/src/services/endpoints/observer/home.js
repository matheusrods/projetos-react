import { api } from '../../api';
import { transformResponse, transformResponseList } from '../../transforms/observer';

const getObserverHomeData = async (
    clientId,
    limit = null,
    page = null,
    author = 'area',
    initialDate = null,
    finalDate = null
) => {
    try {
        const additionalFilters =
            initialDate && finalDate
                ? `&periodo_de=${initialDate}&periodo_ate=${finalDate}`
                : '';

        const response = await api.get(
            `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        );

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponse(result.data);
    } catch (error) {
        console.error(error);
        return false;
    }
};


const getObserverHomeList = async (
    clientId,
    limit = null,
    page = null,
    author = 'area',
    initialDate = null,
    finalDate = null
) => {
    try {
        const additionalFilters =
            initialDate && finalDate
                ? `&periodo_de=${initialDate}&periodo_ate=${finalDate}`
                : '';

        const response = await api.get(
            `/observador/observacoes-lista/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        );

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return transformResponseList(result.data);
    } catch (error) {
        console.error(error);
        return false;
    }
};

export { getObserverHomeData, getObserverHomeList };

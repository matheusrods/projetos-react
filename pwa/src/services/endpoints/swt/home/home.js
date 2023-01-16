import { api } from '../../../api';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const getHomeData = async (filter, initialDate, finalDate) => {
    try {
        const data = {
            por_autor: filter,
            periodo_de:
                initialDate
                    ? moment(initialDate).format('DD/MM/YYYY')
                    : moment(new Date()).subtract(30, 'days').format('DD/MM/YYYY'),
            periodo_ate:
                finalDate
                    ? moment(finalDate).format('DD/MM/YYYY')
                    : moment(new Date()).add(30, 'days').format('DD/MM/YYYY')
        };

        const response = await api.post('/swt/home/', data);

        const { result, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return result.data;
    } catch (error) {
        console.error(error);
        toast.error(`Falha ao buscar dados para o gráfico`);

        return <Redirect to={'/want-to-see'} />;
    }
};

export { getHomeData };

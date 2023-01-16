import moment from "moment";
import { isEmpty } from '../../utils/helpers';

const areaFactory = (item) => ({
    id: item.codigo,
    value: item.codigo,
    label: item.descricao, 
    name: item.descricao,
    clientId: item.codigo_cliente,
    date: moment(item.data_inclusao).format('DD/MM/YYYY')
})

function transformResponseAreasOperation(data) {
    if (isEmpty(data)) {
        return data;
    }

    let formattedAreas = data.map((item) => areaFactory(item))

    return {
        formattedAreas
    }
}

export { transformResponseAreasOperation }
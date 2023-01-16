import * as Moment from 'moment';
import 'moment/locale/pt-br';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

try {
    moment.locale('pt-BR');
} catch (error) {
    console.log('Error (Moment): ', error);
}

export default moment;

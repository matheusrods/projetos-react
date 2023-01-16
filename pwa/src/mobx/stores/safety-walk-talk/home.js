import { makeAutoObservable, action, flow } from 'mobx';
import moment from '../../../config/moment';
import { getHomeData } from '../../../services/endpoints/swt/home/home';

class HomeStore {
    meta = {};
    inProgress = [];
    completed = [];
    pending = [];
    state = 'pending'; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            getInProgress: action
        });
    }

    getInProgress(initialDate = null, finalDate = null) {
        const found = localStorage.getItem('safetyWalkTalk@newRegisterStore');

        if (found) {
            const { registers } = JSON.parse(found);

            if (initialDate && finalDate) {
                return registers.filter((item) => {
                    const dateFormatted = moment(
                        item.date,
                        'DD/MM/YYYY'
                    ).format('YYYY-MM-DD');

                    return (
                        moment(dateFormatted).isAfter(
                            moment(initialDate).subtract(1, 'days')
                        ) &&
                        moment(dateFormatted).isBefore(
                            moment(finalDate).add(1, 'days')
                        )
                    );
                });
            }

            return registers;
        }

        return [];
    }

    *fetch(filter = null, initialDate = null, finalDate = null) {
        this.state = 'pending';
        try {
            const response = yield getHomeData(filter, initialDate, finalDate);

            if (response.swt_home.error) {
                throw new Error(response.swt_home.error);
            }

            const completedResponse = response.swt_home.filter(
                (item) => Number(item.status_codigo) === 5
            );
            const inProgressResponse = response.swt_home.filter(
                (item) => Number(item.status_codigo) === 3
            );
            const pendingResponse = response.swt_home.filter(
                (item) => Number(item.status_codigo) === 2
            );

            this.meta = response.meta;
            this.inProgress = [
                ...this.getInProgress(initialDate, finalDate).map((item) => ({ ...item, typeOfSafety: true })), 
                ...inProgressResponse.map((item) => ({ ...item, typeOfSafety: false })).sort((a, b) =>  parseInt(b.codigo) - parseInt(a.codigo))
            ];
            this.completed = completedResponse.sort((a, b) =>  parseInt(b.codigo) - parseInt(a.codigo));
            this.pending = pendingResponse.sort((a, b) =>  parseInt(b.codigo) - parseInt(a.codigo));
            this.state = 'done';
        } catch (error) {
            console.error(error);
            this.state = 'error';
        }
    }
}

export default new HomeStore();

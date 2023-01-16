import { makeAutoObservable, action, flow } from 'mobx';
import moment from '../../../config/moment';
import { getObserverHomeData, getObserverHomeList } from '../../../services/endpoints/observer/home';

class HomeObserverStore {
    state = 'pending'; // "pending", "done" or "error"
    inProgress = [];
    completed = [];
    canceled = [];
    awaitingAnalysis = [];

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            getInProgress: action
        });
    }

    getInProgress(initialDate = null, finalDate = null) {
        const found = localStorage.getItem('observerEHS@newRegisterStore');

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

    *fetch(clientId, limit, page, author, initialDate, finalDate) {
        this.state = 'pending';

        try {
            const response = yield getObserverHomeList(
                clientId,
                limit,
                page,
                author,
                initialDate,
                finalDate
            );

            if (Array.isArray(response)) {
                const awaitingAnalysisResponse = response
                    .filter(
                        (item) =>
                            Number(item.status) === 1 ||
                            Number(item.status) === 2
                    )
                    .sort((a, b) => b.id - a.id);

                const completedResponse = response.filter(
                    (item) => Number(item.status) === 5
                );

                const canceledResponse = response.filter(
                    (item) => Number(item.status) === 6
                );

                this.awaitingAnalysis = awaitingAnalysisResponse;
                this.completed = completedResponse;
                this.canceled = canceledResponse;
                this.inProgress = this.getInProgress(initialDate, finalDate);
                this.state = 'done';

                return true;
            } else {
                this.completed = [];
                this.awaitingAnalysis = [];
                this.canceled = [];
                this.inProgress = this.getInProgress();
                this.state = 'done';

                return true;
            }
        } catch (error) {
            this.state = 'error';
        }
    }
}

export default new HomeObserverStore();

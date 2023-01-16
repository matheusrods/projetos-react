import { makeAutoObservable } from "mobx";

class CompleteActionStore {
    completedAction = null;
    conclusionDate = null;
    conclusionComments = '';

    constructor() {
        makeAutoObservable(this);
    }

    setData = (values) => {
        for (const key in values) {
            this[key] = values[key];
        }
    }

    getData = () => {
        return {
            completedAction: this.completedAction,
            conclusionDate: this.conclusionDate,
            conclusionComments: this.conclusionComments,
        };
    }

    reset = () => {
        this.completedAction = null;
        this.conclusionDate = null;
        this.conclusionComments = '';
    }
}

export default new CompleteActionStore();

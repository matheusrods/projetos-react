import { makeAutoObservable } from 'mobx';

class ClassificationStore {
    observation = {};
    criticism = {};
    improvementActions = [];
    quality = {};

    constructor() {
        makeAutoObservable(this);
    }

    reset = () => {
        this.observation = {};
        this.criticism = {};
        this.improvementActions = [];
        this.quality = {};
    };

    setNewRegisterData = (params) => {
        for (const key in params) {
            this[key] = params[key];
        }
    };
}

export default new ClassificationStore();

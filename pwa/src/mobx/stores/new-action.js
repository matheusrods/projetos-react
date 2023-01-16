import { makeAutoObservable } from "mobx";
import UserStore from "./user";

class NewAction {
    type = 1;

    associations = [];

    observer = UserStore.user;

    registrationLocation = {
        company: null,
        location: null,
        opco: null,
        businessUnit: null,
    };

    recordSource = {};

    actions = [];

    constructor() {
        makeAutoObservable(this);
    }

    setNewActionData = (params) => {
        for (const key in params) {
            this[key] = params[key];
        }
    };

    resetDynamicFields = () => {
        this.actions = this.actions.map(action => {
            return {
                ...action,
                dynamicFieldsAnswers: {},
            };
        });
    };

    reset = () => {
        this.type = 1;

        this.observer = UserStore.user;

        this.registrationLocation = {
            company: null,
            location: null,
            opco: null,
            businessUnit: null,
        };

        this.recordSource = {};

        this.actions = [];

        this.associations = [];
    };
}

export default new NewAction();

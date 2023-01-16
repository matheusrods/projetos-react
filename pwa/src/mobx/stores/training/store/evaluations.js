import { makeAutoObservable, flow, observable } from 'mobx';

import { api } from '../../../../services/api';
import { initialEffects } from '../../../../utils/helpers';
import trainingActionTypes from '../actionTypes';

class TrainingEvaluationsStore {
    state = {
        questionario: undefined,
        getQuestionarioRequest: initialEffects
    };

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            state: observable
        });
    }

    *fetch({ action, data, url, method, effect }) {
        try {
            if (effect)
                this.state = {
                    ...this.state,
                    [effect]: { ...initialEffects, pending: true }
                };

            const {
                data: { result }
            } = yield api({
                url,
                method,
                data
            });

            switch (action) {
                case trainingActionTypes.GET_EVALUATION_QUESTIONS:
                    this.state = {
                        ...this.state,
                        questionario: result,
                        getQuestionarioRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                default:
                    return this;
            }
        } catch (error) {
            this.state = {
                ...this.state,
                [effect]: { ...initialEffects, error }
            };
        }
    }
}

export default new TrainingEvaluationsStore();

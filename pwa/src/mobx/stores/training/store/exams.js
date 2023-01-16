import {
    makeAutoObservable,
    flow,
    observable,
    runInAction,
    action
} from 'mobx';

import { api } from '../../../../services/api';
import { initialEffects } from '../../../../utils/helpers';
import trainingActionTypes from '../actionTypes';

class TrainingExamsStore {
    state = {
        provas: {
            treinamentos: [],
            competencias: []
        },
        getProvasRequest: initialEffects,
        filtros: undefined,
        patchProvaRequest: initialEffects
    };

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            state: observable,
            resetPatchProvasRequest: action
        });
    }

    resetPatchProvasRequest = () =>
        runInAction(() => (this.state.patchProvaRequest = initialEffects));

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
                case trainingActionTypes.GET_EXAMS_FILTERS:
                    this.state = {
                        ...this.state,
                        filtros: result
                    };
                    break;
                case trainingActionTypes.GET_EXAMS:
                    this.state = {
                        ...this.state,
                        provas: { ...this.state.provas, ...result },
                        getProvasRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.PATCH_EXAMS:
                    this.state = {
                        ...this.state,
                        provas: {
                            ...this.state.provas,
                            [result.tipo]: this.state.provas[result.tipo].map(
                                (c) => (c.codigo === result.codigo ? result : c)
                            )
                        },
                        patchProvaRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                default:
                    return this;
            }
        } catch (error) {
            console.log(
                '🚀 ~ file: exams.js ~ line 78 ~ TrainingExamsStore ~ *fetch ~ error',
                error
            );

            this.state = {
                ...this.state,
                [effect]: { ...initialEffects, error }
            };
        }
    }
}

export default new TrainingExamsStore();

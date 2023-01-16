import {
    makeAutoObservable,
    flow,
    action,
    runInAction,
    observable
} from 'mobx';

import { api } from '../../../../services/api';
import { initialEffects } from '../../../../utils/helpers';
import trainingActionTypes from '../actionTypes';

class TrainingsStore {
    state = {
        treinamentos: [],
        turmas: [],
        getTreinamentosRequest: initialEffects,
        getTreinamentoRequest: initialEffects,
        getTurmasRequest: initialEffects,
        patchTreinamentoRequest: initialEffects,
        postTreinamentoRequest: initialEffects
    };

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            state: observable,
            resetRequests: action
        });
    }

    resetRequests = () =>
        runInAction(() => {
            this.state = {
                ...this.state,
                patchTreinamentoRequest: initialEffects,
                postTreinamentoRequest: initialEffects
            };
        });

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
                case trainingActionTypes.GET_TRAININGS:
                    this.state = {
                        ...this.state,
                        treinamentos: result,
                        getTreinamentosRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.GET_TRAINING:
                    this.state = {
                        ...this.state,
                        treinamentos: [...this.state.treinamentos, result],
                        getTreinamentoRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.GET_CLASSES:
                    this.state = {
                        ...this.state,
                        turmas: result,
                        getTurmasRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.PATCH_TRAINING:
                    this.state = {
                        ...this.state,
                        treinamentos: this.state.treinamentos.map((t) =>
                            t.codigo === parseInt(result.codigo) ? result : t
                        ),
                        patchTreinamentoRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.POST_TRAINING:
                    this.state = {
                        ...this.state,
                        treinamentos: [
                            ...this.state.treinamentos,
                            result
                        ].reduce((acc, cur) => {
                            if (cur.codigo) acc.push(cur);
                            else {
                                acc.push({
                                    ...cur,
                                    turmas: cur.turmas.filter(
                                        ({ codigo }) =>
                                            codigo !== result.turma.codigo
                                    )
                                });
                            }

                            return acc;
                        }, []),
                        postTreinamentoRequest: {
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
                '🚀 ~ file: trainings.js ~ line 54 ~ TrainingsStore ~ *fetch ~ error',
                error
            );

            this.state = {
                ...this.state,
                [effect]: { ...initialEffects, error }
            };
        }
    }
}

export default new TrainingsStore();

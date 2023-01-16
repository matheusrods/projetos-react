import {
    makeAutoObservable,
    flow,
    observable,
    action,
    runInAction
} from 'mobx';

import { api } from '../../../../services/api';
import { initialEffects } from '../../../../utils/helpers';
import trainingActionTypes from '../actionTypes';

class TrainingResumeStore {
    state = {
        avaliacoes: [],
        getAvaliacoesRequest: initialEffects,
        patchAvaliacoesRequest: initialEffects,
        filtros: undefined,
        getFiltrosRequest: initialEffects
    };

    constructor() {
        makeAutoObservable(this, {
            fetch: flow,
            state: observable,
            resetPatchAvaliacoesRequest: action
        });
    }

    resetPatchAvaliacoesRequest = () =>
        runInAction(() => (this.state.patchAvaliacoesRequest = initialEffects));

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
                case trainingActionTypes.GET_EVALUATIONS_FILTERS:
                    this.state = {
                        ...this.state,
                        filtros: result
                    };
                    break;
                case trainingActionTypes.GET_EVALUATIONS:
                    this.state = {
                        ...this.state,
                        avaliacoes: result,
                        getFiltrosRequest: {
                            ...initialEffects,
                            success: true
                        },
                        getAvaliacoesRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.PATCH_EVALUATION:
                    this.state = {
                        ...this.state,
                        avaliacoes: this.state.avaliacoes.map((c) =>
                            c.codigo === result.codigo ? result : c
                        ),
                        patchAvaliacoesRequest: {
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
                '🚀 ~ file: resume.js ~ line 76 ~ TrainingResumeStore ~ *fetch ~ error',
                error
            );

            this.state = {
                ...this.state,
                [effect]: { ...initialEffects, error }
            };
        }
    }
}

export default new TrainingResumeStore();

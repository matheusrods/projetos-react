import { makeAutoObservable, flow, observable } from 'mobx';

import { api } from '../../../../services/api';
import { initialEffects } from '../../../../utils/helpers';
import trainingActionTypes from '../actionTypes';

class TrainingNotificationsStore {
    state = {
        notificacoes: [],
        getNotificacoesRequest: initialEffects,
        patchNotificacoesRequest: initialEffects
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
                case trainingActionTypes.GET_NOTIFICATIONS:
                    this.state = {
                        ...this.state,
                        notificacoes: result,
                        getNotificacoesRequest: {
                            ...initialEffects,
                            success: true
                        }
                    };
                    break;
                case trainingActionTypes.PATCH_NOTIFICATION:
                    this.state = {
                        ...this.state,
                        notificacoes: this.state.notificacoes.map(
                            (notificacao) =>
                                notificacao.codigo === result.codigo
                                    ? result
                                    : notificacao
                        ),
                        patchNotificacoesRequest: {
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

export default new TrainingNotificationsStore();

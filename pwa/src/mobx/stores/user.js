import {
    makeAutoObservable,
    runInAction,
    flow,
} from 'mobx';
import { endpoints } from '../../services/api';

import SessionStore from './session';
import PermissionStore from './permission';
import ProfileStore from './profile';

class UserStore {
    user = {
        id: null,
        avatar: null,
        name: '',
        clientId: null,
        profiles: []
    };

    userCompany = {
        fantasyName: '',
        companyName: '',
        logo: null,
    };


    constructor() {
        makeAutoObservable(this, {
            getUserAuthenticatedRefresh: flow,
        });

        this.getSessionStore();
    }

    getSessionStore = () => {
        const store = SessionStore.getSession('actionPlan@userStore');

        for (const key in store) {
            this[key] = store[key];
        }
    }

    getUserAuthenticated = async (userId = null) => {
        try {
            const authStore = SessionStore.getSession('actionPlan@authStore');

            if (userId || authStore?.userId) {
                const response = await endpoints.user.getById(userId || authStore.userId);

                const { result, status } = response.data;

                if ((status === 200 || status === 201) && result?.data) {
                    const { data } = result;

                    const clientId = data?.FuncionarioSetorCargo?.codigo_cliente ? data.FuncionarioSetorCargo.codigo_cliente : data.cliente.find(cliente => cliente.flag_pda === 1)?.codigo;

                    if (!clientId) {
                        throw new Error('Não foi possível resolver a alocação do usuário.');
                    }

                    runInAction(() => {
                        this.user = {
                            id: data?.codigo_usuario,
                            avatar: data?.avatar,
                            name: data?.nome,
                            clientId,
                            profiles: data?.subperfis
                        };

                        this.userCompany = {
                            companyName: data?.permissoes?.POS?.skin?.razao_social ? data.permissoes.POS.skin.razao_social : '',
                            fantasyName: data?.permissoes?.POS?.skin?.nome_fantasia ? data.permissoes.POS.skin.nome_fantasia : '',
                            logo: data?.permissoes?.POS?.skin?.logo ? data.permissoes.POS.skin.logo : null
                        };
                    });

                    SessionStore.saveSession('actionPlan@userStore', {
                        user: { ...this.user },
                        userCompany: { ...this.userCompany },
                    });

                    if (data?.permissoes?.POS?.acoes && Array.isArray(data.permissoes.POS.acoes)) {
                        PermissionStore.transformResponse(data.permissoes.POS.acoes);
                    }

                    ProfileStore.clearProfiles();
                    if (data?.permissoes?.POS?.inspecao_assessment !== undefined) {
                        ProfileStore.addProfile(data.permissoes.POS.inspecao_assessment);
                    }

                    return { status: true };
                } else {
                    throw new Error('Falha na requisição.');
                }
            } else {
                throw new Error('Nenhum usuário logado.');
            }
        } catch (e) {
            // console.log(`Não foi possível consultar o usuário autenticado. Erro reportado: ${e}`);

            SessionStore.removeSession('actionPlan@userStore');

            return { status: false };
        }
    }

    *getUserAuthenticatedRefresh() {
        const response = yield this.getUserAuthenticated();

        return response;
    };

    get nameFirstLetter() {
        return this.user.name[0];
    }

    get clientId() {
        return this.user.clientId;
    }

    get userId() {
        return this.user.id;
    }

    getProfiles() {

        return this.profiles;
    }

    reset = () => {
        this.user = {
            id: null,
            avatar: null,
            name: '',
            profiles: []
        };

        this.userCompany = {
            fantasyName: '',
            companyName: '',
            logo: null,
        };

        SessionStore.removeSession('actionPlan@userStore');
    }
}

export default new UserStore();

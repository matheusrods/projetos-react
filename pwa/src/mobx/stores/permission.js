import { isNull } from "lodash";
import { makeAutoObservable } from "mobx";

class PermissionStore {
    permissions = [];

    constructor() {
        makeAutoObservable(this);
    };

    /**
     * Esta é uma função que transforma a resposta vinda da API para o que será usado na aplicação
     *
     * @example
     *   transformResponse([{ codigo_acao: "1", acao: "Cadastrar Ação" }]);
     *
     * @param {Object[]} permissionsData Permissões do usuário
     * @returns {void}
     */
    transformResponse = (permissionsData = []) => {
        try {
            const permissions = [];

            permissionsData.forEach((item) => {
                if (item?.codigo_acao) {
                    permissions.push(parseInt(item.codigo_acao));
                }
            });

            this.permissions = permissions;
        } catch (error) {
            this.permissions = [];
        }
    };

    /**
     * Esta é uma função que verifica se o usuário tem uma determinada permissão
     *
     * @example
     *   hasPermission(1); // true
     *
     * @param {Number} permissionId Código da permissão
     * @returns {Boolean} Retorna verdadeiro ou falso
     */
    hasPermission = (permissionId = null) => {
        return !isNull(permissionId) && this.permissions.includes(permissionId)
            ? true
            : false;
    };

    /**
     * Esta é uma função que verifica se o usuário tem pelo menos uma das permissões informadas
     *
     * @example
     *   haveAtLeastOnePermission([1, 2, 3]); // true
     *
     * @param {Number[]} permissions Código da permissão
     * @returns {Boolean} Retorna verdadeiro ou falso
     */
    haveAtLeastOnePermission = (permissions = []) => {
        return permissions.length > 0 && this.permissions.findIndex(permissionId => permissions.includes(permissionId)) !== -1
            ? true
            : false
    };

    userProfileType = () => {
        if (this.haveAtLeastOnePermission([23, 24, 25, 26])) {
            return 'ses';
        } else if (this.haveAtLeastOnePermission([27, 28, 29, 30])) {
            return 'hq';
        }

        return null
    }

    isAdmin = (profiles = []) => {

        return profiles.find(profile => profile.codigo === 5);
    };
}

export default new PermissionStore();

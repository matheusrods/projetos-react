import { makeAutoObservable } from "mobx";

class ProfileStore {
    profiles = [];

    constructor() {
        makeAutoObservable(this, {});
    };

    /**
     * Adiciona um perfil para o array de perfil, podendo ser um ID ou slug
     * @param profile number|string
     */
    addProfile = (profile) => {
        this.profiles.push(profile);
    };

    /**
     * Verifica se o perfil já existe no array de perfil
     * @param profile number|string
     * @returns boolean
     */
    hasProfile = (profile) => {
        return this.profiles.find(p => p === profile);
    };

    /**
     * Verifica se possui ao menos 1 perfil
     * @returns boolean
     */
    haveAtLeastOneProfile = (profiles) => {
        return this.profiles.some(p => profiles.includes(p));
    };

    /**
     * Remove um perfil do array de perfil, podendo ser um ID ou slug
     * @param profile number|string
     */
    removeProfile = (profile) => {
        this.profiles = this.profiles.filter(p => p !== profile);
    };

    /**
     * Limpa o array de perfil
     */
    clearProfiles = () => {
        this.profiles = [];
    }

}

export default new ProfileStore();

import { makeAutoObservable } from "mobx";

class AuditSesStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export default new AuditSesStore();

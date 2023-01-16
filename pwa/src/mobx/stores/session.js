import { action, makeObservable } from 'mobx';

class SessionStore {
    constructor() {
        makeObservable(this, {
            getSession: action,
            saveSession: action,
            removeSession: action
        });
    }

    getSession = (store) => {
        const session = localStorage.getItem(store);

        return session ? JSON.parse(session) : {};
    }

    saveSession = (store, data) => {
        const session = this.getSession();

        localStorage.setItem(store, JSON.stringify({ ...session, ...data }));
    }

    removeSession = async (store) => {
        localStorage.removeItem(store)
    }
}

export default new SessionStore();
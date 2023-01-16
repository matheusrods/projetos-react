import { makeAutoObservable } from 'mobx';
// import UserStore from '../user';

class Signatures {

    signaturesAudit = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Recebe um objeto
    setSignature = (data) => {
        this.signaturesAudit = [...this.signaturesAudit, data];
    };

    reset = () => {
        this.signaturesAudit = [];
    };
}

export default new Signatures();

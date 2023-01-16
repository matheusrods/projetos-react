import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import UserStore from '../user';
import SessionStore from '../session';

class NewRegisterObserver {
    uuid = null;
    date = null;
    type = {
        id: null,
        label: null
    };
    observer = UserStore.user;
    observerLocation = null;
    registrationLocation = {
        company: null,
        location: null,
        opco: null,
        businessUnit: null,
    };
    dateTime = {
        date: new Date(),
        time: '00:00'
    };
    description = {
        whatIObserved: null,
        whatIDid: null,
        complementaryAction: null,
        description: null,
        local: null
    };
    riskAgents = [];
    pictures = [];
    currentStep = null;

    constructor() {
        makeAutoObservable(this);
    }

    getRiskAgent = (id) => {
        return this.riskAgents.find((item) => item.id === id);
    };

    createOrUpdateRiskAgents = (data) => {
        data.forEach(({ id = null, ...response }) => {
            if (id) {
                const riskAgentIndex = this.riskAgents.findIndex(
                    (item) => item.id === id
                );
                const riskAgents = this.riskAgents;

                if (riskAgentIndex !== -1) {
                    riskAgents[riskAgentIndex] = {
                        ...riskAgents[riskAgentIndex],
                        ...response
                    };

                    this.riskAgents = [...riskAgents];
                } else {
                    this.riskAgents = [
                        ...this.riskAgents,
                        {
                            id: uuid(),
                            ...response
                        }
                    ];
                }
            } else {
                this.riskAgents = [
                    ...this.riskAgents,
                    {
                        id: uuid(),
                        ...response
                    }
                ];
            }
        });

        const store = SessionStore.getSession('observerEHS@newRegisterStore');

        const { registers } = store;

        if (registers) {
            const findIndex = registers.findIndex(
                (item) => item.uuid === this.uuid
            );

            if (findIndex !== -1) {
                registers[findIndex] = {
                    ...registers[findIndex],
                    riskAgents: this.riskAgents
                };

                SessionStore.saveSession('observerEHS@newRegisterStore', {
                    registers
                });
            } else {
                toast.warning('Não foi possível salvar localmente!');
            }
        } else {
            toast.warning('Não foi possível salvar localmente!');
        }
    };

    removeRiskAgent = (id) => {
        this.riskAgents = this.riskAgents.filter((item) => item.id !== id);
    };

    setNewRegisterData = (params, updateLocal = true) => {
        for (const key in params) {
            this[key] = params[key];
        }

        if (updateLocal) {
            const store = SessionStore.getSession(
                'observerEHS@newRegisterStore'
            );

            const { registers } = store;

            if (!registers) {
                SessionStore.saveSession('observerEHS@newRegisterStore', {
                    registers: [
                        {
                            uuid: this.uuid,
                            date: this.date,
                            type: this.type,
                            observer: this.observer,
                            observerLocation: this.observerLocation,
                            registrationLocation: this.registrationLocation,
                            dateTime: this.dateTime,
                            description: this.description,
                            riskAgents: this.riskAgents,
                            pictures: this.pictures,
                            currentStep: this.currentStep
                        }
                    ]
                });
            } else {
                const findIndex = registers.findIndex(
                    (item) => item.uuid === this.uuid
                );

                if (findIndex !== -1) {
                    registers[findIndex] = {
                        ...registers[findIndex],
                        ...params
                    };

                    SessionStore.saveSession('observerEHS@newRegisterStore', {
                        registers
                    });
                } else {
                    SessionStore.saveSession('observerEHS@newRegisterStore', {
                        registers: [
                            ...registers,
                            {
                                uuid: this.uuid,
                                date: this.date,
                                type: this.type,
                                observer: this.observer,
                                observerLocation: this.observerLocation,
                                registrationLocation: this.registrationLocation,
                                dateTime: this.dateTime,
                                description: this.description,
                                riskAgents: this.riskAgents,
                                pictures: this.pictures,
                                currentStep: this.currentStep
                            }
                        ]
                    });
                }
            }
        }
    };

    setCurrentRecord = (id = null) => {
        const store = SessionStore.getSession('observerEHS@newRegisterStore');

        const { registers } = store;

        if (registers && id) {
            const register = registers.find((item) => item.uuid === id);

            if (register) {
                this.setNewRegisterData(register, false);

                return (
                    register.currentStep ??
                    '/observer-ehs/new-register/observer'
                );
            } else {
                toast.error(
                    'Não foi possível encontrar esse dado na base local!'
                );
                return false;
            }
        } else {
            this.uuid = uuid();
            this.date = new Date().toLocaleDateString('pt-BR');
            this.type = {
                id: null,
                label: null
            };
            this.observer = UserStore.user;
            this.observerLocation = null;
            this.registrationLocation = {
                company: null,
                location: null,
                opco: null,
                businessUnit: null,
            };
            this.dateTime = {
                date: new Date(),
                time: '00:00'
            };
            this.description = {
                whatIObserved: null,
                whatIDid: null,
                complementaryAction: null,
                description: null
            };
            this.riskAgents = [];
            this.pictures = [];
            this.currentStep = '/observer-ehs/new-register/observer';

            return '/observer-ehs/new-register/observer';
        }
    };

    reset = () => {
        this.type = {
            id: null,
            label: null
        };

        this.observer = UserStore.user;

        this.observerLocation = null;

        this.registrationLocation = {
            company: null,
            location: null,
            OPCO: null,
            businessUnit: null,
        };

        this.dateTime = {
            date: new Date(),
            time: '00:00'
        };

        this.description = {
            whatIObserved: null,
            whatIDid: null,
            complementaryAction: null,
            description: null,
            local: null
        };

        this.pictures = [];

        this.riskAgents = [];
    };
}

export default new NewRegisterObserver();

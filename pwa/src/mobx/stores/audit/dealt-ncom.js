import { makeAutoObservable } from 'mobx';
import UserStore from '../user';

class DealtNcom {
    teamAnalysis = [
        {
            id: null,
            name: null
        }
    ];
    methodology = [
        {
            id: null,
            name: null,
            upload: null
        }
    ];
    methodIshikawa = {
        options: []
    };
    method5w2h = {
        answers: []
    };
    method5pqs = {
        answers: []
    };
    investigationCause = '';
    improvementActions = {
        date: null,
        form: {},
        answers: {},
        participants: [],
        observer: UserStore.user,
        registrationLocation: {
            company: null,
            location: null,
            OPCO: null,
            businessUnit: null,
        },
        facilitator: {},
        commitments: '',
        currentStep: null,
        summary: {
            description: null,
            operation: null,
            timeObservation: null,
            dateObservation: null,
            location: null
        },
        linkActionToObservation: [],
    }

    constructor() {
        makeAutoObservable(this);
    }

    setTeamAnalysis = (data) => {
        this.teamAnalysis = data;
    };

    setOptionsMethodIshikawa = (data) => {
        this.methodIshikawa = {
            options: [
                ...data.map((item) => {
                    return {
                        ...item,
                        answers: {
                            cause1: item?.answers?.cause1 ?? '',
                            cause2: item?.answers?.cause2 ?? ''
                        }
                    };
                })
            ]
        };
    };

    setInvestigationCause = (data) => {
        this.investigationCause = data;
    };

    setAnswers5w2h = (data) => {
        this.method5w2h.answers = data;
    };

    setAnswers5pqs = (data) => {
        this.method5pqs.answers = data;
    };

    get optionsMethodIshikawa() {
        return this.methodIshikawa.options;
    }

    get InvestigationCause() {
        return this.investigationCause;
    }

    get TeamAnalysis() {
        return this.teamAnalysis;
    }

    get Answers5w2h() {
        return this.method5w2h.answers;
    }

    get Answers5pqs() {
        return this.method5pqs.answers;
    }

    reset = () => {
        this.teamAnalysis = [
            {
                id: null,
                name: null
            }
        ];
        this.methodology = [
            {
                id: null,
                name: null,
                upload: null
            }
        ];
        this.methodIshikawa = {
            options: []
        };
        this.method5w2h = {
            answers: []
        };
        this.method5pqs = {
            answers: []
        };
        this.investigationCause = '';
    };
}

export default new DealtNcom();

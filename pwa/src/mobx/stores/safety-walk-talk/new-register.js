import { action, makeObservable, observable } from 'mobx';
import { getForm } from '../../../services/endpoints/swt/form';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import UserStore from '../user';
import SessionStore from '../session';

class NewRegisterSWT {
    uuid = null;
    date = null;
    form = {};
    answers = {};
    participants = [];
    observer = UserStore.user;
    registrationLocation = {
        company: null,
        location: null,
        opco: null,
        businessUnit: null,
    };
    facilitator = {};
    commitments = '';
    currentStep = null;
    summary = {
        description: null,
        operation: null,
        timeObservation: null,
        dateObservation: null,
        location: null
    };
    linkActionToObservation = [];

    constructor() {
        makeObservable(this, {
            form: observable,
            linkActionToObservation: observable,
            currentStep: observable,
            summary: observable,
            observer: observable,
            answers: observable,
            registrationLocation: observable,
            getTopic: action,
            getAnswers: action,
            saveAnswers: action,
            saveAnswer: action,
            pickUpSpecificQuestion: action,
            getForm: action,
            setNewRegisterData: action
        });
    }

    getForm = async (clientId) => {
        const response = await getForm(clientId, 1);

        if (response) {
            this.setNewRegisterData({ form: { ...response } });

            return true;
        } else {
            this.setNewRegisterData({ form: {} });

            return false;
        }
    };

    saveAnswers = (step, topicId, answers) => {
        this.answers[topicId] = answers;

        const store = SessionStore.getSession(
            'safetyWalkTalk@newRegisterStore'
        );

        const { registers } = store;

        if (registers) {
            const findIndex = registers.findIndex(
                (item) => item.uuid === this.uuid
            );

            if (findIndex !== -1) {
                registers[findIndex] = {
                    ...registers[findIndex],
                    answers: this.answers
                };

                SessionStore.saveSession('safetyWalkTalk@newRegisterStore', {
                    registers
                });
            } else {
                toast.warning('Não foi possível salvar localmente!');
            }
        } else {
            toast.warning('Não foi possível salvar localmente!');
        }

        const nextStep = step + 1;

        return this.getTopic(nextStep) !== null
            ? nextStep.toString()
            : '/safety-walk-talk/new-register/commitments';
    };

    saveAnswer = (topicId, questionId, answer) => {
        const topic =
            this.form.topics.find((item) => item.id === topicId) ?? null;

        if (topic) {
            this.answers[topic.id] = {
                ...this.answers[topic.id],
                [questionId]: answer
            };
        }

        const store = SessionStore.getSession(
            'safetyWalkTalk@newRegisterStore'
        );

        const { registers } = store;

        const findIndex = registers.findIndex(
            (item) => item.uuid === this.uuid
        );

        registers[findIndex] = {
            ...registers[findIndex],
            answers: this.answers
        };

        SessionStore.saveSession('safetyWalkTalk@newRegisterStore', {
            registers
        });
    };

    getTopic = (step) => {
        return this.form.topics[step - 1] ?? null;
    };

    getAnswers = (topicId) => {
        return this.answers[topicId] ?? {};
    };

    pickUpSpecificQuestion = (topicId, questionId) => {
        const topic =
            this.form.topics.find((item) => item.id === topicId) ?? null;

        if (!topic) return null;

        const question = topic.questions.find((item) => item.id === questionId);

        const answer =
            this.answers[topic.id] &&
            typeof this.answers[topic.id][questionId] !== 'undefined'
                ? this.answers[topic.id][questionId]
                : {
                      radioButton: null,
                      criticality: 1,
                      reason: ''
                  };

        return { question, answer };
    };

    setNewRegisterData = (params, updateLocal = true) => {
        for (const key in params) {
            this[key] = params[key];
        }

        if (updateLocal) {
            const store = SessionStore.getSession(
                'safetyWalkTalk@newRegisterStore'
            );

            const { registers } = store;

            if (!registers) {
                SessionStore.saveSession('safetyWalkTalk@newRegisterStore', {
                    registers: [
                        {
                            uuid: this.uuid,
                            date: this.date,
                            form: this.form,
                            answers: this.answers,
                            participants: this.participants,
                            observer: this.observer,
                            registrationLocation: this.registrationLocation,
                            facilitator: this.facilitator,
                            commitments: this.commitments,
                            currentStep: this.currentStep,
                            summary: this.summary,
                            linkActionToObservation:
                                this.linkActionToObservation
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

                    SessionStore.saveSession(
                        'safetyWalkTalk@newRegisterStore',
                        { registers }
                    );
                } else {
                    SessionStore.saveSession(
                        'safetyWalkTalk@newRegisterStore',
                        {
                            registers: [
                                ...registers,
                                {
                                    uuid: this.uuid,
                                    date: this.date,
                                    form: this.form,
                                    answers: this.answers,
                                    participants: this.participants,
                                    observer: this.observer,
                                    registrationLocation:
                                        this.registrationLocation,
                                    facilitator: this.facilitator,
                                    commitments: this.commitments,
                                    currentStep: this.currentStep,
                                    summary: this.summary,
                                    linkActionToObservation:
                                        this.linkActionToObservation
                                }
                            ]
                        }
                    );
                }
            }
        }
    };

    setCurrentRecord = (id = null) => {
        const store = SessionStore.getSession(
            'safetyWalkTalk@newRegisterStore'
        );

        const { registers } = store;

        if (registers && id) {
            const register = registers.find((item) => item.uuid === id);

            if (register) {
                this.setNewRegisterData(register, false);

                return (
                    register.currentStep ??
                    '/safety-walk-talk/new-register/observer'
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
            this.form = {};
            this.answers = {};
            this.participants = [];
            this.observer = UserStore.user;
            this.registrationLocation = {
                company: null,
                location: null,
                opco: null,
                businessUnit: null,
            };
            this.facilitator = {};
            this.commitments = '';
            this.currentStep = '/safety-walk-talk/new-register/observer';
            this.summary = {
                description: null,
                operation: null,
                location: null,
                timeObservation: null,
                dateObservation: null
            };
            this.linkActionToObservation = [];

            return '/safety-walk-talk/new-register/observer';
        }
    };

    getQuestions = () => {
        let questions = [];

        this.form.topics.forEach((topic) => {
            const questionsTopic = [];

            topic.questions.forEach((question) => {
                if (
                    typeof this.answers[topic.id][question.id] !==
                        'undefined' &&
                    this.answers[topic.id][question.id].radioButton === 0
                ) {
                    questionsTopic.push({
                        id: question.id,
                        name: question.title
                    });
                }
            });

            questions = questions.concat(questionsTopic);
        });

        return questions.sort((a, b) => a.id - b.id);
    };
}

export default new NewRegisterSWT();

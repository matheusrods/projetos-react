import { makeAutoObservable } from 'mobx';
import { getForm } from '../../../services/endpoints/swt/form';

class QualityAnalysisSWT {
    form = {};
    answers = {};

    constructor() {
        makeAutoObservable(this);
    }

    getForm = async (clientId) => {
        const response = await getForm(clientId, 2);

        if (response) {
            this.form = { ...response };

            return true;
        } else {
            this.form = {};

            return false;
        }
    };

    saveAnswers = (step, topicId, answers, actionId) => {
        this.answers[topicId] = answers;

        const nextStep = step + 1;

        return (this.getTopic(nextStep) !== null)
            ? nextStep.toString()
            : `/safety-walk-talk/quality-analysis/${actionId}/confirm`;
    };

    saveAnswer = (topicId, questionId, answer) => {
        const topic = this.form.topics.find(item => item.id === topicId) ?? null;

        if (topic) {
            this.answers[topic.id] = { ...this.answers[topic.id], [questionId]: answer };
        }
    };

    getTopic = (step) => {
        return this.form.topics[step - 1] ?? null;
    };

    getAnswers = (topicId) => {
        return this.answers[topicId] ?? {};
    };

    pickUpSpecificQuestion = (topicId, questionId) => {
        const topic = this.form.topics.find(item => item.id === topicId) ?? null;

        if (!topic) return null;

        const question = topic.questions.find(item => item.id === questionId);

        const answer = (this.answers[topic.id] && typeof this.answers[topic.id][questionId] !== 'undefined') ? this.answers[topic.id][questionId] : {
            radioButton: null,
            reason: '',
        };

        return { question, answer };
    };

    getQualityAnalysisItems = () => {
        const qualityAnalysisItems = this.form.topics.map((topic) => {
            const questions = topic.questions.map((question) => {
                const answer = this.answers[topic.id][question.id];
                return {
                    id: question.id,
                    title: question.title,
                    answer: {
                        radioButton: this.labelAnswerByRadioValue(answer.radioButton),
                        reason: answer.reason
                    }
                }
            });
            return {
                id: topic.id,
                title: topic.title,
                questions
            }
        });

        return qualityAnalysisItems;
    };

    labelAnswerByRadioValue = (valueRadio) => {
        switch (valueRadio) {
            case 0: return 'Não';

            case 1: return 'Sim';

            case 3: return 'Não se aplica';

            default: return 'Não se aplica';
        }
    }

    get formId() {
        return this.form.id;
    }

    reset = () => {
        this.form = {};
        this.answers = {};
    }

}

export default new QualityAnalysisSWT();


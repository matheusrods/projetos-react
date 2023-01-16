import { makeAutoObservable } from 'mobx';
import {
    getInspectionById,
    updateInspection,
    getQuestionsByFormInspection,
    saveAnswerQuestion,
    saveAnswerPhoto,
    saveSignatureInspection,
    linkQuestionToAction,
    saveImprovementActions,
    getAnsweredQuestionsByInspection
} from '../../../services/endpoints/inspection/inspection';
import UserStore from '../user';
import {toast} from "react-toastify";
import {getActions} from "../../../services/endpoints/actions";

class InspectionQuestionsStore {
    labelNextStep = 'Iniciar Inspeção';
    title = '';
    step = null;
    backStep = null;
    inspection = {};
    equipmentCode = '';
    selectedForm = null;
    currentQuestion = null;
    currentQuestionIndex = 0;
    questions = [];
    answeredQuestions = [];
    nextDisabled = false;
    hasMoreForms = false;
    nextAction = () => {};

    constructor() {
        makeAutoObservable(this, {});
    }

    setHasMoreForms = (hasMoreForms) => {
        this.hasMoreForms = hasMoreForms;
    }

    setCurrentQuestionIndex = (index) => {
        this.currentQuestionIndex = index;
    };

    setNextDisabled = (value) => {
        this.nextDisabled = value;
    }

    setSelectedForm = (form) => {
        this.selectedForm = form;
    }
    setEquipmentCode = (equipmentCode) => {
        this.equipmentCode = equipmentCode;
    }
    setTitle = (title) => {
        this.title = title;
    }
    setStep = (step) => {
        this.step = step;
    }
    setBackStep = (step) => {
        this.backStep = step;
    }

    setLabelNextStep = (label) =>{
        this.labelNextStep = label;
    }

    setInspection = (inspection) =>{
        this.inspection = inspection;
    }

    getInspectionById = async (id) => {
        const data = await getInspectionById(UserStore.clientId, id);
        this.setInspection(data);
    }

    setNextAction = (action) => {
        this.nextAction = action;
    }

    backAction = () => {
        this.setStep(this.backStep);
    }

    getSelectedForm = () => {
        return this.inspection.forms.filter(form => form.id === this.selectedForm)[0];
    }

    updateInspection = async (inspection, nextStep, message) => {
        this.setNextDisabled(true);
        const data = await updateInspection(inspection);
        this.setNextDisabled(false);
        if(data){
            toast.success(message);
            this.setStep(nextStep);
        }

    }

    updateInspectionWithoutAction = async (inspection) => {
        this.setNextDisabled(true);
        await updateInspection(inspection);
        this.setNextDisabled(false);
    }

    setQuestions = (questions) => {
        this.questions = questions;
    }

    getQuestionsByForm = async (formId) => {
        const answered = await getAnsweredQuestionsByInspection(UserStore.clientId, this.inspection.id);
        const data = await getQuestionsByFormInspection(UserStore.clientId, formId);
        let newData = [];
        for(const item of data){
            const question = answered.find(answer => answer.questionId === item.id);
            if(question === undefined){
                newData.push(item);
            }
            for (const subItem of item.linked){
                const question = answered.find(answer => answer.questionId === subItem.id);
                if(question === undefined){
                    newData.push(subItem);
                }
            }
        }

        this.setQuestions(newData);
    }

    saveAnswer = async (answer) => {
        const data = await saveAnswerQuestion(answer);
        return data;
    }

    uploadImage = async (answer) => {
        const data = await saveAnswerPhoto(answer);
        return data;
    }

    setCurrentQuestion = (question) => {
        this.currentQuestion = question;
    }

    uploadSignature = async (signature) => {
        const data = await saveSignatureInspection(signature);
        return data;
    }

    getAllQuestions = async () => {
        this.setQuestions([]);
        let questions = [];
        for(const form of this.inspection.forms){
            const data = await getQuestionsByFormInspection(UserStore.clientId, form.id);
            let newData = [];
            for(const item of data){
                newData.push(item);
                for (const subItem of item.linked){
                    newData.push(subItem);
                }
            }

            questions = [...questions, ...newData];
        }
        this.setQuestions(questions);
        return questions;
    }

    getActionsList = async () => {
        const data = await getActions({autor: 3});
        return data;
    }

    linkQuestionToAction = async (questionId, actionId) => {
        const data = await linkQuestionToAction({
            "codigo_inspecao": this.inspection.id,
            "codigo_acao": actionId,
            "codigo_questao": questionId
        });
        return data;
    }
    saveImprovementAction = async (form) => {
        const dataSave = [{
            codigo_origem_ferramenta: form.origin ?? 50,
            codigo_cliente_observacao: UserStore.clientId,
            codigo_usuario_identificador: UserStore.userId,
            codigo_usuario_responsavel: form.responsible,
            codigo_pos_criticidade: form.criticism,
            codigo_acoes_melhorias_tipo: form.action_type,
            codigo_acoes_melhorias_status: form.action_status,
            descricao_desvio: form.deviation,
            descricao_acao: form.description,
            descricao_local_acao: form.location,
            prazo: form.completion_time ?? null,
            codigo_cliente_opco: this.inspection.opco,
            codigo_cliente_bu: this.inspection.bu,
            formulario_resposta: "{}",
        }];
        const data = await saveImprovementActions(dataSave);
        return data.id;
    }

    getAnsweredQuestions = async (inspectionId) => {
        const data = await getAnsweredQuestionsByInspection(UserStore.clientId, inspectionId);
        this.setAnsweredQuestions(data);
    }
    setAnsweredQuestions = (questions) => {
        this.answeredQuestions = questions;
    }


}

export default new InspectionQuestionsStore();

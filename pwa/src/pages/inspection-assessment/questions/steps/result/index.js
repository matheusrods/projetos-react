import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container
} from './styles';
import { useLocation } from 'react-router-dom';

import TypeConformity from "./type-conformity";
import TypeGrade from "./type-grade";
import TypeConfirm from "./type-confirm";
import TypeAspect from "./type-aspect";


const ResultInspection = ({ InspectionQuestionsStore }) => {
    const location = useLocation();
    const [form, setForm] = React.useState({});

    const {
        setLabelNextStep,
        setNextAction,
        setStep,
        inspection,
        getInspectionById,
        selectedForm,
        getSelectedForm,
        hasMoreForms,
        setHasMoreForms,
    } = InspectionQuestionsStore;

    const renderType = (type) => {
        switch (type) {
            case '3':
                return <TypeConformity inspection={inspection} form={getSelectedForm()} />;
            case '2':
                return <TypeGrade inspection={inspection} form={getSelectedForm()} />;
            case '1':
                return <TypeConfirm inspection={inspection} form={getSelectedForm()} />;
            case '4':
                return <TypeAspect inspection={inspection} form={getSelectedForm()} />;
            default:
                return '';
        }
    };


    useEffect(() => {
        if(hasMoreForms){
            setLabelNextStep('Próxima inspeção');
            setNextAction(() => setStep('form'));
        }else if(inspection.forms.length > 1){
            setLabelNextStep('Ver resultados');
            setNextAction(() => setStep('summary'));
        }else{
            setLabelNextStep('Coletar Assinaturas');
            setNextAction(() => setStep('signatures'));
        }

    }, [setLabelNextStep, hasMoreForms, setNextAction, setStep]);

    useEffect(() => {
        getInspectionById(inspection.id);
    }, [getInspectionById, inspection.id]);

    useEffect(() => {
        setHasMoreForms(false);
        for(const form of inspection.forms){
            if(form.answered === false || form.answered === null){
                setHasMoreForms(true);
            }
        }
    }, [inspection, setHasMoreForms]);

    useEffect(() => {
        setForm(getSelectedForm());
    }, [selectedForm, getSelectedForm]);

    return (
        <Container key={location.key}>
            {renderType(form.type)}
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(ResultInspection));

import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
    Paragraph,
} from './styles';
import { useLocation } from 'react-router-dom';
import {RadioButtonGroup} from "../../../../../components/molecules";

const FormQuestionInspection = ({ InspectionQuestionsStore }) => {
    const location = useLocation();
    const [forms, setForms] = useState([]);

    const {
        inspection,
        setSelectedForm,
        selectedForm,
        setNextAction,
        setTitle,
        setStep,
        setNextDisabled,
    } = InspectionQuestionsStore;

    useEffect(() => {
        setSelectedForm(null);
        setTitle('Inspeção');
        setNextAction(() => setStep('question'));
        for(const form of inspection.forms) {
            if(form.answered === false || form.answered === null) {
                setForms(forms => [...forms, {'id': form.id, 'label': form.name}]);
            }
        }

    }, [setTitle, inspection]);

    useEffect(() => {
        if(selectedForm !== null){
            setNextDisabled(false);
        }else{
            setNextDisabled(true);
        }
    }, [selectedForm, setNextDisabled]);


    return (
        <Container key={location.key}>
            <Paragraph>Esta inspeção possui mais de um formulário a ser aplicado. Escolha o formulário pelo qual deseja começar a inspeção.</Paragraph>

            <RadioButtonGroup
                name="form"
                options={forms}
                onSelect={(id) => setSelectedForm(id)}
                selected={selectedForm}
            />
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(FormQuestionInspection));

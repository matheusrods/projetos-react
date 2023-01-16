import React from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
} from './styles';
import { useLocation } from 'react-router-dom';
import {IconMessageFull} from "../../../../../components/atoms";

const FinishQuestionInspection = ({  }) => {
    const location = useLocation();

    return (
        <Container key={location.key}>
            <IconMessageFull multiline label={['Enviado!','Inspeção finalizada com sucesso!']} />
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(FinishQuestionInspection));

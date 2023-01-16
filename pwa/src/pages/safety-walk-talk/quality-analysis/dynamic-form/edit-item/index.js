import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { WhiteHeader } from '../../../../../components/atoms';
import { ConfirmCancelFooter, Header, QuestionDynamicForm } from '../../../../../components/organisms';
import {
    Container,
    Content,
    ContainerModal,
    DescriptionModal,
    TitleModal,
} from './styles';
import _ from 'lodash';
import { ModalComplex } from '../../../../../components/molecules';

const QualityAnalysisDynamicFormEditItem = ({ QualityAnalysisSWT, match: { params: { step, question } }, ...props }) => {
    const history = useHistory();

    const { pickUpSpecificQuestion, saveAnswer } = QualityAnalysisSWT;

    const [issue, setIssue] = useState(null);
    const [answer, setAnswer] = useState({});
    const [modalInfo, setModalInfo] = useState({ visible: false, info: '' });

    useEffect(() => {
        const response = pickUpSpecificQuestion(parseInt(step), parseInt(question));

        if (!response) {
            history.goBack();
        }

        setIssue(response.question);
        setAnswer(response.answer);
    }, [history, pickUpSpecificQuestion, question, step])

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Editar item analisado'}
                    onClose={() => history.goBack()}
                />
                <Content>
                    {issue &&
                        <QuestionDynamicForm
                            title={issue.title}
                            answer={answer ?? {}}
                            notSlider={true}
                            openInfo={() => setModalInfo({ visible: true, info: issue.knowMore })}
                            hasKnowMore={!!issue.knowMore}
                            onChange={(newValues) => setAnswer((state) => ({ ...state, ...newValues }))}
                        />
                    }
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={'Salvar'}
                    cancelButtonLabel={'Cancelar'}
                    confirmButtonDisabled={
                        _.isNull(answer.radioButton)
                        || (answer.radioButton === 1 && _.isEmpty(answer.reason))
                        || (answer.radioButton === 0 && _.isEmpty(answer.reason))
                    }
                    onCancel={() => history.goBack()}
                    onConfirm={() => {
                        saveAnswer(parseInt(step), issue.id, answer);
                        history.goBack();
                    }}
                />
            </Container>
            <ModalComplex
                nameModal={'question-info'}
                visible={modalInfo.visible}
                onCancel={() => setModalInfo((state) => ({ ...state, visible: false }))}
                onConfirm={() => setModalInfo((state) => ({ ...state, visible: false }))}
                confirmButtonLabel={'Ok, entendi'}
                uniqueFooterButton={true}
            >
                <ContainerModal>
                    <TitleModal>Saiba mais</TitleModal>
                    <DescriptionModal>
                        {modalInfo.info}
                    </DescriptionModal>
                </ContainerModal>
            </ModalComplex>
        </Fragment>
    );
}

export default inject('QualityAnalysisSWT')(observer(QualityAnalysisDynamicFormEditItem));

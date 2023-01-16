import React, { Fragment, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import { Header, QuestionDynamicForm } from '../../../../components/organisms';
import { ModalComplex } from '../../../../components/molecules';
import {
    Container,
    Content,
    PageInfo,
    TopicTitle,
    Steps,
    Questions,
    NotApplicableAllQuestions,
    Checkbox,
    ContainerModal,
    TitleModal,
    DescriptionModal,
} from './styles';
import { FaCheck, FaFastForward, FaExclamationTriangle } from 'react-icons/fa';
import _ from 'lodash';
import colors from '../../../../styles/colors';

function NewRegisterDynamicForm({
    NewRegisterSWT,
    match: {
        params: { step }
    },
    ...props
}) {
    const history = useHistory();

    const refContainer = useRef(null);

    const {
        getTopic,
        getAnswers,
        saveAnswers,
        setNewRegisterData
    } = NewRegisterSWT;

    const [topic, setTopic] = useState(null);
    const [answers, setAnswers] = useState({});
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState(false);
    const [modalInfo, setModalInfo] = useState({ visible: false, info: '' });

    useEffect(() => {
        refContainer.current.scrollTo(0, 0);

        const stepFormatted = parseInt(step);

        const topicData = getTopic(stepFormatted);

        if (topicData) {
            const { id, questions } = topicData;

            const answersData = getAnswers(id);

            const formattedAnswers = {};

            questions.forEach((item) => {
                const oldAnswer = Object(answersData).hasOwnProperty(item.id)
                    ? answersData[item.id]
                    : {};

                formattedAnswers[item.id] = {
                    radioButton: null,
                    criticality: item?.criticalityLevels[0]
                        ? item.criticalityLevels[0].startValue
                        : 1,
                    reason: '',
                    ...oldAnswer
                };
            });

            setTopic(topicData);
            setAnswers(formattedAnswers);
        } else {
            alert('Tópico não encontrado!');
        }
    }, [getAnswers, getTopic, step]);

    const allQuestionsNotApplicable = () => {
        let notApplicable = true;

        for (const key in answers) {
            if (answers[key].radioButton !== 3) {
                notApplicable = false;
            }
        }

        return notApplicable;
    };

    const handleNotApplicableAllQuestions = () => {
        const newAnswers = answers;

        const notApplicable = allQuestionsNotApplicable();

        for (const key in newAnswers) {
            const question = topic.questions.find((item) => item.id === key);
            newAnswers[key] = {
                radioButton: notApplicable ? null : 3,
                criticality: question?.criticalityLevels[0]
                    ? question.criticalityLevels[0].startValue
                    : 1,
                reason: ''
            };
        }

        setAnswers({ ...newAnswers });
    };

    const existUnansweredQuestions = () => {
        let existUnansweredQuestion = false;

        for (const key in answers) {
            const { radioButton, reason } = answers[key];

            if (
                _.isNull(radioButton) ||
                (radioButton === 1 && _.isEmpty(reason)) ||
                (radioButton === 0 && _.isEmpty(reason))
            ) {
                existUnansweredQuestion = true;
            }
        }

        return existUnansweredQuestion;
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content ref={refContainer}>
                    {topic && (
                        <Fragment>
                            <PageInfo>
                                <Steps>Passo {topic.steps}</Steps>
                                <TopicTitle>{topic.title}</TopicTitle>
                            </PageInfo>
                            <Questions>
                                {topic?.questions &&
                                    topic.questions.map((question, index) => {
                                        const {
                                            id,
                                            title,
                                            knowMore,
                                            criticalityLevels
                                        } = question;

                                        return (
                                            <QuestionDynamicForm
                                                key={index.toString()}
                                                title={title}
                                                answer={answers[id] ?? {}}
                                                criticalityLevels={criticalityLevels ?? []}
                                                openInfo={() => setModalInfo({ visible: true, info: knowMore })}
                                                hasKnowMore={!!knowMore}
                                                onChange={(newValues) =>
                                                    setAnswers((state) => ({
                                                        ...state,
                                                        [id]: {
                                                            ...state[id],
                                                            ...newValues
                                                        }
                                                    }))
                                                }
                                            />
                                        );
                                    })}
                            </Questions>
                        </Fragment>
                    )}
                </Content>
                <NotApplicableAllQuestions
                    onClick={() =>
                        allQuestionsNotApplicable() === true
                            ? handleNotApplicableAllQuestions()
                            : setAlertModalVisible(true)
                    }
                >
                    <Checkbox active={allQuestionsNotApplicable()}>
                        <FaCheck />
                    </Checkbox>
                    Nenhuma pergunta se aplica
                </NotApplicableAllQuestions>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        saveAnswers(
                            parseInt(step),
                            topic.id,
                            answers
                        );

                        if (parseInt(step) === 1) {
                            history.push(
                                '/safety-walk-talk/new-register/facilitator'
                            );

                            return;
                        }

                        history.push(
                            `/safety-walk-talk/new-register/dynamic-form/${parseInt(
                                step - 1
                            )}`
                        );
                    }}
                    nextDisabled={existUnansweredQuestions()}
                    onNext={() => {
                        const result = saveAnswers(
                            parseInt(step),
                            topic.id,
                            answers
                        );

                        setNewRegisterData({
                            currentStep: `/safety-walk-talk/new-register/dynamic-form/${parseInt(
                                step
                            )}`
                        });

                        history.push(result, step);
                    }}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => {
                    handleNotApplicableAllQuestions();
                    setAlertModalVisible(false);
                }}
                icon={<FaFastForward size={40} color={colors.blueAux} />}
                title={'Seção não se aplica'}
                description={
                    'Clique em prosseguir para responder todas as perguntas desta seção como ”Não se aplica”'
                }
                confirmButtonLabel={'Prosseguir'}
                cancelButtonLabel={'Cancelar'}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, você perdera os dados dessa tela. Tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/safety-walk-talk/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
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

export default inject('NewRegisterSWT')(observer(NewRegisterDynamicForm));

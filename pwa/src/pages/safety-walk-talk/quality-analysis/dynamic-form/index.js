import React, { Fragment, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import { QuestionDynamicForm, Header } from '../../../../components/organisms';
import { ModalComplex } from '../../../../components/molecules';
import colors from '../../../../styles/colors';
import _ from 'lodash';

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

function QualityAnalysisDynamicForm({ QualityAnalysisSWT, match: { params: { step } }, ...props }) {
    const { getTopic, getAnswers, saveAnswers} = QualityAnalysisSWT;

    const history = useHistory();

    const { id } = useParams();

    const refContainer = useRef(null);

    const [topic, setTopic] = useState(null);
    const [answers, setAnswers] = useState({});
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    const [modalExitPage, setModalExitPage] = useState({ visible: false, path: null });
    const [modalInfo, setModalInfo] = useState({ visible: false, info: '' });
    const [loadingUpdating] = useState(false);

    useEffect(() => {
        refContainer.current.scrollTo(0, 0);

        const stepFormatted = parseInt(step);

        const topicData = getTopic(stepFormatted);

        if (topicData) {
            const { id, questions } = topicData;

            const answersData = getAnswers(id);

            const formattedAnswers = {};

            questions.forEach(item => {
                const oldAnswer = (Object(answersData).hasOwnProperty(item.id)) ? answersData[item.id] : {};

                formattedAnswers[item.id] = {
                    radioButton: null,
                    reason: '',
                    ...oldAnswer
                };
            });

            setTopic(topicData);
            setAnswers(formattedAnswers);
        } else {
            history.goBack();
        }
    }, [getAnswers, getTopic, history, step]);

    const allQuestionsNotApplicable = () => {
        let notApplicable = true;

        for (const key in answers) {
            if (answers[key].radioButton !== 3) {
                notApplicable = false;
            }
        }

        return notApplicable;
    }

    const handleNotApplicableAllQuestions = () => {
        const newAnswers = answers;

        const notApplicable = allQuestionsNotApplicable();

        for (const key in newAnswers) {
            newAnswers[key] = {
                radioButton: (notApplicable) ? null : 3,
                reason: '',
            };
        }

        setAnswers({ ...newAnswers });
    }

    const existUnansweredQuestions = () => {
        let existUnansweredQuestion = false;

        for (const key in answers) {
            const { radioButton, reason } = answers[key];

            if (
                _.isNull(radioButton)
                || (radioButton === 1 && _.isEmpty(reason))
                || (radioButton === 0 && _.isEmpty(reason))
            ) {
                existUnansweredQuestion = true;
            }
        }

        return existUnansweredQuestion;
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Análise da Qualidade Walk & Talk'}
                    onClose={() => setModalExitPage({ visible: true, path: `/safety-walk-talk/`})}
                />
                <Content ref={refContainer}>
                    {topic &&
                        <Fragment>
                            <PageInfo>
                                <Steps>Passo {topic.steps}</Steps>
                                <TopicTitle>{topic.title}</TopicTitle>
                            </PageInfo>
                            <Questions>
                                {topic?.questions && topic.questions.map((question, index) => {
                                    const { id, title, knowMore } = question;

                                    return (
                                        <QuestionDynamicForm
                                            key={index.toString()}
                                            title={title}
                                            answer={answers[id] ?? {}}
                                            notSlider={true}
                                            onChange={(newValues) => setAnswers((state) => ({ ...state, [id]: { ...state[id], ...newValues } }))}
                                            openInfo={() => setModalInfo({ visible: true, info: knowMore })}
                                            hasKnowMore={!!knowMore}
                                        />
                                    );
                                })}
                            </Questions>
                        </Fragment>
                    }
                </Content>
                <NotApplicableAllQuestions  onClick={() => allQuestionsNotApplicable() === true ? handleNotApplicableAllQuestions() :  setAlertModalVisible(true)}>
                    <Checkbox active={allQuestionsNotApplicable()}>
                        <FaCheck />
                    </Checkbox>
                Nenhuma pergunta se aplica
            </NotApplicableAllQuestions>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        step === 1 ? setModalExitPage({ visible: true, path: `/safety-walk-talk/quality-analysis/${id}`}) : history.goBack();
                    }}
                    nextDisabled={existUnansweredQuestions()}
                    onNext={() => {
                        const result = saveAnswers(parseInt(step), topic.id, answers, id);

                        history.push(result);
                    }}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                nameModal={"alert-modal"}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => {
                    handleNotApplicableAllQuestions();
                    setAlertModalVisible(false);
                }}
                icon={<FaFastForward size={40} color={colors.blueAux} />}
                title={"Seção não se aplica"}
                description={"Clique em prosseguir para responder todas as perguntas desta seção como ”Não se aplica”"}
                confirmButtonLabel={"Prosseguir"}
                cancelButtonLabel={"Cancelar"}
            />
            <ModalComplex
                title={"Atenção"}
                description={"Ao sair, você perdera todos os dados preenchidos. Este ato não pode ser revertido. Tem certeza que deseja sair?"}
                nameModal={"exit-page"}
                visible={modalExitPage.visible}
                icon={<FaExclamationTriangle size={40} color={"#FF5C69"} />}
                confirmButtonLabel={"Sair"}
                confirmButtonLoading={loadingUpdating}
                cancelButtonLabel={"Cancelar"}

                onCancel={() => setModalExitPage({ visible: false, path: null })}
                onConfirm={() => history.push(modalExitPage.path)}
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

export default inject('QualityAnalysisSWT')(observer(QualityAnalysisDynamicForm));

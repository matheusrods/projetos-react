import React, { Fragment, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import colors from "../../../../styles/colors";
import {
    Accordion,
    ActionCard,
    CompanyHeader,
    NextButton,
    ObservedItemCard,
    QualityAnalysisCard,
} from "../../../../components/atoms";
import { ModalActions, ModalComplex } from "../../../../components/molecules";
import { useHistory, useParams } from "react-router";
import {
    WalkTalkHeader,
    WalkTalkTitle,
    WalkTalkLabel,
    Container,
    Section,
    PageInfo,
    PageTitle,
    PageDescription,
    Content,
} from "./styles";
import { Header } from "../../../../components/organisms";
import { getDetailsById, createQualityAnalysis } from "../../../../services/endpoints/swt/safety-walk-talk";
import { inject, observer } from "mobx-react";
import { LoadingContainer } from "../../../../components/molecules";

function QualityAnalysisConfirm({ QualityAnalysisSWT, UserStore }) {
    const { getQualityAnalysisItems, formId, answers } = QualityAnalysisSWT;
    const { userId } = UserStore;
    const { id } = useParams();
    const history = useHistory();
    const [safetyWalkTalk, setSafetyWalkTalk] = useState({});
    const [activeItem, setActiveItem] = useState({ topic: null, question: null });
    const [qualityAnalysisItems] = useState(getQualityAnalysisItems());
    const [modalActionVisible, setModalActionVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleSubmit = async () =>{
        setLoadingSubmit(true);
        const response = await createQualityAnalysis(userId, safetyWalkTalk.id, formId, answers);

        if (response) {
            history.push('index', response);
        }

        setLoadingSubmit(false);
    }

    useEffect(() => {
        async function fetchSafetyWalkTalk() {
            const response = await getDetailsById(id);

            if (response) {
                setSafetyWalkTalk(response);
            } else {
                history.goBack();
            }

            setLoading(false);
        }

        fetchSafetyWalkTalk();
    }, [history, id]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={"Análise da Qualidade Walk & Talk"}
                    onClose={() => alert("Fechar")}
                />
                {
                    loading ? (<LoadingContainer />) : (
                        <Content>
                            <Section>
                                <PageInfo>
                                    <PageTitle>Confira sua análise</PageTitle>
                                    <PageDescription>
                                        Revise os dados e se certifique que está tudo
                                        certo antes de registrar a análise
                            </PageDescription>
                                </PageInfo>
                                <WalkTalkHeader>
                                    <WalkTalkTitle>Análise de qualidade</WalkTalkTitle>
                                </WalkTalkHeader>
                                {qualityAnalysisItems.map((topic, index) => (
                                    <Accordion key={index.toString()} label={`${index + 1}. ${topic.title}`}>
                                        {topic.questions.map((question) => {
                                            const { id, title, answer: { radioButton, reason } } = question;

                                            return (
                                                <QualityAnalysisCard
                                                    key={id}
                                                    title={title}
                                                    controlled={radioButton}
                                                    description={reason ?? null}
                                                    showOptions={true}
                                                    onClickOptions={() => {
                                                        setActiveItem({ topic: topic.id, question: id });
                                                        setModalActionVisible(true);
                                                    }}
                                                />
                                            );
                                        })}
                                    </Accordion>
                                ))}
                            </Section>
                            <Section>
                                <WalkTalkHeader>
                                    <WalkTalkTitle>Walk & Talk #{safetyWalkTalk?.id}</WalkTalkTitle>
                                </WalkTalkHeader>
                                <WalkTalkLabel direction={"column"}>
                                    <span>Observador</span>
                                    <span>{safetyWalkTalk?.observerName}</span>
                                </WalkTalkLabel>
                                <WalkTalkLabel direction={"column"}>
                                    <span>Local da Observação</span>
                                    <span>{safetyWalkTalk?.summary?.location}</span>
                                </WalkTalkLabel>
                                <WalkTalkLabel direction={"column"}>
                                    <span>Data e hora</span>
                                    <span>{safetyWalkTalk?.summary?.dateTimeObservation}</span>
                                </WalkTalkLabel>
                                <WalkTalkLabel direction={"column"}>
                                    <span>Descrição</span>
                                    <span>{safetyWalkTalk?.summary?.description}</span>
                                </WalkTalkLabel>
                            </Section>
                            <Section>
                                <WalkTalkHeader>
                                    <WalkTalkTitle>Itens observados</WalkTalkTitle>
                                </WalkTalkHeader>
                                {safetyWalkTalk?.observedItems.length > 0 &&
                                    safetyWalkTalk.observedItems.map((topic, index) => {
                                        const { title, questions } = topic;

                                        return (
                                            <Accordion key={index.toString()} label={title}>
                                                {questions.map((question, index) => {
                                                    const {
                                                        title,
                                                        radioButton,
                                                        reason,
                                                        criticality,
                                                        criticalityColor
                                                    } = question;

                                                    return (
                                                        <ObservedItemCard
                                                            key={index.toString()}
                                                            title={title}
                                                            controlled={radioButton}
                                                            criticism={criticality}
                                                            criticismColor={criticalityColor}
                                                            description={reason}
                                                        />
                                                    );
                                                })}
                                            </Accordion>
                                        );
                                    })
                                }
                            </Section>
                            {safetyWalkTalk?.observedItems?.length > 0 &&
                                <Section>
                                    <WalkTalkHeader>
                                        <WalkTalkTitle>Ações de melhoria</WalkTalkTitle>
                                    </WalkTalkHeader>
                                    {safetyWalkTalk?.observedItems.length > 0 &&
                                        safetyWalkTalk.observedItems.map((topic, index) => {
                                            const { title, questions } = topic;

                                            let hasActions = false;

                                            questions.forEach(question => {
                                                if (question.improvementActions.length > 0) {
                                                    hasActions = true;
                                                };
                                            });

                                            if (hasActions === true) {
                                                return (
                                                    <Accordion key={index.toString()} label={title}>
                                                        {questions.map((question) => {
                                                            const {
                                                                improvementActions = [],
                                                                title
                                                            } = question;

                                                            return improvementActions.map(action => (
                                                                <ActionCard
                                                                    key={action.id}
                                                                    action={{
                                                                        ...action,
                                                                        observedItem: title
                                                                    }}
                                                                    showOptions={true}
                                                                    onClickOptions={() => alert('sem funcionalidade')}
                                                                    backgroundColor={colors.gray1}
                                                                    DetailsButtonLabel={"Abrir no plano de ação"}
                                                                />
                                                            ));
                                                        })}
                                                    </Accordion>
                                                );
                                            } else {
                                                return <></>;
                                            }
                                        })}
                                </Section>
                            }
                        </Content>
                    )
                }
                <NextButton
                    positionRelative={true}
                    nextDisabled={loading || loadingSubmit}
                    loading={loadingSubmit}
                    onBack={() => history.goBack()}
                    onNext={() => handleSubmit()}
                    nextLabel={"Concluir Análise"}
                />
            </Container>
            <ModalActions
                title={"Análise de qualidade"}
                nameModal={"modal-action"}
                visible={modalActionVisible}
                onClose={() => {
                    setActiveItem({ topic: null, question: null });
                    setModalActionVisible(false);
                }}
                options={[
                    {
                        label: "Editar item",
                        onPress: () => history.push(`dynamic-form/${activeItem.topic}/question/${activeItem.question}`),
                    },
                    // {
                    //     label: "Excluir item",
                    //     color: colors.redAux,
                    //     icon: "FaTrashAlt",
                    //     onPress: () => setAlertModalVisible(true),
                    // },
                ]}
            />
            <ModalComplex
                nameModal={"alert-modal"}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => setAlertModalVisible(false)}
                icon={<FaTrashAlt size={40} color={colors.redAux} />}
                title={"Atenção"}
                description={
                    "Ao prosseguir, o item selecionado será excluído. Deseja excluir?"
                }
                confirmButtonLabel={"Sim, excluir"}
                cancelButtonLabel={"Não, cancelar"}
            />
        </Fragment>
    );
}

export default inject('QualityAnalysisSWT','UserStore')(observer(QualityAnalysisConfirm));

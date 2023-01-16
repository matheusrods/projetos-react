import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
    FaArrowRight,
} from "react-icons/fa";
import colors from "../../../styles/colors";
import {
    Accordion,
    ActionCard,
    CompanyHeader,
    ObservedItemCard,
    SingleNextButton,
} from "../../../components/atoms";
import { Header } from "../../../components/organisms";
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
import { inject, observer } from "mobx-react";
import { getDetailsById } from "../../../services/endpoints/swt/safety-walk-talk";
import { LoadingContainer } from "../../../components/molecules";
import _ from "lodash";

function QualityAnalysis({ QualityAnalysisSWT }) {
    const { getForm, reset } = QualityAnalysisSWT;

    const { id } = useParams();

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [nextLoading, setNextLoading] = useState(false);
    const [safetyWalkTalk, setSafetyWalkTalk] = useState({});

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
                    onClose={() => history.push("/safety-walk-talk")}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <Section>
                            <PageInfo>
                                <PageTitle>Análise de qualidade</PageTitle>
                                <PageDescription>
                                    Considere os dados da observação abaixo e para
                                    fazer sua análise
                            </PageDescription>
                            </PageInfo>
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
                            {/* <ShowMoreSection>
                                <ShowMore>Ver mais</ShowMore>
                                <FaChevronDown size={16} />
                            </ShowMoreSection> */}
                        </Section>
                        <Section>
                            <WalkTalkHeader>
                                <WalkTalkTitle>Itens observados</WalkTalkTitle>
                            </WalkTalkHeader>
                            {safetyWalkTalk?.observedItems.length > 0 &&
                                safetyWalkTalk.observedItems.map((topic, index) => {
                                    const { title, questions } = topic;

                                    return (
                                        <Accordion
                                            key={index.toString()}
                                            label={title}
                                        >
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
                                                <Accordion
                                                    key={index.toString()}
                                                    label={title}
                                                >
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
                                                                DetailsButtonLabel={'Abrir no plano de ação'}
                                                            />
                                                        ))
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
                )}
                <SingleNextButton
                    positionRelative={true}
                    loading={nextLoading}
                    disabled={nextLoading || loading || _.isNull(safetyWalkTalk.summary.clientLocation)}
                    onNext={async () => {
                        setNextLoading(true);

                        reset();

                        const response = await getForm(safetyWalkTalk.summary.clientLocation);

                        if (response) {
                            history.push(`${id}/dynamic-form/1`);
                        }

                        setNextLoading(false);
                    }}
                    nextLabel={"Análise de qualidade"}
                    icon={<FaArrowRight size={16} />}
                />
            </Container>
        </Fragment>
    );
}

export default inject('QualityAnalysisSWT')(observer(QualityAnalysis));

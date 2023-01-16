import React, { Fragment, useCallback, useState, useEffect } from 'react';
import colors from '../../../styles/colors';
import { FaTimes } from 'react-icons/fa';
import { Tabs, TabPanel } from 'react-tabs';
import { Header as HeaderMain } from '../../../components/organisms';
import { useHistory, useParams, Redirect } from 'react-router';
import { LoadingContainer, LoadingIcon } from '../styles';
import { getDetailsById } from '../../../services/endpoints/swt/safety-walk-talk';
import {
    Accordion,
    ActionCard,
    ObservedItemCard
} from '../../../components/atoms';
import {
    WalkTalkHeader,
    WalkTalkTitle,
    WalkTalkLabel,
    Container,
    Header,
    HeaderContainer,
    Section,
    StyledTab,
    StyledTabList,
    Title,
    Text,
} from './styles';
import { isEmpty } from '../../../utils/helpers';

function DetailTab({ details }) {

    return (
        <Fragment>
            <Section>
                <WalkTalkHeader>
                    <WalkTalkTitle>
                        Walk & Talk #{details?.id ?? 'Não informado'}
                    </WalkTalkTitle>
                </WalkTalkHeader>
                <WalkTalkLabel direction={'column'}>
                    <span>Observador</span>
                    <span>{details?.observerName ?? 'Não informado'}</span>
                </WalkTalkLabel>
                <WalkTalkLabel direction={'column'}>
                    <span>Local da Observação</span>
                    <span>{details?.summary?.location ?? 'Não informado'}</span>
                </WalkTalkLabel>
                <WalkTalkLabel direction={'column'}>
                    <span>Data e hora</span>
                    <span>
                        {`${details?.summary?.dateObservation
                            .split('-')
                            .reverse()
                            .join('/') ?? 'Não informado'
                            } ${details?.summary?.timeObservation}` ??
                            'Não informado'}
                    </span>
                </WalkTalkLabel>
                <WalkTalkLabel direction={'column'}>
                    <span>Descrição</span>
                    <span>
                        {details?.summary?.description ?? 'Não informado'}
                    </span>
                </WalkTalkLabel>
                {
                    details?.summary?.participants?.length ?
                        <WalkTalkLabel direction={'column'}>
                            <span>Participantes</span>
                            <span>
                                {details?.summary?.participants ? details.summary.participants.join(', ') : 'Não informado'}
                            </span>
                        </WalkTalkLabel> : <></>
                }
            </Section>
            <Section>
                <WalkTalkHeader>
                    <WalkTalkTitle>Itens observados</WalkTalkTitle>
                </WalkTalkHeader>
                {details?.observedItems.map((topic, topicIndex) => (
                    <Accordion
                        key={topicIndex}
                        label={topic?.title ?? 'Não informado'}
                    >
                        {topic?.questions?.map((question, questionIndex) => (
                            <ObservedItemCard
                                key={questionIndex}
                                title={question?.title ?? 'Não informado'}
                                controlled={question?.radioButton}
                                criticism={question?.criticality}
                                criticismColor={question?.criticalityColor}
                                description={question?.reason}
                            />
                        ))}
                    </Accordion>
                ))}
            </Section>
        </Fragment>
    );
}

function LocalDetailTab({ details, topics }) {
    return (
        <Fragment>
            <Section>
                <WalkTalkHeader>
                    <WalkTalkTitle>
                        Walk & Talk #
                        {details?.uuid?.split('-')[0] ?? 'Não informado'}
                    </WalkTalkTitle>
                </WalkTalkHeader>
                <WalkTalkLabel direction={'column'}>
                    <span>Observador</span>
                    <span>{details?.observer?.name ?? 'Não informado'}</span>
                </WalkTalkLabel>
                <WalkTalkLabel direction={'column'}>
                    <span>Local da Observação</span>
                    <span>
                        {details?.registrationLocation?.location?.fullAddress ??
                            'Não informado'}
                    </span>
                </WalkTalkLabel>
                <WalkTalkLabel direction={'column'}>
                    <span>Data e hora</span>
                    <span>
                        {`${details?.summary?.dateObservation
                            ?.split('-')
                            ?.reverse()
                            ?.join('/') ?? 'Não informado'
                            } ${details?.summary?.timeObservation ?? ''}` ??
                            'Não informado'}
                    </span>
                </WalkTalkLabel>
                <WalkTalkLabel direction={'column'}>
                    <span>Descrição</span>
                    <span>
                        {details?.summary?.description ?? 'Não informado'}
                    </span>
                </WalkTalkLabel>
            </Section>
            <Section>
                <WalkTalkHeader>
                    <WalkTalkTitle>Itens observados</WalkTalkTitle>
                </WalkTalkHeader>
                {topics?.map((topic, topicIndex) => (
                    <Accordion
                        key={topicIndex}
                        label={topic?.title ?? 'Não informado'}
                    >
                        {topic.questions.map((question, questionIndex) => (
                            <ObservedItemCard
                                key={questionIndex}
                                title={question?.title ?? 'Não informado'}
                                controlled={question?.controlled}
                                criticism={
                                    question?.shouldRenderCriticism
                                        ? question?.criticism
                                        : null
                                }
                                criticismColor={question?.color ?? '#FF7843;'}
                                description={
                                    question?.answer?.reason.length > 1 &&
                                        question?.answer?.radioButton !== 3
                                        ? question.answer.reason
                                        : null
                                }
                            />
                        ))}
                    </Accordion>
                ))}
            </Section>
        </Fragment>
    );
}

function Details() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [localFound, setLocalFound] = useState(false);
    const [actions, setActions] = useState(null);
    const [details, setDetails] = useState(null);
    const [topics, setTopics] = useState([]);
    const { id: safetyId } = useParams();

    const labelAnswerByRadioValue = (valueRadio) => {
        switch (valueRadio) {
            case 0:
                return 'Não';

            case 1:
                return 'Sim';

            case 3:
                return 'Não se aplica';

            default:
                return 'Não se aplica';
        }
    };

    const detailsTopicFactory = useCallback((response) => {
        const { answers, form } = response;

        if (isEmpty(answers) || isEmpty(form)) {
            return [];
        }
        const transformed = form.topics.map((topic) => {
            const questionWithAnswer = topic?.questions?.map((question) => {
                if (!answers[topic?.id]) {
                    return {};
                }

                const answer = answers[topic?.id][question?.id];
                const controlled = labelAnswerByRadioValue(answer?.radioButton);
                const shouldRenderCriticism = answer?.radioButton === 0;
                const criticism = question.criticalityLevels.find(
                    (critLevel) =>
                        answer?.criticality >= critLevel?.startValue &&
                        answer?.criticality <= critLevel?.endValue
                );
                return {
                    ...question,
                    answer,
                    criticism: criticism?.description,
                    color: `#${criticism?.color}`,
                    controlled,
                    shouldRenderCriticism
                };
            });

            return { ...topic, questions: questionWithAnswer };
        });

        return transformed;
    }, []);

    const fetchSafetyDetails = useCallback(async () => {
        setLoading(true);

        if (!safetyId) {
            setLoading(false);
            return <Redirect to="/safety-walk-talk/" />;
        }

        const localJsonDetail = localStorage.getItem(
            'safetyWalkTalk@newRegisterStore'
        );

        if (localJsonDetail) {
            const localDetail = JSON.parse(localJsonDetail);
            const foundDetail = localDetail.registers.find(
                (item) => item.uuid === safetyId
            );

            if (foundDetail) {
                setActions(foundDetail?.linkActionToObservation);
                setDetails(foundDetail);
                setTopics(detailsTopicFactory(foundDetail));
                setLocalFound(true);
                setLoading(false);
                return;
            }
        }

        if (!localFound) {
            const detailsResponse = await getDetailsById(safetyId);

            setDetails(detailsResponse);
        }

        setLoading(false);
    }, [safetyId, localFound, detailsTopicFactory]);

    useEffect(() => fetchSafetyDetails(), [fetchSafetyDetails]);

    if (loading) {
        return (
            <Fragment>
                <HeaderMain hiddenMobile={true} />
                <Container>
                    <HeaderContainer>
                        <Header>
                            <Title>Detalhes do Walk & Talk</Title>
                            <FaTimes
                                color={colors.client}
                                style={{ cursor: 'pointer' }}
                                onClick={() => history.goBack()}
                            />
                        </Header>
                    </HeaderContainer>
                    <LoadingContainer>
                        <LoadingIcon size={48} color={colors.client} />
                        <span>Carregando...</span>
                    </LoadingContainer>
                </Container>
            </Fragment>
        );
    }

    if (isEmpty(details) || isEmpty(safetyId)) {
        return <Redirect to="/safety-walk-talk/" />;
    }

    console.log(details);

    return (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            <Container>
                <Tabs>
                    <HeaderContainer>
                        <Header>
                            <Title>Detalhes do Walk & Talk</Title>
                            <FaTimes
                                color={colors.client}
                                style={{ cursor: 'pointer' }}
                                onClick={() => history.goBack()}
                            />
                        </Header>
                        <StyledTabList>
                            <StyledTab>Detalhes</StyledTab>
                            <StyledTab>Ações de melhoria</StyledTab>
                        </StyledTabList>
                    </HeaderContainer>
                    <TabPanel>
                        <Fragment>
                            {details && !localFound ? (
                                <DetailTab details={details} />
                            ) : null}
                            {details && localFound ? (
                                <LocalDetailTab
                                    topics={topics}
                                    details={details}
                                />
                            ) : null}
                        </Fragment>
                    </TabPanel>
                    <TabPanel>
                        <Section>
                            {localFound
                                ? actions?.length > 0 ? actions?.map((link, index) => (
                                    <Accordion
                                        key={index}
                                        label={
                                            link?.question?.name ??
                                            'Não informado'
                                        }
                                    >
                                        <ActionCard
                                            linkObservedItem={link.local}
                                            action={link?.action ?? link}
                                            showOptions={false}
                                            backgroundColor={colors.gray1}
                                            onClickDetails={false}
                                        />
                                    </Accordion>
                                )) : <Text>Não existe nenhuma ação de melhoria vinculada com essa observação</Text>
                                : details.observedItems.filter((obs) => {
                                    if (obs?.questions?.length > 0) {
                                        const hasImprovementAction = obs.questions.find(question =>
                                            question?.improvementActions?.length > 0);

                                        if (hasImprovementAction) {
                                            return true;
                                        }

                                        return false;
                                    }

                                    return false;
                                }).length > 0 ? details?.observedItems.map((obs) =>
                                    obs?.questions?.map(
                                        (question, questionIndex) =>
                                            question?.improvementActions
                                                .length ? (
                                                <Accordion
                                                    key={questionIndex}
                                                    label={
                                                        question?.title ??
                                                        'Não informado'
                                                    }
                                                >
                                                    {question?.improvementActions?.map(
                                                        (
                                                            action,
                                                            actionIndex
                                                        ) => (
                                                            <ActionCard
                                                                key={actionIndex}
                                                                action={action}
                                                                showOptions={false}
                                                                onClickOptions={() => { }}
                                                                backgroundColor={
                                                                    colors.gray1
                                                                }
                                                                onClickDetails={() =>
                                                                    history.push(
                                                                        `/action/details/${action.id}`
                                                                    )
                                                                }
                                                                DetailsButtonLabel={
                                                                    'Abrir no plano de ação'
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Accordion>
                                            ) : null
                                    )
                                ) : <Text>Não existe nenhuma ação de melhoria vinculada com essa observação</Text>}
                        </Section>
                    </TabPanel>
                </Tabs>
            </Container>
        </Fragment>
    );
}

export default Details;

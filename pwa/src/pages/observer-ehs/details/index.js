import React, { Fragment, useEffect, useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Tabs, TabPanel } from 'react-tabs';
import { ActionCard } from '../../../components/atoms';
import { Header as HeaderMain } from '../../../components/organisms';
import { Redirect, useHistory, useParams } from 'react-router';
import { getObserverDetails } from '../../../services/endpoints/observer/details';
import { LoadingContainer, LoadingIcon } from '../styles';
import {
    Container,
    Header,
    HeaderContainer,
    Section,
    StyledTab,
    StyledTabList,
    Title,
    Wrapper,
    SectionTitle,
    SectionText,
    SectionSubTitle,
    SectionSub,
    WrapperTitle,
    Photo,
    ListPhotos,
    CriticismDot
} from './styles';

import colors from '../../../styles/colors';

function DetailTab({ details, history }) {
    return (
        <Fragment>
            <WrapperTitle>Observação #{details.id}</WrapperTitle>
            <Section>
                <SectionTitle>Tipo de Observação</SectionTitle>
                <SectionText>{details.observationType}</SectionText>
            </Section>
            {details?.criticism?.id &&
                <Section>
                    <SectionTitle>Nível de criticidade</SectionTitle>
                    <SectionText>
                        <CriticismDot color={details?.criticism?.color ?? 'red'} />
                        {details?.criticism?.description}
                    </SectionText>
                </Section>
            }
            <Section>
                <SectionTitle>Observador</SectionTitle>
                <SectionText>{details.observer.name}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Local da Observação</SectionTitle>
                <SectionText>{details.observationLocation}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Data e hora</SectionTitle>
                <SectionText>{`${details?.date} ${details?.hour}`}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Descrição</SectionTitle>
                <SectionText>{details?.description}</SectionText>
            </Section>
            <Section>
                <SectionTitle>O que eu observei?</SectionTitle>
                <SectionText>{details?.whatWasObserved}</SectionText>
            </Section>
            <Section>
                <SectionTitle>O que eu fiz a respeito?</SectionTitle>
                <SectionText>{details?.whatWasDone}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Ação complementar sugerida:</SectionTitle>
                <SectionText>{details?.whatWasSuggested}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Fotos da observação</SectionTitle>
                {details?.attachments?.length > 0 ? (
                    <ListPhotos>
                        {details?.attachments?.map((item, index) => (
                            <Photo
                                key={index}
                                onClick={() => {
                                    history.push(`/observer-ehs/${item.code}/view-photo`, {
                                        photo: {
                                            url: item.file,
                                        },
                                    });
                                }}
                            >
                                <img
                                    src={item.file}
                                    alt={`Imagem da observação ${index + 1}`}
                                />
                            </Photo>
                        ))}
                    </ListPhotos>
                ) : <SectionText>Nenhuma foto foi inserida</SectionText>}
            </Section>
            <Section>
                <SectionTitle>Riscos e impactos</SectionTitle>
                {details?.risksAndImpacts?.length > 0 ? (
                    details?.risksAndImpacts?.map((item, index) => (
                        <SectionSub key={index}>
                            <SectionSubTitle>
                                {item?.riskImpactDescription ?? 'Não informado'}
                            </SectionSubTitle>
                            <SectionText>
                                {item?.dangerAspectsDescription ??
                                    'Não informado'}
                            </SectionText>
                        </SectionSub>
                    ))
                ) : (
                    <SectionText>Não informado</SectionText>
                )}
            </Section>
        </Fragment>
    );
}

function LocalDetailTab({ details, history }) {
    return (
        <Fragment>
            <WrapperTitle>
                Observação #{details.uuid.split('-')[0]}
            </WrapperTitle>
            <Section>
                <SectionTitle>Tipo de Observação</SectionTitle>
                <SectionText>
                    {details.type.label ?? 'Não informado'}
                </SectionText>
            </Section>
            <Section>
                <SectionTitle>Observador</SectionTitle>
                <SectionText>{details.observer.name}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Local da Observação</SectionTitle>
                <SectionText>
                    {details?.registrationLocation?.location?.fullAddress ?? 'Não informado'}
                </SectionText>
            </Section>
            <Section>
                <SectionTitle>Data e hora</SectionTitle>
                <SectionText>{`${details?.date} ${details?.dateTime.time}`}</SectionText>
            </Section>
            <Section>
                <SectionTitle>Descrição</SectionTitle>
                <SectionText>
                    {details?.description.description ?? 'Não informado'}
                </SectionText>
            </Section>
            <Section>
                <SectionTitle>O que eu observei?</SectionTitle>
                <SectionText>
                    {details?.description?.whatIObserved ?? 'Não informado'}
                </SectionText>
            </Section>
            <Section>
                <SectionTitle>O que eu fiz a respeito?</SectionTitle>
                <SectionText>
                    {details?.description?.whatIDid ?? 'Não informado'}
                </SectionText>
            </Section>
            <Section>
                <SectionTitle>Ação complementar sugerida:</SectionTitle>
                <SectionText>
                    {details?.description?.complementaryAction ?? 'Não informado'}
                </SectionText>
            </Section>
            <Section>
                <SectionTitle>Fotos da observação</SectionTitle>
                {details?.pictures?.length > 0 ? (
                    <ListPhotos>
                        {details?.pictures?.map((item, index) => (
                            <Photo
                                key={index}
                                onClick={() => {
                                    history.push(`/observer-ehs/${index + 1}/view-photo`, {
                                        photo: {
                                            url: item,
                                        },
                                    });
                                }}
                            >
                                <img src={item} alt={`Imagem da observação ${index + 1}`} />
                            </Photo>
                        ))}
                    </ListPhotos>
                ) : <SectionText>Nenhuma foto foi inserida</SectionText>}
            </Section>
            <Section>
                <SectionTitle>Riscos e impactos</SectionTitle>
                {details?.riskAgents?.length > 0 ? details?.riskAgents?.map((item, index) => (
                    <SectionSub key={index}>
                        <SectionSubTitle>
                            {item.dangerAspectType.name}
                        </SectionSubTitle>
                        <SectionText>{item.riskImpact.name}</SectionText>
                    </SectionSub>
                )) : <SectionText>Não informado</SectionText>}
            </Section>
        </Fragment>
    );
}

function Details() {
    const history = useHistory();

    const { id: observerId } = useParams();

    const [loading, setLoading] = useState(true);
    const [localFound, setLocalFound] = useState(false);
    const [details, setDetails] = useState(null);

    const fetchObserverDetails = useCallback(async () => {
        setLoading(true);

        if (!observerId) {
            setLoading(false);

            return <Redirect to="/observer-ehs/" />;
        }

        const localJsonDetail = localStorage.getItem(
            'observerEHS@newRegisterStore'
        );

        if (localJsonDetail) {
            const localDetail = JSON.parse(localJsonDetail);
            const foundDetail = localDetail.registers.find(
                (item) => item.uuid === observerId
            );

            if (foundDetail) {
                setDetails(foundDetail);
                setLocalFound(true);
                setLoading(false);
                return;
            }
        }

        if (!localFound) {
            const [detailsResponse] = await getObserverDetails(observerId);

            setDetails(detailsResponse);
        }

        setLoading(false);
    }, [observerId, localFound]);

    useEffect(() => fetchObserverDetails(), [fetchObserverDetails]);

    return (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            {loading ? (
                <LoadingContainer>
                    <LoadingIcon size={48} color={colors.client} />
                    <span>Carregando...</span>
                </LoadingContainer>
            ) : (
                <Container>
                    <Tabs>
                        <HeaderContainer>
                            <Header>
                                <Title>Detalhes da observação</Title>
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
                            <Wrapper>
                                {details && !localFound ? (
                                    <DetailTab details={details} history={history} />
                                ) : null}
                                {details && localFound ? (
                                    <LocalDetailTab details={details} history={history} />
                                ) : null}
                            </Wrapper>
                        </TabPanel>
                        <TabPanel>
                            <Wrapper>
                                {details?.improvementActions && details?.improvementActions?.length > 0 ?
                                    details.improvementActions.map((action) => (
                                        <ActionCard
                                            key={action.id}
                                            action={action}
                                            showOptions={false}
                                            backgroundColor={colors.gray1}
                                            DetailsButtonLabel={'Abrir no plano de ação'}
                                            onClickDetails={() => history.push(`/action/details/${action.id}`)}
                                        />
                                    )) : <SectionText>Não existe nenhuma ação de melhoria vinculada com essa observação</SectionText>}
                            </Wrapper>
                        </TabPanel>
                    </Tabs>
                </Container>
            )}
        </Fragment>
    );
}

export default Details;

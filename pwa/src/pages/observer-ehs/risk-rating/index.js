import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { CompanyHeader } from '../../../components/atoms';
import { LoadingContainer, ModalActions } from '../../../components/molecules';
import { Header } from '../../../components/organisms';
import { ConfirmCancelFooter } from '../../../components/organisms';
import { getObserverDetails } from '../../../services/endpoints/observer/details';
import colors from '../../../styles/colors';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    Wrapper,
    PageDescription,
    Section,
    SectionTitle,
    SectionText,
    SectionSubTitle,
    SectionSub,
    WrapperTitle,
    Photo,
    ListPhotos,
    Column
} from './styles';

const RiskRating = ({ ClassificationStore: { setNewRegisterData, reset } }) => {
    const history = useHistory();

    const { idObservation } = useParams();

    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [observation, setObservation] = useState({});

    const fetchObserverDetails = useCallback(async () => {
        setLoading(true);

        const [response] = await getObserverDetails(idObservation);

        setObservation(response);
        setLoading(false);
    }, [idObservation]);

    useEffect(() => fetchObserverDetails(), [fetchObserverDetails]);

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        typeAction={'Classificação de risco EHS'}
                        onClose={() => history.push('/observer-ehs/')}
                    />
                    <LoadingContainer />
                    <ConfirmCancelFooter
                        confirmButtonLabel={'Classificar'}
                        cancelButtonLabel={'Outras ações'}
                        cancelButtonLabelColor={colors.gray6}
                        confirmButtonDisabled={true}
                        hideCancelButton={true}
                    />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Classificação de risco EHS'}
                    onClose={() => history.push('/observer-ehs/')}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Classificação e ações de melhoria</PageTitle>
                    </PageInfo>
                    <PageDescription>
                        Classifique o nível de criticidade e sugira ações de
                        melhora referentes a observação abaixo
                    </PageDescription>
                    <Wrapper>
                        <WrapperTitle>
                            Observação #{observation?.id ?? 'Não informado'}
                        </WrapperTitle>
                        <Section>
                            <SectionTitle>Tipo de Observação</SectionTitle>
                            <SectionText>
                                {observation?.observationType ??
                                    'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Observador</SectionTitle>
                            <SectionText>
                                {observation?.observer?.name ?? 'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Local da Observação</SectionTitle>
                            <SectionText>
                                {observation?.observationLocation ??
                                    'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Data e hora</SectionTitle>
                            <SectionText>
                                {observation?.date ?? 'Não informado'}{' '}
                                {observation?.hour ?? ''}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Descrição</SectionTitle>
                            <SectionText>
                                {observation?.description ?? 'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>O que eu observei?</SectionTitle>
                            <SectionText>
                                {observation?.whatWasObserved ??
                                    'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>
                                O que eu fiz a respeito?
                            </SectionTitle>
                            <SectionText>
                                {observation?.whatWasDone ?? 'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>
                                Ação complementar sugerida:
                            </SectionTitle>
                            <SectionText>
                                {observation?.whatWasSuggested ??
                                    'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Fotos da observação</SectionTitle>
                            {observation?.attachments?.length > 0 ? (
                                <ListPhotos>
                                    {observation?.attachments?.map(
                                        (item, index) => (
                                            <Photo
                                                key={index}
                                                onClick={() => {
                                                    history.push(
                                                        `/observer-ehs/${item.code}/view-photo`,
                                                        {
                                                            photo: {
                                                                url: item.file
                                                            }
                                                        }
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={item.file}
                                                    alt="Imagem da observação"
                                                />
                                            </Photo>
                                        )
                                    )}
                                </ListPhotos>
                            ) : (
                                <SectionText>
                                    Nenhuma foto foi inserida
                                </SectionText>
                            )}
                        </Section>
                        <Section>
                            <Column>
                                {observation?.risksAndImpacts?.length ? (
                                    <SectionTitle>
                                        Riscos e impactos
                                    </SectionTitle>
                                ) : null}
                                {observation?.risksAndImpacts?.map(
                                    (item, index) => (
                                        <SectionSub key={index}>
                                            <SectionSubTitle>
                                                {item?.riskImpactDescription ??
                                                    'Não informado'}
                                            </SectionSubTitle>
                                            <SectionText>
                                                {item?.dangerAspectsDescription ??
                                                    'Não informado'}
                                            </SectionText>
                                        </SectionSub>
                                    )
                                )}
                            </Column>
                        </Section>
                    </Wrapper>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={'Classificar'}
                    cancelButtonLabel={'Outras ações'}
                    cancelButtonLabelColor={colors.gray6}
                    onCancel={() => setModalActionsVisible(true)}
                    onConfirm={() => {
                        reset();
                        setNewRegisterData({ observation });
                        history.push(history.location.pathname + '/criticism');
                    }}
                />
            </Container>
            <ModalActions
                title={'Outras ações'}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: 'Editar',
                        onPress: () =>
                            history.push(
                                history.location.pathname + '/edit',
                                observation
                            )
                    },
                    {
                        label: 'Cancelar ação',
                        onPress: () =>
                            history.push(
                                history.location.pathname + '/cancel',
                                idObservation
                            ),
                        icon: 'FaTrashAlt',
                        color: '#FF5C69'
                    }
                ]}
            />
        </Fragment>
    );
};

export default inject('ClassificationStore')(observer(RiskRating));

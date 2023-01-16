import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton, Photo } from '../../../../components/atoms';
import { ModalActions, ModalComplex } from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import moment from '../../../../config/moment';
import { createObservations } from '../../../../services/endpoints/observer/observations';
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
    SectionIcon,
    ListPhotos,
    SectionWrapper
} from './styles';

const NewRegisterCheckObservation = ({
    NewRegisterObserver: {
        uuid,
        type,
        observer,
        riskAgents,
        registrationLocation,
        dateTime,
        description,
        pictures,
        setNewRegisterData,
        reset
    },
    UserStore: { user },
    SessionStore
}) => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [editPageLink, setEditPageLink] = useState('');
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState(false);

    const renderPhotos = () => {
        return pictures.map((item, index) => (
            <Photo
                showOptions={true}
                onClickOptions={() => {
                    history.push(`/observer-ehs/${index + 1}/view-photo`, {
                        photo: {
                            url: item
                        }
                    });
                }}
                src={item}
                key={index}
            />
        ));
    };

    const handlerEditButton = (link) => {
        setEditPageLink(link);

        history.push(link, {
            isEditingFromCheckObservation: true
        });
    };

    const handleNext = async () => {
        setLoading(true);

        const response = await createObservations({
            loggedUser: user,
            description: description,
            observer: observer,
            registrationLocation: registrationLocation,
            dateTime: dateTime,
            type: type,
            attachments: pictures,
            riskAgents: riskAgents
        });

        if (response) {
            const store = SessionStore.getSession(
                'observerEHS@newRegisterStore'
            );

            const filteredRegisters = store.registers.filter(
                (register) => register?.uuid !== uuid
            );

            SessionStore.saveSession('observerEHS@newRegisterStore', {
                registers: [...filteredRegisters]
            });

            reset();
            history.push('complete');
        } else {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Observador EHS'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Confira sua observação</PageTitle>
                    </PageInfo>
                    <PageDescription>
                        Revise os dados e se certifique que está tudo certo
                        antes de registrar a observação
                    </PageDescription>
                    <Wrapper>
                        <WrapperTitle>Observação</WrapperTitle>
                        <Section>
                            <SectionTitle>Tipo de Observação</SectionTitle>
                            <SectionIcon
                                onClick={() => handlerEditButton('type')}
                            />
                            <SectionText>
                                {type?.label ?? 'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Observador</SectionTitle>
                            <SectionIcon
                                onClick={() => handlerEditButton('observer')}
                            />
                            <SectionText>
                                {observer?.name ?? 'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Local da Observação</SectionTitle>
                            <SectionIcon
                                onClick={() =>
                                    handlerEditButton('registration-location')
                                }
                            />
                            <SectionText>
                                {registrationLocation?.location?.fullAddress ??
                                    'Não informado'}
                            </SectionText>
                        </Section>
                        <Section>
                            <SectionTitle>Data e hora</SectionTitle>
                            <SectionIcon
                                onClick={() => handlerEditButton('date-time')}
                            />
                            <SectionText>{`${
                                moment(dateTime?.date).format('DD/MM/YYYY') ??
                                'Não informado'
                            } ${dateTime?.time ?? ''}`}</SectionText>
                        </Section>
                        <Section gap={true}>
                            <SectionWrapper>
                                <SectionTitle>Descrição</SectionTitle>
                                <SectionIcon
                                    onClick={() =>
                                        handlerEditButton('description')
                                    }
                                />
                                <SectionText>
                                    {description?.description ??
                                        'Não informado'}
                                </SectionText>
                            </SectionWrapper>
                            <SectionWrapper>
                                <SectionTitle>O que eu observei?</SectionTitle>
                                <SectionText>
                                    {description?.whatIObserved ??
                                        'Não informado'}
                                </SectionText>
                            </SectionWrapper>
                            <SectionWrapper>
                                <SectionTitle>
                                    O que eu fiz a respeito?
                                </SectionTitle>
                                <SectionText>
                                    {description?.whatIDid ?? 'Não informado'}
                                </SectionText>
                            </SectionWrapper>
                            {description?.complementaryAction && (
                                <SectionWrapper>
                                    <SectionTitle>
                                        Ação complementar sugerida:
                                    </SectionTitle>
                                    <SectionText>
                                        {description?.complementaryAction ??
                                            'Não informado'}
                                    </SectionText>
                                </SectionWrapper>
                            )}
                        </Section>
                        {pictures?.length > 0 && (
                            <Section>
                                <SectionTitle>Fotos da observação</SectionTitle>
                                <SectionIcon
                                    onClick={() =>
                                        handlerEditButton('pictures')
                                    }
                                />
                                <ListPhotos>{renderPhotos()}</ListPhotos>
                            </Section>
                        )}
                        {riskAgents?.length > 0 && (
                            <Section>
                                <SectionTitle>Riscos e impactos</SectionTitle>
                                <SectionIcon
                                    onClick={() =>
                                        handlerEditButton('risk-impact')
                                    }
                                />
                                {riskAgents?.map((item, index) => (
                                    <SectionSub key={index.toString()}>
                                        <SectionSubTitle>
                                            {item?.riskImpact?.name}
                                        </SectionSubTitle>
                                        <SectionText>
                                            {item?.dangerAspect?.name}
                                        </SectionText>
                                    </SectionSub>
                                ))}
                            </Section>
                        )}
                    </Wrapper>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        setNewRegisterData({
                            currentStep:
                                '/observer-ehs/new-register/risk-impact'
                        });

                        history.push('risk-impact');
                    }}
                    onNext={() => handleNext()}
                    nextLabel={'Concluir'}
                    icon={<FaCheck />}
                    loading={loading}
                    nextDisabled={loading}
                />
            </Container>
            <ModalActions
                title={'Detalhe da observação'}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () =>
                            history.push(editPageLink, {
                                isEditingFromCheckObservation: true
                            })
                    },
                    {
                        label: 'Excluir item',
                        onPress: () => alert('sem funcionalidade'),
                        icon: 'FaTrashAlt',
                        color: '#FF5C69'
                    }
                ]}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, você perdera os dados dessa tela. Tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/observer-ehs/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject(
    'NewRegisterObserver',
    'UserStore',
    'SessionStore'
)(observer(NewRegisterCheckObservation));

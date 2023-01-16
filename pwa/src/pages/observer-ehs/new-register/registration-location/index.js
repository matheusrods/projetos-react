import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useState } from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import { getClientsByUserIdAndClientId } from '../../../../services/endpoints/users';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    PageLabel,
    StyledLink,
    ChangeLocationLink
} from './styles';

const NewRegisterRegistrationLocation = ({
    NewRegisterObserver: { setNewRegisterData, registrationLocation, observer, observerLocation },
    UserStore: { user }
}) => {
    const history = useHistory();

    const { isEditingFromCheckObservation = false } =
        history.location.state ?? {};

    const {
        location = null,
        company = null,
        opco = null,
        businessUnit = null,
    } = registrationLocation;


    const [loading, setLoading] = useState(true);
    const [modalExitPage, setModalExitPage] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!user?.clientId) {
                return;
            }

            setLoading(true);

            const hasNotSelected = !company && !location;

            if (hasNotSelected) {

                const { clients } = await getClientsByUserIdAndClientId({
                    userId: observer.id,
                    clientId: observerLocation?.Cliente?.codigo
                });

                setNewRegisterData({
                    registrationLocation: {
                        company: clients?.[0],
                        location: clients?.[0]?.units?.[0]
                    }
                });
            }

            setLoading(false);
        };

        getData();
    }, [
        setNewRegisterData,
        user.clientId,
        user.id,
        company,
        location,
        observer,
        observerLocation,
    ]);

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
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <PageInfo>
                                <PageTitle>Local do registro</PageTitle>
                                <PageDescription>
                                    Caso essa observação tenha sido realizada em
                                    outra área (diferente da sua), altere a
                                    localidade
                                </PageDescription>
                            </PageInfo>
                            <PageLabel>
                                <span>EMPRESA</span>
                                <span>
                                    {company?.name ??
                                        'Nenhuma empresa selecionada.'}
                                </span>
                            </PageLabel>
                            <PageLabel>
                                <span>UNIDADE</span>
                                <span>
                                    {location?.name ??
                                        'Nenhuma unidade selecionada.'}
                                </span>
                            </PageLabel>
                            <PageLabel>
                                <span>BUSINESS UNIT</span>
                                <span>
                                    {businessUnit?.name ??
                                        'Nenhuma business unit selecionada.'}
                                </span>
                            </PageLabel>
                            <PageLabel>
                                <span>OPCO</span>
                                <span>
                                    {opco?.name ?? 'Nenhum opco selecionado.'}
                                </span>
                            </PageLabel>
                            <ChangeLocationLink>
                                <StyledLink
                                    to={'registration-location/change-location'}
                                >
                                    Alterar localidade
                                </StyledLink>
                            </ChangeLocationLink>
                        </>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        if (isEditingFromCheckObservation) {
                            history.goBack();
                        } else {
                            setNewRegisterData({
                                currentStep:
                                    '/observer-ehs/new-register/observer'
                            });

                            history.push('observer');
                        }
                    }}
                    nextDisabled={loading || !(location && company)}
                    onNext={() => {
                        if (isEditingFromCheckObservation) {
                            history.goBack();
                        } else {
                            setNewRegisterData({
                                currentStep: '/observer-ehs/new-register/type'
                            });

                            history.push('type');
                        }
                    }}
                    nextLabel={
                        isEditingFromCheckObservation ? 'Concluir' : 'Avançar'
                    }
                    icon={
                        isEditingFromCheckObservation ? <FaCheck /> : undefined
                    }
                />
            </Container>
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
    'UserStore'
)(observer(NewRegisterRegistrationLocation));

import { inject, observer } from 'mobx-react';
import { FaExclamationTriangle } from 'react-icons/fa';
import React, { Fragment, useEffect, useState } from 'react';
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
    NewRegisterSWT: { setNewRegisterData, registrationLocation, observer },
    UserStore: { user }
}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [modalExitPage, setModalExitPage] = useState(false);
    const {
        company = null,
        location = null,
        opco = null,
        businessUnit = null
    } = registrationLocation;

    if (!observer) {
        history.push('type');
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            if (!user.clientId) {
                setLoading(false);
                return;
            }

            const { clients } = await getClientsByUserIdAndClientId({
                userId: user.id,
                clientId: user.clientId
            });

            const hasNotSelected = !company && !location;

            if (hasNotSelected) {
                setNewRegisterData({
                    registrationLocation: {
                        company: clients[0],
                        location: clients[0].units[0]
                    },
                    currentStep:
                        '/safety-walk-talk/new-register/area-observations'
                });
            }

            setLoading(false);
        };

        getData();
    }, [setNewRegisterData, user.clientId, user.id, company, location]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <PageInfo>
                                <PageTitle>Local da observação</PageTitle>
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
                                    to={
                                        '/safety-walk-talk/new-register/registration-location/change-location'
                                    }
                                >
                                    Alterar localidade
                                </StyledLink>
                            </ChangeLocationLink>
                        </>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() =>
                        history.push('/safety-walk-talk/new-register/observer')
                    }
                    onNext={() =>
                        history.push('area-observations', {
                            from: history.location.pathname
                        })
                    }
                    nextDisabled={!(location && company) || loading}
                    nextLabel={'Avançar'}
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
                onConfirm={() => history.push('/safety-walk-talk/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject(
    'NewRegisterSWT',
    'UserStore'
)(observer(NewRegisterRegistrationLocation));

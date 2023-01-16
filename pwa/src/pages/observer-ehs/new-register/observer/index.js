import { inject, observer } from 'mobx-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import {
    LoadingContainer,
    MultiSelectModal
} from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import { getEmployees } from '../../../../services/endpoints/users';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ObserverCard,
    ObserverAvatar,
    ObserverInfo,
    ObserverName,
    ChangeObserver
} from './styles';
import { getUserLocation, getClientsByUserIdAndClientId } from '../../../../services/endpoints/users';

const NewRegisterObserver = ({
    NewRegisterObserver: { observer: storeObserver, setNewRegisterData },
    UserStore: { user }
}) => {
    const [modalObserversVisible, setModalObserversVisible] = useState(false);

    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const { isEditingFromCheckObservation = false } =
        history.location.state ?? {};

    const [observerOptions, setObserverOptions] = useState([]);

    const [observer, setObserver] = useState(storeObserver);

    const [obsLocation, setObsLocation] = useState(null);

    const getData = useCallback(async () => {
        setLoading(true);

        const { employees } = await getEmployees({ internal: 1 });

        setObserverOptions(employees);

        const userLocation = await getUserLocation(user.id);

        setObsLocation(userLocation);

        setLoading(false);
    }, []);

    const handleSave = async (items) => {
        setObserverOptions([...items]);


        for (const user of items) {
            if (user.selected) {

                setObserver({ ...user });

                const userLocation = await getUserLocation(user.id);

                setObsLocation(userLocation);
            }
        }
    };

    const handleNext = async () => {

        let registrationLocation = {};

        if (obsLocation?.Cliente?.codigo) {
            const { clients } = await getClientsByUserIdAndClientId({
                userId: observer.id,
                clientId: obsLocation?.Cliente?.codigo
            });

            registrationLocation = {
                company: clients?.[0],
                location: clients?.[0]?.units?.[0]
            }
        }

        if (isEditingFromCheckObservation) {
            if (registrationLocation?.company && registrationLocation?.location) {
                setNewRegisterData({
                    observer: observer,
                    observerLocation: obsLocation,
                    registrationLocation
                });
            }
            else {

                if (registrationLocation?.company && registrationLocation?.location) {
                    setNewRegisterData({
                        observer: observer,
                        observerLocation: obsLocation,
                        registrationLocation
                    });
                }
                else {
                    setNewRegisterData({
                        observer: observer,
                        observerLocation: obsLocation,
                    });
                }
            }

            history.goBack();
        } else {

            if (registrationLocation?.company && registrationLocation?.location) {
                setNewRegisterData({
                    observer: observer,
                    observerLocation: obsLocation,
                    registrationLocation,
                    currentStep: '/observer-ehs/new-register/registration-location',
                });
            }
            else {
                setNewRegisterData({
                    observerLocation: obsLocation,
                    observer: observer,
                    currentStep: '/observer-ehs/new-register/registration-location',
                });
            }

            history.push('registration-location');
        }
    };

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Observador EHS'}
                    onClose={() => history.push('/observer-ehs/')}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <PageInfo>
                                <PageTitle>Dados do observador</PageTitle>
                                <PageDescription>
                                    Caso esteja registrando em nome de outra
                                    pessoa, informa abaixo os dados do
                                    observador (nome, CPF, e-mail)
                                </PageDescription>
                            </PageInfo>
                            <ObserverCard>
                                <ObserverAvatar>
                                    {observer?.avatar ? (
                                        <img
                                            alt={'avatar'}
                                            src={observer.avatar}
                                        />
                                    ) : observer?.name &&
                                        observer.name.length > 0 ? (
                                        observer.name[0]
                                    ) : (
                                        '-'
                                    )}
                                </ObserverAvatar>
                                <ObserverInfo>
                                    <ObserverName>{observer.name}</ObserverName>
                                </ObserverInfo>
                            </ObserverCard>
                            <ChangeObserver
                                onClick={() => setModalObserversVisible(true)}
                            >
                                Alterar observador
                            </ChangeObserver>
                        </>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() =>
                        isEditingFromCheckObservation
                            ? history.goBack()
                            : history.push('/observer-ehs')
                    }
                    onNext={() => handleNext()}
                    nextDisabled={loading}
                    nextLabel={isEditingFromCheckObservation ? 'Concluir' : 'Avançar'}
                    icon={isEditingFromCheckObservation ? <FaCheck /> : undefined}
                />
            </Container>
            <MultiSelectModal
                name={'observer'}
                visible={modalObserversVisible}
                pageTitle={'Identificado por'}
                category={'user'}
                onSave={handleSave}
                fieldsFilter={['name']}
                single={true}
                items={observerOptions}
                onClose={() => setModalObserversVisible(false)}
                selected={observer.id}
            />
        </Fragment>
    );
};

export default inject('NewRegisterObserver', 'UserStore')(observer(NewRegisterObserver));

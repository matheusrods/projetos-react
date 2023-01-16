import { inject, observer } from 'mobx-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import {
    MultiSelectModal,
    LoadingContainer
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

const NewRegisterObserver = ({
    NewRegisterSWT: { observer: storeObserver, setNewRegisterData }
}) => {
    const [modalObserversVisible, setModalObserversVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const [observerOptions, setObserverOptions] = useState([]);

    const [observer, setObserver] = useState(storeObserver);

    const getData = useCallback(async () => {
        setLoading(true);

        const { employees } = await getEmployees({ internal: 1 });

        setObserverOptions(employees);

        setLoading(false);
    }, []);

    const handleSave = (items) => {
        setObserverOptions([...items]);

        for (const user of items) {
            if (user.selected) {
                setObserver({ ...user });
            }
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
                    typeAction={'Registro de nova ação'}
                    onClose={() => history.goBack()}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageTitle>Dados do observador</PageTitle>
                            <PageDescription>
                                Caso esteja registrando em nome de outra pessoa,
                                informa abaixo os dados do observador (nome,
                                CPF, e-mail)
                            </PageDescription>
                        </PageInfo>
                        <ObserverCard>
                            <ObserverAvatar>
                                {observer?.avatar ? (
                                    <img alt={'avatar'} src={observer.avatar} />
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
                    </Content>
                )}
                <NextButton
                    positionRelative={true}
                    onBack={() => history.push('/safety-walk-talk')}
                    onNext={() => {
                        setNewRegisterData({
                            observer: observer,
                            currentStep:
                                '/safety-walk-talk/new-register/registration-location'
                        });
                        history.push('registration-location');
                    }}
                    nextDisabled={loading}
                    nextLabel={'Avançar'}
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

export default inject('NewRegisterSWT')(observer(NewRegisterObserver));

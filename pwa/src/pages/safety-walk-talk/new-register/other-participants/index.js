import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useState } from 'react';
import {
    FaInfo,
    FaTimes,
    FaTrashAlt,
    FaExclamationTriangle
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    AddButton,
    CompanyHeader,
    NextButton
} from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex,
    MultiSelectModal
} from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import { getQuantityParticipants } from '../../../../services/endpoints/swt/form';
import { getEmployees } from '../../../../services/endpoints/users';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ObserverCard,
    RightObserverCard,
    ObserverAvatar,
    ObserverInfo,
    ObserverName,
    List,
    ChangeObserver,
    EmptyContainer,
    IconContainer,
    EmptyDescription,
    TrashButton
} from './styles';

const NewRegisterOtherParticipants = ({ NewRegisterSWT, UserStore: { user } }) => {
    const {
        participants,
        registrationLocation: { location },
        setNewRegisterData
    } = NewRegisterSWT;

    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTrashVisible, setModalTrashVisible] = useState(false);
    const [excludeId, setExcludeId] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [modalExitPage, setModalExitPage] = useState(false);

    useEffect(() => {
        const getData = async () => {

            const { clientId } = user;

            const { employees } = await getEmployees({ internal: 1 });
            const quantityParticipants = await getQuantityParticipants(clientId);
            console.log(location);
            console.log(quantityParticipants);

            if (quantityParticipants && quantityParticipants?.quantity) {
                setQuantity(quantityParticipants.quantity);
            }

            const newEmployees = employees && employees?.length ? employees.map((item) => {
                const findEmployee = participants.findIndex(
                    (participant) => participant.id === item.id
                );

                return {
                    ...item,
                    selected: findEmployee !== -1 ? true : false
                };
            }) : [];

            setUsers(newEmployees);
            setLoading(false);
        };

        getData();

        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageTitle>
                                Dados dos demais participantes
                            </PageTitle>
                            <PageDescription>
                                Informe abaixo os demais participantes do Walk &
                                Talk (Opcional)
                            </PageDescription>
                        </PageInfo>
                        {participants.length > 0 ? (
                            <List>
                                {participants.map((participant, index) => {
                                    const {
                                        id,
                                        name,
                                        avatar
                                    } = participant;

                                    return (
                                        <ObserverCard key={index.toString()}>
                                            <ObserverAvatar>
                                                {avatar ? (
                                                    <img
                                                        alt={'avatar'}
                                                        src={avatar}
                                                    />
                                                ) : name && name.length > 0 ? (
                                                    name[0]
                                                ) : (
                                                    '-'
                                                )}
                                            </ObserverAvatar>
                                            <ObserverInfo>
                                                <ObserverName>
                                                    {name}
                                                </ObserverName>
                                            </ObserverInfo>
                                            <RightObserverCard>
                                                <TrashButton
                                                    onClick={() => {
                                                        setExcludeId(id);
                                                        setModalTrashVisible(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <FaTimes />
                                                </TrashButton>
                                            </RightObserverCard>
                                        </ObserverCard>
                                    );
                                })}
                                <ChangeObserver
                                    onClick={() => setModalVisible(true)}
                                >
                                    Adicionar participante
                                </ChangeObserver>
                            </List>
                        ) : (
                            <EmptyContainer>
                                <IconContainer>
                                    <FaInfo size={38} />
                                </IconContainer>
                                <EmptyDescription>
                                    Você ainda não adicionou nenhum outro
                                    participante.
                                </EmptyDescription>
                                <EmptyDescription>
                                    Clique no botão "+" para iniciar os
                                    cadastros.
                                </EmptyDescription>
                            </EmptyContainer>
                        )}
                    </Content>
                )}
                <NextButton
                    positionRelative={true}
                    nextDisabled={loading}
                    onBack={() =>
                        history.push('/safety-walk-talk/new-register/summary')
                    }
                    onNext={() => {
                        setNewRegisterData({
                            currentStep:
                                '/safety-walk-talk/new-register/other-participants'
                        });
                        history.push('facilitator');
                    }}
                    nextLabel={participants.length === 0 ? 'Pular' : 'Avançar'}
                />
                {participants.length === 0 && loading === false && (
                    <AddButton
                        bottom={56}
                        position={'absolute'}
                        onClick={() => setModalVisible(true)}
                    />
                )}
                <MultiSelectModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSave={(items) => {
                        const usersSelected = [];

                        items.forEach((item) => {
                            if (item.selected) {
                                usersSelected.push(item);
                            }
                        });

                        setNewRegisterData({ participants: usersSelected });
                        setUsers(items);
                    }}
                    items={users}
                    category={'user'}
                    fieldsFilter={['name']}
                    pageTitle={'Dados do participante'}
                    labelSearchInput={'Dados do participante'}
                    single={false}
                    limit={quantity}
                />
            </Container>
            <ModalComplex
                visible={modalTrashVisible}
                onCancel={() => {
                    setExcludeId(null);
                    setModalTrashVisible(false);
                }}
                onConfirm={() => {
                    const newUsers = [];
                    const usersSelected = [];
                    users.forEach((item) => {
                        if (excludeId === item.id) {
                            item.selected = false;

                            newUsers.push(item);
                        } else {
                            newUsers.push(item);
                        }
                    });

                    newUsers.forEach((item) => {
                        if (item.selected) {
                            usersSelected.push(item);
                        }
                    });

                    setNewRegisterData({ participants: usersSelected });
                    setUsers(newUsers);
                    setExcludeId(null);
                    setModalTrashVisible(false);
                }}
                icon={<FaTrashAlt size={40} />}
                title={'Atenção'}
                description={
                    'Ao prosseguir, o participante selecionado será excluído. Deseja excluir?'
                }
                cancelButtonLabel={'Não, cancelar'}
                confirmButtonLabel={'Sim, excluir'}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
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

export default inject('NewRegisterSWT', 'UserStore')(observer(NewRegisterOtherParticipants));

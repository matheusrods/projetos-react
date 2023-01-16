import { inject, observer } from 'mobx-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
    FaInfo,
    FaLink,
    FaTrashAlt,
    FaExclamationTriangle
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    ActionCard,
    AddButton,
    CompanyHeader,
    NextButton
} from '../../../../components/atoms';
import { ModalActions, ModalComplex } from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import colors from '../../../../styles/colors';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ActionContainerDescription,
    ActionContainer,
    IconContainer,
    LinkButton
} from './styles';

const NewActionImprovementActions = ({ NewRegisterSWT }) => {
    const {
        uuid,
        linkActionToObservation,
        setNewRegisterData
    } = NewRegisterSWT;

    const history = useHistory();
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [links, setLinks] = useState([]);
    const [currentElementId, setCurrentElementId] = useState('');
    const [currentElement, setCurrentElement] = useState(null);
    const [modalExitPage, setModalExitPage] = useState(false);

    const getLinkActionFromStorageById = () =>
        links.find((item) => item.linkId === currentElementId);

    const getAllLinksActionFromStorage = useCallback(() => {
        const newRegisterStore = localStorage.getItem(
            'safetyWalkTalk@newRegisterStore'
        );

        if (!newRegisterStore) {
            return [];
        }

        const newRegisterStoreParsed = JSON.parse(newRegisterStore);

        const currentRegister = newRegisterStoreParsed.registers.find(
            (item) => item.uuid === uuid
        );

        return currentRegister.linkActionToObservation;
    }, [uuid]);

    const handleDeleteAction = (id) => {
        const newLinkToObservation = linkActionToObservation.filter(
            (item) => item.linkId !== id
        );

        setNewRegisterData({
            linkActionToObservation: [...newLinkToObservation]
        });

        setLinks(newLinkToObservation);
        setAlertModalVisible(false);
    };

    const handleConfirmDeleteDialog = () => {
        setModalActionsVisible(false);
        setAlertModalVisible(true);
    };

    useEffect(() => {
        const storageLinks = getAllLinksActionFromStorage();
        setLinks(storageLinks);
    }, [getAllLinksActionFromStorage]);

    getLinkActionFromStorageById();

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
                    <PageInfo>
                        <PageTitle>Ações de melhoria</PageTitle>
                        <PageDescription>
                            Informe as ações de melhoria que voê elaborou para
                            os dados do usuário
                        </PageDescription>
                    </PageInfo>
                    <ActionContainer noActions={links.length === 0}>
                        {!links.length ? (
                            <>
                                <IconContainer>
                                    <FaInfo size={38} />
                                </IconContainer>
                                <ActionContainerDescription>
                                    Você ainda não adicionou nenhuma ação de
                                    melhoria.
                                </ActionContainerDescription>
                                <ActionContainerDescription>
                                    Clique em "+" para cadastrar uma nova ação
                                    ou em ”Link” para vincular uma ação
                                    pré-existente
                                </ActionContainerDescription>
                            </>
                        ) : (
                            <>
                                {links.map((link) => (
                                    <ActionCard
                                        action={link.action}
                                        linkObservedItem={link.question}
                                        backgroundColor={colors.gray1}
                                        key={link.linkId}
                                        showOptions={true}
                                        onClickOptions={() => {
                                            setCurrentElementId(link.linkId);
                                            setCurrentElement(link);
                                            setModalActionsVisible(true);
                                        }}
                                        onClickDetails={null}
                                    />
                                ))}
                            </>
                        )}
                    </ActionContainer>
                    <LinkButton
                        onClick={() => history.push('improvement-actions/link')}
                    >
                        <FaLink size={21} color={'#fff'} />
                    </LinkButton>
                    <AddButton
                        position={'absolute'}
                        bottom={56}
                        onClick={() =>
                            history.push('improvement-actions/include-action')
                        }
                    />
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() =>
                        history.push(
                            '/safety-walk-talk/new-register/commitments'
                        )
                    }
                    onNext={() => {
                        setNewRegisterData({
                            currentStep:
                                '/safety-walk-talk/new-register/improvement-actions'
                        });
                        history.push('improvement-actions/confirm');
                    }}
                    nextLabel={links && links.length > 0 ? 'Avançar' : 'Pular'}
                />
            </Container>
            <ModalActions
                title={'Ação de melhoria'}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () => {
                            const action = getLinkActionFromStorageById(
                                currentElementId
                            );
                            action.local
                                ? history.push(
                                      `improvement-actions/include-action/${currentElementId}`
                                  )
                                : history.push(
                                      `improvement-actions/link/${currentElementId}`
                                  );
                        }
                    },
                    {
                        label: 'Excluir item',
                        icon: 'FaTrashAlt',
                        color: '#FF5C69',
                        onPress: () => handleConfirmDeleteDialog()
                    }
                ]}
            />
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => handleDeleteAction(currentElementId)}
                icon={<FaTrashAlt size={40} color={colors.redAux} />}
                title={'Atenção'}
                description={`Ao prosseguir, a ação de melhoria #${
                    currentElement?.local
                        ? currentElement?.action?.uuid?.split('-')[0]
                        : currentElement?.action?.id
                } será excluída. Deseja excluir?`}
                confirmButtonLabel={'Sim, excluir'}
                cancelButtonLabel={'Não, cancelar'}
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

export default inject('NewRegisterSWT')(observer(NewActionImprovementActions));

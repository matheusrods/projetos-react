import React, { Fragment, useState, useEffect } from 'react';
import {
    FaInfo,
    FaLink,
    FaExclamationTriangle,
    FaTrashAlt
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Header } from '../../../../components/organisms';
import { ModalActions, ModalComplex } from '../../../../components/molecules';
import {
    ActionCard,
    AddButton,
    CompanyHeader,
    NextButton
} from '../../../../components/atoms';
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
import colors from '../../../../styles/colors';
import { isEmpty, sleep } from '../../../../utils/helpers';
import { toast } from 'react-toastify';

const RiskRatingImprovementActions = ({ ClassificationStore }) => {
    const history = useHistory();

    const { improvementActions, setNewRegisterData, reset, criticism } =
        ClassificationStore;

    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [currentElementId, setCurrentElementId] = useState('');
    const [currentElement, setCurrentElement] = useState(null);
    const [links, setLinks] = useState([]);

    const handleConfirmDeleteDialog = () => {
        setModalActionsVisible(false);
        setAlertModalVisible(true);
    };

    const handleDeleteAction = (id) => {
        const funnel = improvementActions.filter((item) => item.linkId !== id);

        setNewRegisterData({ improvementActions: [...funnel] });
        setLinks(funnel);
        setAlertModalVisible(false);
    };

    useEffect(() => {
        const grabIdFromUrl = () => {
            const splitted = history.location.pathname.split('/');
            return Number(splitted[3]);
        };
        if (isEmpty(criticism)) {
            toast.warn(
                'Perdemos alguns dados. Você será redirecionado em alguns segundos'
            );
            sleep(3000).then(() =>
                history.push(`/observer-ehs/risk-rating/${grabIdFromUrl()}`)
            );
        }
    }, [criticism, history]);

    useEffect(() => {
        setLinks(improvementActions);
    }, [improvementActions]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Classificação de risco EHS'}
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
                                {links?.map((link) => (
                                    <ActionCard
                                        action={link?.action}
                                        backgroundColor={colors.gray1}
                                        key={link.linkId}
                                        showOptions={true}
                                        onClickOptions={() => {
                                            setModalActionsVisible(true);
                                            setCurrentElementId(link.linkId);
                                            setCurrentElement(link);
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
                    onBack={() => history.goBack()}
                    onNext={() => history.push('quality')}
                    nextLabel={'Avançar'}
                    nextDisabled={links.length === 0}
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
                            const action = links.find(
                                (item) => item.linkId === currentElementId
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
                    'Ao sair, você perdera os dados até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => {
                    reset();
                    history.push('/observer-ehs');
                }}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject('ClassificationStore')(
    observer(RiskRatingImprovementActions)
);

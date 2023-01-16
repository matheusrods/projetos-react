import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
    FaInfo,
    FaLink,
    FaTrashAlt,
    FaArrowRight
} from 'react-icons/fa';
import { Redirect, useHistory } from 'react-router-dom';
import {
    ActionCard,
    AddButton,
    CompanyHeader,
    NextButton,
    SingleNextButton,
    WhiteHeaderBack
} from '../../../../../components/atoms';
import { CompletionSuccess, ModalActions, ModalComplex } from '../../../../../components/molecules';
import colors from '../../../../../styles/colors';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ActionContainerDescription,
    ActionContainer,
    IconContainer,
    LinkButton,
    ContainerSuccess
} from './styles';
import { addTreatmentReview } from '../../../../../services/endpoints/audit/responsible-dealt/add-treatment-review';

const AuditRensponsibleDealtImprovementActions = ({ Auditing }) => {
    const history = useHistory();

    const {
        unConformityRequirement = null,
        dealInEditing,
        removeImprovementAction,
        setImprovementActionDealtId,
        setDealInEditing,
        setUnConformityRequirement,
        setUnConformity
    } = Auditing;

    const [actionSelected, setActionSelected] = useState(null);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleSubmit = async () => {
        setLoadingSubmit(true);

        const response = await addTreatmentReview(unConformityRequirement.id, dealInEditing);

        if (response) {
            setCompleted(true);
        }

        setLoadingSubmit(false);
    };

    const handleContinue = () => {
        history.push('/audit/responsible-dealt');

        setUnConformity(null);
        setUnConformityRequirement(null);
        setImprovementActionDealtId(null);
        setDealInEditing({}, true);
    };

    if (!unConformityRequirement) {
        return <Redirect to={'/audit/responsible-dealt'} />
    } else if (completed) {
        return (
            <ContainerSuccess>
                <CompanyHeader
                    positionRelative={true}
                    onClose={handleContinue}
                    typeAction={'Tratativa de NC/OM'}
                />
                <Content>
                    <CompletionSuccess
                        title={'Sucesso!'}
                        description={'Tratativa de NC/OM foi finalizada.'}
                        redirectTime={50000}
                        fullscreen={completed}
                        redirectTo={handleContinue}
                    />
                </Content>
                <SingleNextButton
                    positionRelative={true}
                    onNext={handleContinue}
                    nextLabel={'Próximo Requisito'}
                    icon={<FaArrowRight />}
                />
            </ContainerSuccess>
        );
    } else {
        return (
            <Fragment>
                <WhiteHeaderBack
                    title={'Tratativa de NC/OM'}
                    onBack={history.goBack}
                />
                <Container>
                    <Content>
                        <PageInfo>
                            <PageTitle>Ações de melhoria</PageTitle>
                            <PageDescription>
                                Informe as ações de melhoria que voê elaborou
                                para os dados do usuário
                            </PageDescription>
                        </PageInfo>
                        <ActionContainer noActions={!dealInEditing?.improvementActions?.length}>
                            {!dealInEditing?.improvementActions?.length ? (
                                <Fragment>
                                    <IconContainer>
                                        <FaInfo size={38} />
                                    </IconContainer>
                                    <ActionContainerDescription>
                                        Você ainda não adicionou nenhuma ação de
                                        melhoria.
                                    </ActionContainerDescription>
                                    <ActionContainerDescription>
                                        Clique em "+" para cadastrar uma nova
                                        ação ou em ”Link” para vincular uma ação
                                        pré-existente
                                    </ActionContainerDescription>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {dealInEditing.improvementActions.map((action, index) => (
                                        <ActionCard
                                            key={index}
                                            action={action}
                                            backgroundColor={colors.gray1}
                                            showOptions={true}
                                            onClickOptions={() => {
                                                setActionSelected(action);
                                                setModalActionsVisible(true);
                                            }}
                                            onClickDetails={null}
                                        />
                                    ))}
                                </Fragment>
                            )}
                        </ActionContainer>
                        <LinkButton
                            onClick={() => history.push('actions/link')}
                        >
                            <FaLink size={21} color={'#fff'} />
                        </LinkButton>
                        <AddButton
                            position={'absolute'}
                            bottom={56}
                            onClick={() => {
                                setImprovementActionDealtId(null);

                                history.push('actions/include-action');
                            }}
                        />
                    </Content>
                    <NextButton
                        loading={loadingSubmit}
                        nextDisabled={loadingSubmit}
                        positionRelative={true}
                        onBack={history.goBack}
                        onNext={handleSubmit}
                        nextLabel={dealInEditing?.improvementActions?.length ? 'Enviar dados' : 'Pular e enviar dados'}
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
                                setImprovementActionDealtId(actionSelected?.id);

                                history.push('actions/include-action');
                            },
                            disabled: actionSelected?.itsLink
                        },
                        {
                            label: 'Excluir item',
                            icon: 'FaTrashAlt',
                            color: '#FF5C69',
                            onPress: () => setAlertModalVisible(true)
                        }
                    ]}
                />
                <ModalComplex
                    nameModal={'alert-modal'}
                    visible={alertModalVisible}
                    onCancel={() => setAlertModalVisible(false)}
                    onConfirm={() => {
                        removeImprovementAction(actionSelected?.id);
                        setAlertModalVisible(false);
                        setModalActionsVisible(false);
                    }}
                    icon={<FaTrashAlt size={40} color={colors.redAux} />}
                    title={'Atenção'}
                    description={`Ao prosseguir, a ação de melhoria #${actionSelected?.id} será excluída. Deseja excluir?`}
                    confirmButtonLabel={'Sim, excluir'}
                    cancelButtonLabel={'Não, cancelar'}
                />
            </Fragment>
        );
    }
};

export default inject('Auditing')(
    observer(AuditRensponsibleDealtImprovementActions)
);

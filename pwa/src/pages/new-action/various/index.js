import { inject, observer } from "mobx-react";
import React, { Fragment, useState } from "react";
import { FaExclamationTriangle, FaInfo } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import {
    ActionCard,
    AddButton,
    CompanyHeader,
    SingleNextButton,
} from "../../../components/atoms";
import { ModalComplex } from "../../../components/molecules";
import { Header } from "../../../components/organisms";
import { createActions, alertActions } from "../../../services/endpoints/actions";
import colors from "../../../styles/colors";
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ActionContainerDescription,
    ActionContainer,
    IconContainer,
} from "./styles";

const NewActionVarious = ({
    NewActionStore: {
        registrationLocation,
        recordSource,
        observer,
        reset,
        actions: storeActions,
    },
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [modalExitVisible, setModalExitVisible] = useState(false);

    if (!recordSource.id) history.push("type");

    const actions = storeActions.map((item) => ({
        ...item,
        origin: {
            id: recordSource?.id,
            description: recordSource?.label,
        },
        criticism: {
            id: item.criticism?.value,
            description: item.criticism?.label,
            color: item.criticism?.color,
        },
        type: {
            id: item.type?.value,
            description: item.type?.label,
        },
        user: observer,
        location: {
            clientId: registrationLocation?.location?.id,
            fullAddress: registrationLocation?.location?.fullAddress,
        },
        opco: registrationLocation?.opco?.id ?? null,
        businessUnit: registrationLocation?.businessUnit?.id ?? null,
        status: {
            id: item.status?.value,
            description: item.status?.label,
            color: item.status?.color,
        },
    }));

    const handleConfirm = async () => {

        try {

            setLoading(true)

            const response = await createActions(actions);

            alertActions(response.map(acao => { return { codigo: acao.codigo } }));

            history.push("/action-plan");

        } catch (error) {

            console.log(error);
        }
        finally {

            setLoading(false)
        }



    };

    return hasPermission(1) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={"Registro de nova ação"}
                    onClose={() => setModalExitVisible(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Ações de melhoria</PageTitle>
                        <PageDescription>
                            Informe as ações de melhoria que voê elaborou para
                            os dados do usuário
                        </PageDescription>
                    </PageInfo>
                    <ActionContainer noActions={actions.length === 0}>
                        {!actions.length ? (
                            <>
                                <IconContainer>
                                    <FaInfo size={38} />
                                </IconContainer>
                                <ActionContainerDescription>
                                    Você ainda não adicionou nenhuma ação de
                                    melhoria.
                                </ActionContainerDescription>
                                <ActionContainerDescription>
                                    Clique no botão "+" para iniciar os
                                    cadastros.
                                </ActionContainerDescription>
                            </>
                        ) : (
                            <>
                                {actions.map((action, index) => (
                                    <ActionCard
                                        showStatusInline={true}
                                        action={action}
                                        backgroundColor={colors.gray1}
                                        key={index}
                                        onClickDetails={() =>
                                            history.push(`details/${index}`)
                                        }
                                    />
                                ))}
                            </>
                        )}
                    </ActionContainer>
                    <AddButton
                        bottom={56}
                        position={"absolute"}
                        onClick={() => history.push("improvement-action-form")}
                    />
                </Content>
                <SingleNextButton
                    positionRelative={true}
                    disabled={actions.length === 0 || loading}
                    loading={loading}
                    onNext={() => handleConfirm()}
                    nextLabel={"Finalizar"}
                />
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"Ao sair, você perdera todos os dados preenchidos. Este ato não pode ser revertido. Tem certeza que deseja sair?"}
                nameModal={"exit-page"}
                visible={modalExitVisible}
                onCancel={() => setModalExitVisible(false)}
                onConfirm={() => {
                    reset();
                    history.push("/action-plan");
                }}
                icon={<FaExclamationTriangle size={40} color={"#FF5C69"} />}
                confirmButtonLabel={"Sair"}
                cancelButtonLabel={"Cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("NewActionStore", "PermissionStore")(observer(NewActionVarious));

import React, { Fragment, useState } from "react";
import { inject, observer } from "mobx-react";
import { FaCheck, FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { ActionDetails, WhiteHeader } from "../../../components/atoms";
import { ModalActions, ModalComplex } from "../../../components/molecules";
import { ConfirmCancelFooter, Header } from "../../../components/organisms";
import colors from "../../../styles/colors";
import { Container, Content } from "./styles";
import { createActions, alertActions } from "../../../services/endpoints/actions";

const NewActionDetails = ({
    NewActionStore,
    PermissionStore: { hasPermission },
}) => {
    const {
        type,
        observer,
        recordSource,
        registrationLocation,
        actions,
        setNewActionData,
        associations,
        reset
    } = NewActionStore;
    const history = useHistory();

    const { id } = useParams();

    if (actions.length === 0) history.push("type");

    const storeAction = actions[type === 1 ? 0 : id] ?? {};

    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(false);
    const [modalExitVisible, setModalExitVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const transformResponseDynamicFieldsAnswers = (data = {}) => {
        if (typeof data === 'object' && !Array.isArray(data)) {
            const fields = [];

            for (const fieldKey in data) {
                fields.push({
                    id: data[fieldKey].id,
                    fieldName: data[fieldKey].fieldName,
                    value: data[fieldKey]?.name ?? '#' + data[fieldKey].id
                });
            }

            return fields.sort((a, b) => {
                if (a.fieldName > b.fieldName) {
                    return 1;
                }

                if (a.fieldName < b.fieldName) {
                    return -1;
                }

                return 0;
            });
        } else {
            return [];
        }
    };

    const action = {
        ...storeAction,
        origin: {
            id: recordSource?.id,
            description: recordSource?.label,
        },
        criticism: {
            id: storeAction?.criticism?.value,
            description: storeAction?.criticism?.label,
            color: storeAction?.criticism?.color,
        },
        type: {
            id: storeAction?.type?.value,
            description: storeAction?.type?.label,
        },
        user: observer,
        location: {
            clientId: registrationLocation?.location?.id,
            fullAddress: registrationLocation?.location?.fullAddress,
        },
        opco: registrationLocation?.opco?.id ?? null,
        businessUnit: registrationLocation?.businessUnit?.id ?? null,
        status: {
            id: storeAction?.status?.value,
            description: storeAction?.status?.label,
            color: storeAction?.status?.color,
        },
        relatedRecords: [...associations],
        dynamicFields: transformResponseDynamicFieldsAnswers(storeAction.dynamicFieldsAnswers),
    };

    const handleConfirm = async () => {
        setLoading(true);

        const responseResultData = await createActions([{ ...action, associations: associations }]);

        if (responseResultData?.length && responseResultData?.[0]?.codigo) {

            const alertActionsBody = [
                {
                    codigo: responseResultData[0].codigo,
                }
            ];

            alertActions(alertActionsBody);
        }

        if (responseResultData) history.push('/action-plan');

        setLoading(false);
    };

    return hasPermission(1) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container type={type}>
                <WhiteHeader
                    title={type === 1 ? "Incluir ação de melhoria" : "Detalhes"}
                    onClose={() => setModalExitVisible(true)}
                />
                <Content type={type}>
                    <ActionDetails
                        action={action}
                        showOptions={type === 2 ? true : false}
                        onClickOptions={() => setModalActionsVisible(true)}
                    />
                </Content>
            </Container>
            {type === 1 && (
                <ConfirmCancelFooter
                    confirmButtonLabel={"Confirmar"}
                    confirmButtonIcon={<FaCheck />}
                    confirmButtonLoading={loading}
                    confirmButtonDisabled={loading}
                    cancelButtonLabel={"Cancelar"}
                    onConfirm={() => handleConfirm()}
                    onCancel={() => history.goBack()}
                />
            )}
            {type === 2 && (
                <>
                    <ModalActions
                        title={"Ação de melhoria"}
                        nameModal={"modal-actions"}
                        visible={modalActionsVisible}
                        onClose={() => setModalActionsVisible(false)}
                        options={[
                            {
                                label: "Editar item",
                                onPress: () =>
                                    history.push(`/new-action/improvement-action-form/${id}`),
                            },
                            {
                                label: "Excluir item",
                                onPress: () =>
                                    setModalConfirmDeleteVisible(true),
                                icon: "FaTrash",
                                color: colors.redAux,
                            },
                        ]}
                    />
                    <ModalComplex
                        title={"Atenção"}
                        description={
                            "Ao prosseguir, a ação selecionada será excluída. Deseja excluir?"
                        }
                        nameModal={"delete"}
                        visible={modalConfirmDeleteVisible}
                        onCancel={() => setModalConfirmDeleteVisible(false)}
                        onConfirm={() => {
                            const newActions = [...actions];
                            newActions.splice(id, 1)
                            setNewActionData({
                                actions: newActions,
                            });
                            history.goBack();
                        }}
                        icon={<FaTrashAlt size={32} />}
                        confirmButtonLabel={"Sim, excluir"}
                        cancelButtonLabel={"Não, cancelar"}
                    />
                </>
            )}
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

export default inject("NewActionStore", "PermissionStore")(observer(NewActionDetails));

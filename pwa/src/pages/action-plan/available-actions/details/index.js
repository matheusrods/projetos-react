import React, { Fragment, useEffect, useState } from "react";
import moment from "../../../../config/moment";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ActionDetails, InputDatePicker, WhiteHeader } from "../../../../components/atoms";
import {
    LoadingContainer,
    ModalActions,
    ModalComplex,
} from "../../../../components/molecules";
import { ConfirmCancelFooter, Header } from "../../../../components/organisms";
import { getActionDetails, updateAction } from "../../../../services/endpoints/actions";
import { updateRequest } from "../../../../services/endpoints/requests";
import colors from "../../../../styles/colors";
import {
    Container,
    Content,
    JustificationCard,
    ActionLabel,
    PageTitle,
} from "./styles";
import { inject, observer } from "mobx-react";

const AvailableActionsDetails = ({
    PermissionStore: { hasPermission, haveAtLeastOnePermission }
}) => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [loadingUpdateRequest, setLoadingUpdateRequest] = useState(false);
    const [loadingUpdateDeadline, setLoadingUpdateDeadline] = useState(false);
    const [action, setAction] = useState({});
    const [lastRequest, setLastRequest] = useState({});
    const [newDeadline, setNewDeadline] = useState();

    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [modalUpdateDeadlineVisible, setModalUpdateDeadlineVisible] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const action = await getActionDetails(id);

            const [lastRequest] = action.requests.sort((a, b) => b.status - a.status).slice(-1);

            setAction(action);
            setLastRequest(lastRequest);

            setLoading(false);
        };

        getData();
    }, [id]);

    const handleAcceptRequest = async () => {
        if (!moment(new Date(action.deadline)).isValid()) {
            setModalConfirmVisible(false)
            toast.error("Informe um prazo para esta a????o!");
            return;
        }

        setLoadingUpdateRequest(true);

        const updated = await updateRequest({
            requestId: lastRequest.id,
            statusId: 2,
        });

        if (updated) {
            history.push("/available-actions");
        } else {
            setLoadingUpdateRequest(false);
        }
    };

    const handleSubmitNewDeadline = async () => {
        setLoadingUpdateDeadline(true);

        if (!newDeadline && !moment(new Date(action.deadline)).isValid()) {
            setLoadingUpdateDeadline(false);

            toast.error("Informe um prazo para esta a????o!");
        } else if (newDeadline) {
            const response = await updateAction(id, {
                deadline: newDeadline
            });

            if (response) {
                setAction({
                    ...action,
                    deadline: newDeadline,
                });

                setModalUpdateDeadlineVisible(false);
            }

            setLoadingUpdateDeadline(false);
        } else {
            setLoadingUpdateDeadline(false);

            toast.error("Informe um prazo para esta a????o!");
        }
    };

    const optionsModal = () => {
        const options = [];

        if (hasPermission(3)) {
            options.push({
                label: "Transferir para outro usu??rio",
                icon: "FaExchangeAlt",
                onPress: () => history.push(`${id}/transfer/${lastRequest.id}`),
            });
        }

        if (hasPermission(4)) {
            options.push({
                label: "Recusar",
                onPress: () => history.push(`${id}/refuse/${lastRequest.id}`),
                icon: "FaTimes",
                color: colors.redAux,
            });
        }

        return options;
    }

    return haveAtLeastOnePermission([2, 3, 4]) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes"}
                    onClose={() => history.goBack()}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Fragment>
                        <Content>
                            {lastRequest.justification && (
                                <Fragment>
                                    <PageTitle>
                                        Detalhes da transfer??ncia
                                    </PageTitle>
                                    <JustificationCard>
                                        <ActionLabel>
                                            <span>Justificativa</span>
                                            <span>{lastRequest.justification}</span>
                                        </ActionLabel>
                                    </JustificationCard>
                                    <PageTitle>Detalhes da a????o</PageTitle>
                                </Fragment>
                            )}
                            <ActionDetails
                                action={action}
                                showOptions={false}
                                onClickOptions={() => setModalActionsVisible(true)}
                                handleAddDeadline={() => setModalUpdateDeadlineVisible(true)}
                                canAddDeadline
                            />
                        </Content>

                    </Fragment>
                )}
                <ConfirmCancelFooter
                    confirmButtonLabel={"Aceitar"}
                    confirmButtonIcon={haveAtLeastOnePermission([3, 4]) && <FaCheck />}
                    confirmButtonDisabled={!hasPermission(2) || loading}
                    cancelButtonLabel={"Outras a????es"}
                    cancelButtonLabelColor={colors.gray6}
                    hideCancelButton={!haveAtLeastOnePermission([3, 4])}
                    onConfirm={() => setModalConfirmVisible(true)}
                    onCancel={() => setModalActionsVisible(true)}
                />
            </Container>
            {haveAtLeastOnePermission([3, 4]) && (
                <ModalActions
                    title={"Outras a????es"}
                    nameModal={"modal-actions"}
                    visible={modalActionsVisible}
                    onClose={() => setModalActionsVisible(false)}
                    options={optionsModal()}
                />
            )}
            {hasPermission(2) && (
                <ModalComplex
                    title={"Aceitar a????o"}
                    description={"Ao prosseguir, a a????o ser?? aceita. Este ato n??o pode ser revertido. Tem certeza que deseja aceitar esta a????o?"}
                    nameModal={"confirm"}
                    visible={modalConfirmVisible}
                    onCancel={() => setModalConfirmVisible(false)}
                    onConfirm={() => handleAcceptRequest()}
                    icon={<FaCheck size={32} color={colors.blueAux} />}
                    confirmButtonLabel={"Sim, aceitar"}
                    confirmButtonLoading={loadingUpdateRequest}
                    cancelButtonLabel={"N??o, cancelar"}
                />
            )}
            <ModalComplex
                title={"Alterar prazo"}
                nameModal={"update-deadline"}
                visible={modalUpdateDeadlineVisible}
                onCancel={() => setModalUpdateDeadlineVisible(false)}
                onConfirm={handleSubmitNewDeadline}
                confirmButtonLabel={"Alterar"}
                confirmButtonLoading={loadingUpdateDeadline}
                cancelButtonLabel={"Cancelar"}
            >
                <InputDatePicker
                    label={'Novo prazo para conclus??o'}
                    onChange={(date) => setNewDeadline(date)}
                    clearIcon={<FaTimes color={colors.gray4_2} />}
                />
            </ModalComplex>
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(AvailableActionsDetails));

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Redirect, useHistory } from "react-router";
import { useParams } from "react-router-dom";
import {
    ActionDetails as ActionDetailsComponent,
    WhiteHeaderBack,
} from "../../../components/atoms";
import { LoadingContainer, ModalActions } from "../../../components/molecules";
import { ConfirmCancelFooter } from "../../../components/organisms";
import { getActionDetails } from "../../../services/endpoints/actions";
import { Container, Content } from "./styles";
import moment from "../../../config/moment";

function ActionDetails({
    UserStore: { user },
    CompleteActionStore: { setData },
    PermissionStore: { hasPermission, haveAtLeastOnePermission, isAdmin }
}) {
    const history = useHistory();

    const { id } = useParams();

    const { hasBackToCompleteAction = false } = history.location.state ?? {};

    const [actionDetails, setActionDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);

        const action = await getActionDetails(id);

        setActionDetails(action, !action?.responsible?.id);

        setLoading(false);
    }, [id]);

    const renderModalActions = () => {
        const options = [];

        if (!actionDetails.reopened && hasPermission(6)) {
            options.push({
                label: "Solicitar postergação de prazo",
                onPress: () =>
                    history.push(
                        `/action/request-postponement/${actionDetails.id}`
                    ),
            });
        }

        if (hasPermission(7)) {
            options.push({
                label: "Solicitar cancelamento",
                onPress: () =>
                    history.push(
                        `/action/request-cancellation/${actionDetails.id}`
                    ),
                icon: "FaTrashAlt",
                color: "#FF5C69",
            });
        }

        return options;
    };

    useEffect(() => {
        getData();
    }, [getData]);

    return hasPermission(15) ? (
        <Fragment>
            <WhiteHeaderBack
                title={"Detalhes da ação"}
                onBack={() => {
                    if (hasBackToCompleteAction) {
                        history.push('/action-plan');
                    } else {
                        history.goBack()
                    }
                }}
            />
            <Container>
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <ActionDetailsComponent
                            action={actionDetails}
                            changeResponsible={
                                !(actionDetails?.responsible?.id)
                                && (actionDetails?.requests?.filter(item => item.type === 1 && item.status === 1).length === 0)
                                && actionDetails?.user?.id
                                && actionDetails.user.id === user.id
                            }
                        />
                    )}
                </Content>
                {
                    (
                        isAdmin(user.profiles)
                        || (
                            haveAtLeastOnePermission([5, 6, 7])
                            && (
                                actionDetails?.status?.id === 3
                                || (
                                    actionDetails?.status?.id === 4
                                    && !actionDetails?.completed?.date
                                )
                            )
                            && actionDetails?.responsible?.id
                            && actionDetails.responsible.id === user.id                            
                        )                        
                    )
                    && (
                        <ConfirmCancelFooter
                            onConfirm={() => {
                                setData({
                                    completedAction: actionDetails?.completed?.date ? 1 : null,
                                    conclusionDate: actionDetails?.completed?.date ? moment(actionDetails.completed.date, 'DD-MM-YYYY').format("YYYY-MM-DD") : null,
                                    conclusionComments: actionDetails?.completed?.comments ? actionDetails.completed.comments : '',
                                });

                                history.push(`/complete-action/${id}`);
                            }}
                            confirmButtonDisabled={!hasPermission(5)}
                            hideCancelButton={!haveAtLeastOnePermission([6, 7])}
                            onCancel={() => setModalActionsVisible(true)}
                            cancelButtonLabel={"Outras ações"}
                            confirmButtonLabel={"Atualizar ação"}
                        />
                    )}
            </Container>
            <ModalActions
                title={"Ação de melhoria"}
                nameModal={"modal-actions"}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={renderModalActions()}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
}

export default inject("UserStore", "CompleteActionStore", "PermissionStore")(observer(ActionDetails));

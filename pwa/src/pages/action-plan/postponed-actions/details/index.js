import { inject, observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { ActionDetails, WhiteHeader } from "../../../../components/atoms";
import { LoadingContainer, ModalComplex } from "../../../../components/molecules";
import { ConfirmCancelFooter, Header } from "../../../../components/organisms";
import { getActionDetails } from "../../../../services/endpoints/actions";
import { updateRequest } from "../../../../services/endpoints/requests";
import colors from "../../../../styles/colors";
import {
    Container,
    Content,
    JustificationCard,
    PageTitle,
    ActionLabel,
} from "./styles";

const PostponedActionsDetails = ({ PermissionStore: { hasPermission } }) => {
    const history = useHistory();

    const { id } = useParams();

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [action, setAction] = useState([]);
    const [lastRequest, setLastRequest] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingUpdateRequest, setLoadingUpdateRequest] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const action = await getActionDetails(id);
            const [lastRequest] = action.requests.slice(-1);

            setLastRequest(lastRequest);
            setAction(action);
            setLoading(false);
        };

        getData();
    }, [id]);

    const handleAcceptRequest = async () => {
        setLoadingUpdateRequest(true);

        const response = await updateRequest({
            requestId: lastRequest.id,
            statusId: 2,
        });

        if (response) {
            history.push("/postponed-actions");
        } else {
            setLoadingUpdateRequest(false);
        }
    };

    return hasPermission(11) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes"}
                    onClose={() => history.goBack()}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <PageTitle>Detalhes da postergação</PageTitle>
                            <JustificationCard>
                                <ActionLabel>
                                    <span>Justificativa</span>
                                    <span>{lastRequest.justification}</span>
                                </ActionLabel>
                                <ActionLabel>
                                    <span>Novo prazo</span>
                                    <span>{lastRequest.newDeadline}</span>
                                </ActionLabel>
                            </JustificationCard>
                            <PageTitle>Detalhes da ação</PageTitle>
                            <ActionDetails
                                action={action}
                                showOptions={false}
                            />
                        </Fragment>
                    )}
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Sim, aceitar"}
                    cancelButtonLabel={"Não, recusar"}
                    cancelButtonLabelColor={colors.gray6}
                    onConfirm={() => setModalConfirmVisible(true)}
                    onCancel={() => history.push(`/postponed-actions/details/${id}/refuse/${lastRequest.id}`)}
                />
            </Container>
            <ModalComplex
                title={"Postergar?"}
                description={"Ao avançar, a postergação será confirmada. Este ato não pode ser revertido. Tem certeza que deseja postergar esta ação?"}
                nameModal={"confirm"}
                visible={modalConfirmVisible}
                onCancel={() => setModalConfirmVisible(false)}
                onConfirm={() => handleAcceptRequest()}
                icon={<FaCheck size={32} color={colors.blueAux} />}
                confirmButtonLabel={"Sim, avançar"}
                confirmButtonLoading={loadingUpdateRequest}
                cancelButtonLabel={"Não, voltar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(PostponedActionsDetails));

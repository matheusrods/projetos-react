import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { FaInbox } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import { ActionCard, WhiteHeaderBack } from "../../../components/atoms";
import { LoadingContainer } from "../../../components/molecules";
import { getPendingActions } from "../../../services/endpoints/actions";
import {
    Container,
    Content,
    ActionContainerDescription,
    ActionContainer,
    IconContainer,
    PageTitle,
    PageDescription,
} from "./styles";

const AvailableActions = ({
    PermissionStore: { haveAtLeastOnePermission }
}) => {
    const history = useHistory();

    const [actions, setActions] = useState([]);
    const [daysToAcceptAction, setDaysToAcceptAction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const { actions, actionRule } = await getPendingActions({ statusId: 1 });

            setActions(actions);
            setDaysToAcceptAction(actionRule?.daysToAcceptAction);

            setLoading(false);
        };

        getData();
    }, []);

    return haveAtLeastOnePermission([2, 3, 4]) ? (
        <>
            <Container>
                <WhiteHeaderBack
                    title={"Aguardando aceite"}
                    onBack={() => history.push("/action-plan")}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <ActionContainer noActions={actions.length === 0}>
                            {actions.length === 0 ? (
                                <>
                                    <IconContainer>
                                        <FaInbox size={64} />
                                    </IconContainer>
                                    <ActionContainerDescription>
                                        Tudo certo por aqui!
                                    </ActionContainerDescription>
                                    <ActionContainerDescription>
                                        Nenhum registro novo.
                                    </ActionContainerDescription>
                                </>
                            ) : (
                                <>
                                    <PageTitle>
                                        Aceite, recusa, transfer??ncia
                                    </PageTitle>
                                    <PageDescription>
                                        Voc?? foi indicado como respons??vel da
                                        a????es abaixo. Voc?? pode aceitar, recusar
                                        ou transferir cada a????o, de acordo com
                                        sua an??lise.
                                    </PageDescription>
                                    {daysToAcceptAction &&
                                        <PageDescription>
                                            Ap??s {daysToAcceptAction} dias do recebimento, as a????es
                                            s??o automaticamente aceitas
                                        </PageDescription>
                                    }
                                    {actions.map((action, index) => (
                                        <ActionCard
                                            action={action}
                                            key={index.toString()}
                                            onClickDetails={() =>
                                                history.push(
                                                    `/available-actions/details/${action.id}`
                                                )
                                            }
                                        />
                                    ))}
                                </>
                            )}
                        </ActionContainer>
                    )}
                </Content>
            </Container>
        </>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(AvailableActions));

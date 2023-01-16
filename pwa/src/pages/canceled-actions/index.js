import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaInbox } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import { ActionCard, WhiteHeaderBack } from "../../components/atoms";
import { LoadingContainer } from "../../components/molecules";
import { getPendingActions } from "../../services/endpoints/actions";
import {
    Container,
    Content,
    ActionContainerDescription,
    ActionContainer,
    IconContainer,
} from "./styles";

const CanceledActions = ({
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const { actions } = await getPendingActions({ statusId: 3 });

            setActions(actions);

            setLoading(false);
        };

        getData();
    }, []);

    return hasPermission(12) ? (
        <Container>
            <WhiteHeaderBack
                title={"Aguardando cancelamento"}
                onBack={() => history.push("/action-plan")}
            />
            <Content>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <ActionContainer noActions={actions.length === 0}>
                        {!actions.length ? (
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
                                {actions.map((action) => (
                                    <ActionCard
                                        action={action}
                                        key={action.id}
                                        onClickDetails={() =>
                                            history.push(
                                                `/canceled-actions/details/${action.id}`
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
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(CanceledActions));

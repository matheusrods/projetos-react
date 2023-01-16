import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
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

const LateTeamActions = ({ PermissionStore: { hasPermission }}) => {
    const history = useHistory();

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const { actions } = await getPendingActions({ statusId: 6 });

            setActions(actions);

            setLoading(false);
        };

        getData();
    }, []);

    return hasPermission(14) ? (
        <Container>
            <WhiteHeaderBack
                fixed={true}
                title={"Atrasadas do meu time"}
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
                                            history.push(`/late-team-actions/details/${action.id}`)
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

export default inject("PermissionStore")(observer(LateTeamActions));

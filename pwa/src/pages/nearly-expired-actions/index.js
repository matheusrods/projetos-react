import { inject, observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
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

const NearlyExpiredActions = ({ PermissionStore: { hasPermission }}) => {
    const history = useHistory();

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const { actions } = await getPendingActions({ statusId: 5 });

            setActions(actions);

            setLoading(false);
        };

        getData();
    }, []);

    return hasPermission(13) ? (
        <Container>
            <WhiteHeaderBack
                fixed={true}
                title={"Próximas do vencimento"}
                onBack={() => history.push("/action-plan")}
            />
            <Content>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <ActionContainer noActions={actions.length === 0}>
                        {!actions.length ? (
                            <Fragment>
                                <IconContainer>
                                    <FaInbox size={64} />
                                </IconContainer>
                                <ActionContainerDescription>
                                    Tudo certo por aqui!
                                </ActionContainerDescription>
                                <ActionContainerDescription>
                                    Nenhum registro novo.
                                </ActionContainerDescription>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {actions.map((action) => (
                                    <ActionCard
                                        action={action}
                                        key={action.id}
                                        onClickDetails={() =>
                                            history.push(
                                                `/action/details/${action.id}`
                                            )
                                        }
                                    />
                                ))}
                            </Fragment>
                        )}
                    </ActionContainer>
                )}
            </Content>
        </Container>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(NearlyExpiredActions));

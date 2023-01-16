import React, { Fragment, useEffect, useState } from "react";
import { FaInbox } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import { getPendingActions } from "../../../services/endpoints/actions";
import { ActionCard, WhiteHeaderBack } from "../../../components/atoms";
import { LoadingContainer } from "../../../components/molecules";
import {
    Container,
    Content,
    ActionContainerDescription,
    ActionContainer,
    IconContainer,
} from "./styles";
import { inject, observer } from "mobx-react";

const PostponedActions = ({ PermissionStore: { hasPermission } }) => {
    const history = useHistory();

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const { actions } = await getPendingActions({ statusId: 2 });

            setActions(actions);
            setLoading(false);
        };

        getData();
    }, []);

    return hasPermission(11) ? (
        <Fragment>
            <Container>
                <WhiteHeaderBack
                    title={"Aguardando postergação"}
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
                                                    `/postponed-actions/details/${action.id}`
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
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(PostponedActions));

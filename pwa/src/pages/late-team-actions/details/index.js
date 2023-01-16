import React, { Fragment, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { ActionDetails, WhiteHeaderBack } from "../../../components/atoms";
import { LoadingContainer } from "../../../components/molecules";
import { getActionDetails } from "../../../services/endpoints/actions";
import { Container, Content } from "./styles";
import { toast } from "react-toastify";

const LateTeamActionsDetails = ({ PermissionStore: { hasPermission }}) => {
    const history = useHistory();

    const { id } = useParams();

    const [actionDetails, setActionDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        setLoading(true);

        const action = await getActionDetails(id);
        
        if (action) {
            if (action?.status?.id && action.status.id === 4) {
                setActionDetails(action);
                setLoading(false);
            } else {
                toast.warning('Essa ação de melhoria não está em atraso.');
                history.goBack();
            }
        } else {
            history.goBack();
        }
    }, [id, history]);

    useEffect(() => {
        getData();
    }, [getData]);

    return hasPermission(14) ? (
        <Fragment>
            <WhiteHeaderBack
                title={"Detalhes da ação"}
                onBack={() => history.goBack()}
            />
            <Container>
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <ActionDetails action={actionDetails} showOptions={false} />
                    )}
                </Content>
            </Container>
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(LateTeamActionsDetails));

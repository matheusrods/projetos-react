import React, { Fragment, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import { ActionDetails, WhiteHeaderBack } from "../../../components/atoms";
import { LoadingContainer, ModalComplex } from "../../../components/molecules";
import { Container, Content, Footer, Button } from "./styles";
import { getActionDetails } from "../../../services/endpoints/actions";
import { toast } from "react-toastify";
import _ from "lodash";
import { FaExclamationTriangle } from "react-icons/fa";
import colors from "../../../styles/colors";

const WaitingAnalysisActionDetails = ({
    UserStore: { userId },
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    const { id } = useParams();

    const [actionDetails, setActionDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalWarning, setModalWarning] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);

        const action = await getActionDetails(id);

        if (!action) {
            history.push('/action-plan');
        } else if (action?.responsibilityMatrix && !action.responsibilityMatrix.includes(userId)) {
            toast.warning('O seu usuário não possuí permissão para acessar essa paginá');
            history.push('/action-plan');
        } else {
            setActionDetails(action);
            setLoading(false);
        }
    }, [history, id, userId]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Fragment>
            <WhiteHeaderBack
                title={"Detalhes da ação"}
                onBack={() => history.push('/action-plan')}
            />
            <Container>
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <ActionDetails action={actionDetails} showOptions={false} />
                    )}
                </Content>
                {!loading &&
                    <Footer>
                        <Button
                            onClick={() => {
                                if (
                                    actionDetails.implementationAnalysisRequired === true
                                    && actionDetails.implementation_analysis.valid !== true
                                    && actionDetails.status.id === 5
                                ) {
                                    history.push(
                                        `/waiting-analysis-actions/${id}/implementation`
                                    );
                                } else if (
                                    actionDetails.efficiencyAnalysisRequired === true
                                    && (actionDetails.status.id === 5 || actionDetails.status.id === 9)
                                    && _.isNull(actionDetails.effectiveness_analysis.valid)
                                ) {
                                    history.push(
                                        `/waiting-analysis-actions/${id}/efficiency`
                                    );
                                } else {
                                    setModalWarning(true)
                                }
                            }}
                        >
                            Analisar
                        </Button>
                    </Footer>
                }
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"Seu usuário não atende a todos os requisitos para fazer a análise"}
                nameModal={"modal-warning"}
                visible={modalWarning}
                onConfirm={() => setModalWarning(false)}
                icon={<FaExclamationTriangle size={40} color={colors.orange2} />}
                confirmButtonLabel={"Fechar"}
                uniqueFooterButton={true}
            />
        </Fragment>
    );
};

export default inject("UserStore", "PermissionStore")(
    observer(WaitingAnalysisActionDetails)
);

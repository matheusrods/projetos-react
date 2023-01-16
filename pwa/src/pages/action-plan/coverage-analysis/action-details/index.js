import React, { Fragment, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { ActionDetails, WhiteHeaderBack } from "../../../../components/atoms";
import { LoadingContainer, ModalComplex } from "../../../../components/molecules";
import { getActionDetails, getAssociationDetails, updateActionCoverage, updateAssociation } from "../../../../services/endpoints/actions";
import {
    Container,
    Content,
    Footer,
    TitleFooter,
    DescriptionFooter,
    InfoFooter,
    ContainerActions,
    Button,
} from "./styles";
import _ from "lodash";
import { toast } from "react-toastify";

const CoverageAnalysisActionDetails = ({
    UserStore: { userId },
    NewActionStore: { setNewActionData },
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    const { id, mainImprovementActionId } = useParams();

    const [actionDetails, setActionDetails] = useState({});
    const [associationDetails, setAssociationDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [updateActionLoading, setUpdateActionLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);

        const action = await getActionDetails(id);

        if (!action) {
            history.push('/action-plan/coverage-analysis');
        } else if (action?.responsibilityMatrix && !action.responsibilityMatrix.includes(userId)) {
            toast.warning('O seu usuário não possuí permissão para acessar essa paginá');
            history.push('/action-plan/coverage-analysis');
        } else {
            if (mainImprovementActionId && mainImprovementActionId >= 0) {
                const association = await getAssociationDetails(mainImprovementActionId);

                if (association && association?.relatedImprovementActionId && (parseInt(association.relatedImprovementActionId) === parseInt(id))) {
                    setAssociationDetails(association);
                }
            }

            setActionDetails(action);
            setLoading(false);
        }
    }, [history, id, mainImprovementActionId, userId]);

    useEffect(() => {
        getData();
    }, [getData]);

    return hasPermission(10) ? (
        <Fragment>
            <WhiteHeaderBack
                title={"Detalhes da ação"}
                onBack={() => history.goBack()}
            />
            <Container>
                <Content>
                    {(loading || updateActionLoading) ? (
                        <LoadingContainer />
                    ) : (
                        <ActionDetails action={actionDetails} showOptions={false} />
                    )}
                </Content>
                {((!loading && ((associationDetails?.id && _.isNull(associationDetails.isComprehensive)) || (_.isNull(actionDetails.isComprehensive) && !associationDetails?.id))) || updateActionLoading) &&
                    <Footer>
                        <InfoFooter>
                            <TitleFooter>Pertinência</TitleFooter>
                            <DescriptionFooter>
                                Você considera esta ação pertinente para sua área?
                            </DescriptionFooter>
                        </InfoFooter>
                        <ContainerActions>
                            <Button onClick={async () => {
                                setUpdateActionLoading(true);

                                if (mainImprovementActionId && mainImprovementActionId >= 0) {
                                    const response = await updateAssociation(mainImprovementActionId, false);

                                    if (response) {
                                        setAssociationDetails((state) => { return { ...state, isComprehensive: false } });
                                    }
                                } else {
                                    const response = await updateActionCoverage(id, false);

                                    if (response) {
                                        setActionDetails((state) => { return { ...state, isComprehensive: false } });
                                    }
                                }

                                setUpdateActionLoading(false);
                            }}>Não</Button>
                            <Button onClick={() => setModalVisible(true)}>
                                Sim
                            </Button>
                        </ContainerActions>
                    </Footer>
                }
            </Container>
            <ModalComplex
                title={"Novo registro"}
                description={"Ao prosseguir, você dará início ao processo de abertura de uma nova ação com base na atual. Tem certeza que deseja prosseguir?"}
                nameModal={"new-register"}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onConfirm={async () => {
                    if (mainImprovementActionId && mainImprovementActionId >= 0) {
                        const response = await updateAssociation(mainImprovementActionId, true);

                        if (response) {
                            setNewActionData({
                                associations: [
                                    {
                                        improvementActionId: id,
                                        typeRelationship: 2,
                                        originDescription: actionDetails?.origin?.description
                                    }
                                ],
                            });

                            history.push(`/new-action/type`);
                        } else {
                            setModalVisible(false);
                        }
                    } else {
                        setUpdateActionLoading(true);
                        setModalVisible(false);

                        const response = await updateActionCoverage(id, true);

                        if (response) {
                            setNewActionData({
                                associations: [
                                    {
                                        improvementActionId: id,
                                        typeRelationship: 2,
                                        originDescription: actionDetails?.origin?.description
                                    }
                                ],
                            });

                            history.push(`/new-action/type`);
                        } else {
                            setUpdateActionLoading(false);
                        }
                    }
                }}
                icon={<FaExclamationTriangle size={40} color={"#5CB3FF"} />}
                confirmButtonLabel={"Sim, prosseguir"}
                cancelButtonLabel={"Não, cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject('NewActionStore', 'UserStore', 'PermissionStore')(observer(CoverageAnalysisActionDetails));

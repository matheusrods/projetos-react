import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { WhiteHeaderBack } from '../../../../components/atoms';
import { LoadingContainer, ModalComplex } from '../../../../components/molecules';
import { getActionDetails, updateAssociation } from '../../../../services/endpoints/actions';
import PertinentCard from './pertinent-card';
import {
    Container,
    Content,
    RelatedActions,
    RelatedActionsList,
    TitleSection,
    DescriptionSection,
    ActionId,
    ActionLabel,
    Flex,
    CriticismDot,
    User,
    UserInfo,
    UserName,
    Date,
    Avatar,
} from './styles';
import { toast } from 'react-toastify';

const CoverageAnalysisDetourDetails = ({
    NewActionStore: { setNewActionData },
    UserStore: { userId },
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    const { id } = useParams();

    const [associationId, setAssociationId] = useState(null)
    const [actionDetails, setActionDetails] = useState({});
    const [updateActionLoading, setUpdateActionLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const action = await getActionDetails(id);

            if (!action) {
                history.push('/action-plan/coverage-analysis');
            } else if (action?.responsibilityMatrix && !action.responsibilityMatrix.includes(userId)) {
                toast.warning('O seu usuário não possuí permissão para acessar essa paginá');
                history.push('/action-plan/coverage-analysis');
            } else {
                setActionDetails(action);
                setLoading(false);
            }
        };

        getData();
    }, [history, id, userId]);

    return hasPermission(10) ? (
        <Fragment>
            <WhiteHeaderBack
                title={'Detalhes do desvio'}
                onBack={() => history.goBack()}
            />
            <Container>
                <Content>
                    {(loading || updateActionLoading) ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <ActionId>
                                Id ação
                                <span>#{actionDetails?.id}</span>
                            </ActionId>
                            <ActionLabel>
                                <span>Criticidade</span>
                                <Flex>
                                    <span>{actionDetails?.criticism?.description}</span>
                                    <CriticismDot color={actionDetails?.criticism?.color} />
                                </Flex>
                            </ActionLabel>
                            <ActionLabel>
                                <span>Descrição do desvio</span>
                                <p>{actionDetails?.deviationDescription}</p>
                            </ActionLabel>
                            <ActionLabel direction={'column'}>
                                <span>Local da ação</span>
                                <span>{actionDetails?.location?.fullAddress}</span>
                            </ActionLabel>
                            <User>
                                <Avatar>
                                    {actionDetails?.user?.avatar ? <img src={actionDetails.user.avatar} alt={'user'} /> : actionDetails?.user?.name ? actionDetails.user.name[0] : '-'}
                                </Avatar>
                                <UserInfo>
                                    <UserName>{actionDetails?.user?.name}</UserName>
                                    <Date>{actionDetails?.registrationDate}</Date>
                                </UserInfo>
                            </User>
                            {actionDetails?.relatedRecords && actionDetails.relatedRecords.length > 0 &&
                                <Fragment>
                                    <RelatedActions>
                                        <TitleSection>Ações relacionadas</TitleSection>
                                        <DescriptionSection>
                                            Ações relacionadas a este desvio
                                        </DescriptionSection>
                                    </RelatedActions>
                                    <RelatedActionsList>
                                        {actionDetails.relatedRecords.map((item, index) => {
                                            return (
                                                <PertinentCard
                                                    key={index.toString()}
                                                    item={item.completeAction}
                                                    isComprehensive={item.isComprehensive}
                                                    onConfirm={() => {
                                                        setAssociationId(item.id);
                                                        setModalVisible(true);
                                                    }}
                                                    onDeny={async () => {
                                                        setUpdateActionLoading(true);

                                                        const response = await updateAssociation(item.id, false);

                                                        if (response) {
                                                            const associationIndex = actionDetails.relatedRecords.findIndex(i => i.id === item.id);
                                                            const newActionDetails = actionDetails;

                                                            newActionDetails.relatedRecords[associationIndex].isComprehensive = false;

                                                            setActionDetails({ ...newActionDetails });
                                                            setAssociationId(null);
                                                        }

                                                        setUpdateActionLoading(false);
                                                    }}
                                                    onLink={() => {
                                                        history.push(`/action-plan/coverage-analysis/${item.completeAction.id}/action-details/${item.id}`);
                                                    }}
                                                />
                                            );
                                        })}
                                    </RelatedActionsList>
                                </Fragment>
                            }
                        </Fragment>
                    )}
                </Content>
            </Container>
            <ModalComplex
                title={'Novo registro'}
                description={'Ao prosseguir, você dará início ao processo de abertura de uma nova ação com base na atual. Tem certeza que deseja prosseguir?'}
                nameModal={'new-register'}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onConfirm={async () => {
                    setUpdateActionLoading(true);
                    setModalVisible(false);

                    const response = await updateAssociation(associationId, true);

                    if (response) {
                        const associationIndex = actionDetails.relatedRecords.findIndex(item => item.id === associationId);

                        setNewActionData({
                            associations: [
                                {
                                    improvementActionId: actionDetails?.relatedRecords[associationIndex]?.completeAction?.id,
                                    typeRelationship: 2,
                                    originDescription: actionDetails?.relatedRecords[associationIndex]?.completeAction?.origin?.description
                                }
                            ],
                        });

                        history.push(`/new-action/type`);
                    } else {
                        setUpdateActionLoading(false);
                    }
                }}
                icon={<FaExclamationTriangle size={40} color={'#5CB3FF'} />}
                confirmButtonLabel={'Sim, prosseguir'}
                cancelButtonLabel={'Não, cancelar'}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject('NewActionStore', 'UserStore', 'PermissionStore')(observer(CoverageAnalysisDetourDetails));

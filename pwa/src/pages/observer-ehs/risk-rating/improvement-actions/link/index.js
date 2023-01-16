import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { WhiteHeader } from '../../../../../components/atoms';
import { LoadingContainer } from '../../../../../components/molecules';
import { getActions } from '../../../../../services/endpoints/swt/actions';
import {
    ButtonMultiSelect,
    ConfirmCancelFooter,
    Header
} from '../../../../../components/organisms';
import colors from '../../../../../styles/colors';
import { Container, Content, PageInfo, PageDescription, Grid } from './styles';
import Uuid from 'react-uuid';

const RiskRatingImprovementActionsLink = ({ ClassificationStore }) => {
    const history = useHistory();
    const { setNewRegisterData, improvementActions } = ClassificationStore;

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    const filterSelectedActions = () => actions.filter((item) => item.selected);

    const handleLinkAction = () => {
        const selectedActions = filterSelectedActions();
        const newData = [];

        selectedActions.forEach((action) => {
            const link = {
                linkId: Uuid(),
                action: action,
                local: false
            };

            newData.push(link);
        });

        improvementActions.forEach((action) => {
            if (action.local) {
                newData.push(action);
            }
        });

        setNewRegisterData({
            improvementActions: newData
        });
        history.goBack();
    };

    useEffect(() => {
        async function getActionsUser() {
            const statusInProgress = { statusId: 3 };
            const response = await getActions(statusInProgress);

            improvementActions?.forEach(({ action }) => {
                const found = response.findIndex(
                    (item) => item.id === action.id
                );
                if (found >= 0) {
                    response[found].selected = true;
                }
            });

            setActions(response);
            setLoading(false);
        }

        getActionsUser();
    }, [improvementActions]);

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <WhiteHeader
                        title={'Vincular ação de melhoria'}
                        onClose={() => history.push('improvement-actions')}
                    />
                    <LoadingContainer />
                    <ConfirmCancelFooter
                        confirmButtonDisabled={true}
                        confirmButtonLabel={'Adicionar'}
                        cancelButtonLabel={'Cancelar'}
                        cancelButtonLabelColor={colors.gray6}
                        onCancel={() => history.goBack()}
                        onConfirm={() => history.goBack()}
                    />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Vincular ação de melhoria'}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <PageInfo>
                        <PageDescription>
                            Selecione uma ação de melhoria pré-existente para
                            vincular esta observação
                        </PageDescription>
                    </PageInfo>
                    <Grid>
                        <ButtonMultiSelect
                            pageTitle={'Vincular ação de melhoria'}
                            fieldName={'Buscar ação'}
                            category={'action'}
                            fieldsFilter={['id', 'origin.description']}
                            labelSearchInput={'Buscar ação'}
                            fieldUseTag={'id'}
                            prefixTag={'#'}
                            single={false}
                            items={actions}
                            selected={actions
                                .filter((item) => item.selected)
                                .map((item) => item.id)}
                            onSave={(items) => setActions([...items])}
                        />
                    </Grid>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={'Adicionar'}
                    cancelButtonLabel={'Cancelar'}
                    cancelButtonLabelColor={colors.gray6}
                    onCancel={() => history.goBack()}
                    onConfirm={() => handleLinkAction()}
                />
            </Container>
        </Fragment>
    );
};

export default inject('ClassificationStore')(
    observer(RiskRatingImprovementActionsLink)
);

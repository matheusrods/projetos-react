import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, useHistory } from 'react-router-dom';
import { WhiteHeader } from '../../../../../../components/atoms';
import { ButtonMultiSelect, ConfirmCancelFooter, Header } from '../../../../../../components/organisms';
import colors from '../../../../../../styles/colors';
import { Container, Content, PageInfo, PageDescription, Grid } from './styles';
import { getActions } from '../../../../../../services/endpoints/swt/actions';
import { LoadingContainer } from '../../../../../../components/molecules';

const ResponsibleDealtImprovementActionsLink = ({ Auditing }) => {
    const history = useHistory();

    const { unConformityRequirement = null, dealInEditing, addImprovementActionsInDealt } = Auditing;

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSubmit = () => {
        const actionsSelected = actions
            .filter(action => action.selected)
            .map(action => {
                delete action.selected;

                return {
                    ...action,
                    itsLink: true
                };
            });

        addImprovementActionsInDealt(actionsSelected);

        history.goBack();
    };

    useEffect(() => {
        async function getActionsUser() {
            const actionsLinked = dealInEditing.improvementActions
                .filter(action => action.itsLink)
                .map(action => action.id);

            const response = await getActions();

            setActions(response.filter(action => !actionsLinked.includes(action.id)));
            setLoading(false);
        }

        getActionsUser();
    }, [dealInEditing.improvementActions]);

    return unConformityRequirement ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Vincular ação de melhoria'}
                    onClose={history.goBack}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageDescription>
                                Selecione pelo menos uma ação de melhoria pré-existente
                                para vincular esta tratativa
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
                                items={actions}
                                onSave={(items) => setActions([...items])}
                            />
                        </Grid>
                    </Content>
                )}
                <ConfirmCancelFooter
                    confirmButtonLabel={'Adicionar'}
                    cancelButtonLabel={'Cancelar'}
                    cancelButtonLabelColor={colors.gray6}
                    onCancel={history.goBack}
                    onConfirm={handleSubmit}
                    confirmButtonDisabled={
                        loading
                        || actions.filter(action => action.selected).length === 0
                    }
                />
            </Container>
        </Fragment>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
};

export default inject('Auditing')(
    observer(ResponsibleDealtImprovementActionsLink)
);

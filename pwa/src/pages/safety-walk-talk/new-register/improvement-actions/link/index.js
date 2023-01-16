import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { WhiteHeader } from '../../../../../components/atoms';
import {
    ButtonMultiSelect,
    ConfirmCancelFooter,
    Header
} from '../../../../../components/organisms';
import colors from '../../../../../styles/colors';
import { Container, Content, PageInfo, PageDescription, Grid } from './styles';
import { getActions } from '../../../../../services/endpoints/swt/actions';
import { LoadingContainer } from '../../../../../components/molecules';
import Uuid from 'react-uuid';

const NewRegisterImprovementActionsLink = ({ NewRegisterSWT }) => {
    const {
        getQuestions,
        setNewRegisterData,
        linkActionToObservation,
        uuid
    } = NewRegisterSWT;

    const history = useHistory();

    const [actions, setActions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLink, setActionLink] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const questionsForm = getQuestions();

        setQuestions(questionsForm);
    }, [getQuestions]);

    useEffect(() => {
        async function getActionsUser() {
            const statusInProgress = { statusId: 3 };
            const response = await getActions(statusInProgress);

            setActions(response);
            setLoading(false);
        }

        getActionsUser();
    }, []);

    const getLinkActionFromStorageById = useCallback(() => {
        const newRegisterStore = localStorage.getItem(
            'safetyWalkTalk@newRegisterStore'
        );

        if (!newRegisterStore) {
            return [];
        }

        const newRegisterStoreParsed = JSON.parse(newRegisterStore);

        const {
            linkActionToObservation
        } = newRegisterStoreParsed.registers.find((item) => item.uuid === uuid);

        const linkAction = linkActionToObservation.find(
            (item) => item.linkId === id
        );

        return linkAction;
    }, [uuid, id]);

    useEffect(() => {
        const linkActionFound = getLinkActionFromStorageById();

        if (!loading) {
            const actionsWithSelected = actions.map((item) => {
                if (item.id === linkActionFound?.action?.id) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false };
            });

            const questionsWithSelected = questions.map((item) => {
                if (item.id === linkActionFound?.question?.id) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false };
            });

            setActions(actionsWithSelected);
            setQuestions(questionsWithSelected);
            setActionLink(linkActionFound);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getLinkActionFromStorageById, loading]);

    const handleLinkActionToQuestion = () => {
        const selectedAction = actions.find((item) => item.selected);
        const selectedQuestion = questions.find((item) => item.selected);

        delete selectedAction.selected;
        delete selectedQuestion.selected;

        if (id) {
            const newLink = {
                ...actionLink,
                action: selectedAction,
                question: selectedQuestion
            };

            const newLinkToObservation = linkActionToObservation.filter(
                (item) => item.linkId !== id
            );

            setNewRegisterData({
                linkActionToObservation: [
                    ...newLinkToObservation,
                    {
                        ...newLink
                    }
                ]
            });

            history.goBack();
        } else {
            const link = {
                linkId: Uuid(),
                action: selectedAction,
                question: selectedQuestion,
                local: false
            };

            setNewRegisterData({
                linkActionToObservation: [
                    ...linkActionToObservation,
                    {
                        ...link,
                        local: false
                    }
                ]
            });

            history.push('/safety-walk-talk/new-register/improvement-actions');
        }
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Vincular ação de melhoria'}
                    onClose={() => history.goBack()}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageDescription>
                                Selecione uma ação de melhoria pré-existente
                                para vincular esta observação
                            </PageDescription>
                        </PageInfo>
                        <Grid>
                            <ButtonMultiSelect
                                pageTitle={'Vincular ação de melhoria'}
                                fieldName={'Item observado'}
                                name={'select-item'}
                                category={'checkbox'}
                                fieldsFilter={['name']}
                                labelSearchInput={'Item observado'}
                                single={true}
                                items={questions}
                                selected={questions.find((item) => item.selected)?.id}
                                onSave={(items) => setQuestions([...items])}
                            />
                            <ButtonMultiSelect
                                pageTitle={'Vincular ação de melhoria'}
                                fieldName={'Buscar ação'}
                                category={'action'}
                                name={'select-action'}
                                fieldsFilter={['id', 'origin.description']}
                                labelSearchInput={'Buscar ação'}
                                fieldUseTag={'id'}
                                prefixTag={'#'}
                                single={true}
                                items={actions}
                                selected={actions.find((item) => item.selected)?.id}
                                onSave={(items) => setActions([...items])}
                            />
                        </Grid>
                    </Content>
                )}
                <ConfirmCancelFooter
                    confirmButtonLabel={id ? 'Salvar' : 'Adicionar'}
                    cancelButtonLabel={'Cancelar'}
                    cancelButtonLabelColor={colors.gray6}
                    onCancel={() => history.goBack()}
                    onConfirm={() => handleLinkActionToQuestion()}
                    confirmButtonDisabled={loading}
                />
            </Container>
        </Fragment>
    );
};

export default inject('NewRegisterSWT')(
    observer(NewRegisterImprovementActionsLink)
);

import React, {useEffect, useState} from 'react';
import {
    Container,
    PageTitle,
    PageDescription,
    ActionContainer, LinkButton
} from './styles';
import {inject, observer} from "mobx-react";
import {
    ActionContainerDescription,
    IconContainer
} from "../../../../safety-walk-talk/new-register/improvement-actions/styles";
import {FaInfo, FaLink} from "react-icons/fa";
import {ActionCard, AddButton, Loading} from "../../../../../components/atoms";
import LinkImprovementActions from "./link";
import colors from "../../../../../styles/colors";
import NewImprovementActions from "./new";


const ImprovementActions = ({
    InspectionQuestionsStore
}) => {
    const [actions, setActions] = useState([]);
    const [showLink, setShowLink] = useState(false);
    const [showNewForm, setShowNewForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        setLabelNextStep,
        linkQuestionToAction,
        inspection,
        getInspectionById,
        saveImprovementAction,
        setNextAction,
        updateInspectionWithoutAction,
        setStep
    } = InspectionQuestionsStore;

    const linkImprovementActionToQuestion = async (questionId, actionId) => {
        setLoading(true);
        setShowLink(false);
        await linkQuestionToAction(questionId, actionId);
        await getInspectionById(inspection.id);
        setLoading(false);
    };

    const reloadImprovementActions = async () => {
        setLoading(true);
        await getInspectionById(inspection.id);
        setLoading(false);
    };
    const saveFormAndLinkToQuestion = async (questionId, form) => {
        setLoading(true);
        setShowNewForm(false);
        const actionId = await saveImprovementAction(form);
        await linkQuestionToAction(questionId, actionId);
        await getInspectionById(inspection.id);
        setLoading(false);
    };

    const handleFinishAction = async () => {
        setLoading(true);
        const dataSave = {
            codigo: inspection.id,
            codigo_status_inspecao: 3
        };
        await updateInspectionWithoutAction(dataSave);
        setStep('finish');
    };


    useEffect(() => {
        setLabelNextStep('Finalizar');
        setNextAction(() => handleFinishAction());
    }, [setLabelNextStep, setNextAction, handleFinishAction]);

    useEffect(() => {
        setActions([]);
        inspection.actions.map(action => {
            setActions(actions => [...actions, action]);
        });
    }, [inspection]);
    return (
        <Container>
            <PageTitle>Ações</PageTitle>
            <PageDescription>Informe as ações que voê elaborou para os processos de inspeção</PageDescription>

            <ActionContainer noActions={actions.length === 0}>
                {actions.length === 0 ?(
                    <>
                        <IconContainer>
                            <FaInfo size={38} />
                        </IconContainer>
                        <ActionContainerDescription>
                            Você ainda não adicionou nenhuma ação de
                            melhoria.
                        </ActionContainerDescription>
                        <ActionContainerDescription>
                            Clique em "+" para cadastrar uma nova ação
                            ou em ”Link” para vincular uma ação
                            pré-existente
                        </ActionContainerDescription>
                    </>
                ) : (
                    <>
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                {actions.map((action, index) => (
                                    <ActionCard
                                        notDetailsButton={true}
                                        backgroundColor={colors.gray1}
                                        action={action}
                                        key={`${action.id}-${index}`}
                                    />
                                ))}
                            </>
                        )}

                    </>
                )}
            </ActionContainer>

            <LinkButton
                onClick={() => setShowLink(true)}
            >
                <FaLink size={21} color={'#fff'} />
            </LinkButton>
            <AddButton
                position={'absolute'}
                bottom={56}
                onClick={() => setShowNewForm(true)}
            />

            <LinkImprovementActions
                visible={showLink}
                onClose={() => setShowLink(false)}
                onConfirm={(questionId, actionId) => linkImprovementActionToQuestion(questionId, actionId)}
            />

            <NewImprovementActions
                visible={showNewForm}
                onClose={() => setShowNewForm(false)}
                onConfirm={() => {
                    setShowNewForm(false);
                    reloadImprovementActions();
                }}
            />
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(ImprovementActions));

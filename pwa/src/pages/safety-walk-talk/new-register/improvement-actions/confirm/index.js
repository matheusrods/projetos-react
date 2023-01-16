import React, { Fragment, useEffect, useState } from 'react';
import colors from '../../../../../styles/colors';
import {
    FaPlusCircle,
    FaTrashAlt,
    FaExclamationTriangle
} from 'react-icons/fa';
import { inject, observer } from 'mobx-react';
import { isEmpty } from '../../../../../utils/helpers';
import { useHistory } from 'react-router';
import { Header } from '../../../../../components/organisms';
import {
    Accordion,
    ActionCard,
    CompanyHeader,
    NextButton,
    ObservedItemCard
} from '../../../../../components/atoms';
import {
    WalkTalkHeader,
    WalkTalkTitle,
    WalkTalkLabel,
    Container,
    Section,
    PageInfo,
    PageTitle,
    PageDescription,
    Content,
    AddActionSection
} from './styles';
import {
    ModalActions,
    ModalComplex,
    LoadingContainer
} from '../../../../../components/molecules';
import { createSwt } from '../../../../../services/endpoints/swt/safety-walk-talk';

function NewRegisterImprovementActionsConfirm({
    NewRegisterSWT,
    SessionStore,
    UserStore: { user }
}) {
    const [loading, setLoading] = useState(false);
    const [modalActionVisible, setModalActionVisible] = useState(false);
    const [modalObserverVisible, setModalObserverVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [topics, setTopics] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalExitPage, setModalExitPage] = useState(false);
    const history = useHistory();

    const {
        uuid,
        observer,
        registrationLocation,
        summary,
        linkActionToObservation,
        form,
        answers,
        setNewRegisterData
    } = NewRegisterSWT;

    const { clientId } = user;

    const labelAnswerByRadioValue = (valueRadio) => {
        switch (valueRadio) {
            case 0:
                return 'Não';

            case 1:
                return 'Sim';

            case 3:
                return 'Não se aplica';

            default:
                return 'Não se aplica';
        }
    };

    const handleDeleteAction = () => {
        const newLinkToObservation = linkActionToObservation.filter(
            (local) => local.linkId !== selectedItem.linkId
        );

        setNewRegisterData({
            linkActionToObservation: [...newLinkToObservation]
        });

        setAlertModalVisible(false);
    };

    const handleConfirmDeleteDialog = () => {
        setModalActionVisible(false);
        setAlertModalVisible(true);
    };

    const SwtPostFactory = (store) => {
        return {
            codigo_usuario: store?.observer?.id,
            form_codigo: store?.form?.id,
            form_tipo: 1,
            compromissos: store?.commitments,
            codigo_form_respondido_swt: '',
            resumo: {
                data_obs: store?.summary?.dateObservation
                    ?.split('-')
                    ?.reverse()
                    ?.join('/'),
                hora_obs: store?.summary?.timeObservation,
                desc_atividade: store?.summary?.operation,
                codigo_cliente_localidade: clientId,
                codigo_pos_local: Number(store?.summary?.location),
                descricao: store?.summary?.description,
                codigo_cliente_bu:
                    registrationLocation?.businessUnit?.id ?? null,
                codigo_cliente_opco: registrationLocation?.opco?.id ?? null
            },
            participantes: [
                {
                    codigo_usuario: store?.observer?.id
                },
                ...store?.participants?.map((participant) => ({
                    codigo_usuario: participant?.id
                }))
            ],
            facilitador: [
                {
                    codigo_usuario: store?.facilitator?.id
                }
            ],
            respostas: topics?.map((topic) => ({
                codigo_titulo: topic?.id,
                questao: topic?.questions?.map((question) => ({
                    codigo: question?.id,
                    resposta: question?.answer?.radioButton,
                    criticidade: question?.criticismId,
                    motivo: question?.answer?.reason
                }))
            })),
            vinculo_acao: store?.linkActionToObservation
                ?.filter((link) => !link?.local)
                ?.map((link) => ({
                    codigo: link?.action?.id,
                    codigo_form_questao: link?.question?.id
                })),
            acao_melhoria: store?.linkActionToObservation
                ?.filter((link) => link?.local)
                ?.map((link) => ({
                    codigo_form_questao: link?.question?.id,
                    codigo_origem_ferramenta: link?.action?.origin?.id,
                    codigo_cliente_observacao: link?.action?.location?.id,
                    codigo_usuario_identificador: link?.action?.user?.id,
                    codigo_usuario_responsavel: link?.action?.responsible?.id,
                    codigo_pos_criticidade: link?.action?.criticism?.id,
                    codigo_acoes_melhorias_tipo: link?.action?.type?.id,
                    codigo_acoes_melhorias_status: link?.action?.status?.id,
                    descricao_desvio: link?.formData?.deviation,
                    descricao_acao: link?.formData?.action,
                    descricao_local_acao: link?.formData.location,
                    prazo: link?.formData?.completion_time,
                    formulario_resposta: '[{}]',
                    codigo_cliente_bu:
                        registrationLocation?.businessUnit?.id ?? null,
                    codigo_cliente_opco: registrationLocation?.opco?.id ?? null
                }))
        };
    };

    const handleSubmitSwt = async () => {
        setLoading(true);
        const dataToPost = SwtPostFactory(NewRegisterSWT);
        const response = await createSwt(dataToPost);

        if (isEmpty(response)) {
            setLoading(false);
            return;
        }

        const store = SessionStore.getSession(
            'safetyWalkTalk@newRegisterStore'
        );

        const filteredRegisters = store.registers.filter(
            (register) => register?.uuid !== uuid
        );

        SessionStore.saveSession('safetyWalkTalk@newRegisterStore', {
            registers: [...filteredRegisters]
        });

        history.push(
            '/safety-walk-talk/new-register/perception-index',
            response
        );
    };

    useEffect(() => {
        if (isEmpty(form) || isEmpty(answers)) {
            return;
        }

        const formTopics = form.topics.map((topic) => {
            const questionWithAnswer = topic.questions.map(
                (question, index) => {
                    const answer = answers[topic.id][question.id];
                    const controlled = labelAnswerByRadioValue(
                        answer?.radioButton
                    );
                    const shouldRenderCriticism = answer?.radioButton === 0;
                    const criticism = question.criticalityLevels.find(
                        (critLevel) =>
                            answer.criticality >= critLevel.startValue &&
                            answer.criticality <= critLevel.endValue
                    );
                    return {
                        ...question,
                        answer: {
                            ...answer,
                            id: Number(Object.keys(answers[topic.id])[index])
                        },
                        criticism: criticism?.description,
                        criticismId: criticism?.id,
                        color: `#${criticism?.color}`,
                        controlled,
                        shouldRenderCriticism
                    };
                }
            );

            return { ...topic, questions: questionWithAnswer };
        });

        setTopics(formTopics);
    }, [form, answers]);

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        typeAction={'EHS Walk & Talk'}
                        onClose={() => setModalExitPage(true)}
                    />
                    <LoadingContainer />
                    <NextButton
                        nextDisabled={true}
                        positionRelative={true}
                        onBack={() => history.goBack()}
                        onNext={() => handleSubmitSwt()}
                        nextLabel={'Finalizar'}
                    />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <Section>
                        <PageInfo>
                            <PageTitle>Confira sua observação</PageTitle>
                            <PageDescription>
                                Revise os dados e se certifique que está tudo
                                certo antes de registrar a observação
                            </PageDescription>
                        </PageInfo>
                        <WalkTalkHeader>
                            <WalkTalkTitle>
                                Walk & Talk #
                                {uuid?.split('-')[0] ?? 'Não informado'}
                            </WalkTalkTitle>
                        </WalkTalkHeader>
                        <WalkTalkLabel direction={'column'}>
                            <span>Observador</span>
                            <span>{observer?.name ?? 'Não informado'}</span>
                        </WalkTalkLabel>
                        <WalkTalkLabel direction={'column'}>
                            <span>Local da Observação</span>
                            <span>
                                {registrationLocation?.location?.fullAddress ??
                                    'Não informado'}
                            </span>
                        </WalkTalkLabel>
                        <WalkTalkLabel direction={'column'}>
                            <span>Data e hora</span>
                            <span>
                                {`${summary?.dateObservation
                                    .split('-')
                                    .reverse()
                                    .join('/') ?? 'Não informado'
                                    } ${summary?.timeObservation}` ??
                                    'Não informado'}
                            </span>
                        </WalkTalkLabel>
                        <WalkTalkLabel direction={'column'}>
                            <span>Descrição</span>
                            <span>
                                {summary?.description ?? 'Não informado'}
                            </span>
                        </WalkTalkLabel>
                    </Section>
                    <Section>
                        <WalkTalkHeader>
                            <WalkTalkTitle>Itens observados</WalkTalkTitle>
                        </WalkTalkHeader>
                        {topics.map((topic, topicIndex) => (
                            <Accordion
                                key={topicIndex}
                                label={topic?.title ?? 'Não informado'}
                            >
                                {topic.questions.map(
                                    (question, questionIndex) => (
                                        <ObservedItemCard
                                            key={questionIndex}
                                            title={
                                                question?.title ??
                                                'Não informado'
                                            }
                                            controlled={question?.controlled}
                                            criticism={
                                                question?.shouldRenderCriticism
                                                    ? question?.criticism
                                                    : null
                                            }
                                            criticismColor={
                                                question?.color ?? '#FF7843;'
                                            }
                                            description={
                                                question?.answer?.reason
                                                    .length > 1 &&
                                                    question?.answer
                                                        ?.radioButton !== 3
                                                    ? question.answer.reason
                                                    : null
                                            }
                                            showOptions={true}
                                            onClickOptions={() => {
                                                setSelectedItem({
                                                    ...question,
                                                    editUrl: `/safety-walk-talk/new-register/dynamic-form/${topic.id}/question/${question.id}`
                                                });
                                                setModalObserverVisible(true);
                                            }}
                                        />
                                    )
                                )}
                            </Accordion>
                        ))}
                    </Section>
                    {linkActionToObservation.length > 9 &&
                        <Section>
                            <WalkTalkHeader>
                                <WalkTalkTitle>Ações de melhoria</WalkTalkTitle>
                            </WalkTalkHeader>
                            {linkActionToObservation.map((link, linkId) => (
                                <Accordion
                                    key={linkId}
                                    label={link?.question?.name}
                                >
                                    <ActionCard
                                        action={link?.action}
                                        showOptions={true}
                                        onClickOptions={() => {
                                            let editUrl;

                                            if (link?.local) {
                                                editUrl = `/safety-walk-talk/new-register/improvement-actions/include-action/${link.linkId}`;
                                            } else {
                                                editUrl = `/safety-walk-talk/new-register/improvement-actions/link/${link.linkId}`;
                                            }

                                            setSelectedItem({ ...link, editUrl });
                                            setModalActionVisible(true);
                                        }}
                                        backgroundColor={colors.gray1}
                                        DetailsButtonLabel={
                                            'Abrir no plano de ação'
                                        }
                                    />
                                </Accordion>
                            ))}
                        </Section>
                    }
                    <AddActionSection
                        onClick={() => history.push('include-action')}
                    >
                        Adicionar ação
                        <FaPlusCircle size={16} />
                    </AddActionSection>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => history.goBack()}
                    onNext={() => handleSubmitSwt()}
                    nextLabel={'Finalizar'}
                />
            </Container>
            <ModalActions
                title={'Item observado'}
                nameModal={'modal-observer'}
                visible={modalObserverVisible}
                onClose={() => setModalObserverVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () => history.push(selectedItem?.editUrl)
                    }
                ]}
            />
            <ModalActions
                title={'Ação de melhoria'}
                nameModal={'modal-action'}
                visible={modalActionVisible}
                onClose={() => setModalActionVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () => history.push(selectedItem.editUrl)
                    },
                    {
                        label: 'Excluir item',
                        color: colors.redAux,
                        icon: 'FaTrashAlt',
                        onPress: () => handleConfirmDeleteDialog()
                    }
                ]}
            />
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => handleDeleteAction()}
                icon={<FaTrashAlt size={40} color={colors.redAux} />}
                title={'Atenção'}
                description={`Ao prosseguir, a ação de melhoria #${selectedItem?.local
                    ? selectedItem?.action?.uuid?.split('-')[0]
                    : selectedItem?.action?.id
                    } será excluída. Deseja excluir?`}
                confirmButtonLabel={'Sim, excluir'}
                cancelButtonLabel={'Não, cancelar'}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/safety-walk-talk/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
}

export default inject(
    'NewRegisterSWT',
    'SessionStore',
    'UserStore'
)(observer(NewRegisterImprovementActionsConfirm));

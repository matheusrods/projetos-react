import React, { Fragment, useState, useEffect } from 'react';
import { FaPen, FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
    LoadingContainer,
    ModalActions,
    ModalComplex
} from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import colors from '../../../../styles/colors';
import { isEmpty, sleep } from '../../../../utils/helpers';
import { createClassification } from '../../../../services/endpoints/observer/classification';
import {
    ActionCard,
    CompanyHeader,
    NextButton,
    StarRating
} from '../../../../components/atoms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    Wrapper,
    PageDescription,
    Section,
    Label,
    Value,
    SectionSubTitle,
    SectionSub,
    WrapperTitle,
    Photo,
    ListPhotos,
    RatingDot,
    CardContent,
    CardHeader,
    Grid,
    CardContainer,
    CardTitle,
    Column
} from './styles';
import moment from '../../../../config/moment';
import { toast } from 'react-toastify';

const RiskRatingCheckObservation = ({ ClassificationStore, UserStore }) => {
    const {
        observation,
        quality,
        improvementActions,
        criticism,
        setNewRegisterData,
        reset
    } = ClassificationStore;

    const { user } = UserStore;

    const history = useHistory();

    const [modalExitPage, setModalExitPage] = useState(false);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [currentElementId, setCurrentElementId] = useState('');
    const [currentElement, setCurrentElement] = useState(null);
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);

    const classificationPostFactory = () => {
        return {
            codigo_observacao: Number(observation?.id),
            acoes_melhoria_vinculo: improvementActions
                ?.filter((item) => !item.local)
                .map((item) => ({ codigo: item?.action?.id })),
            acoes_melhoria_registro: improvementActions
                ?.filter((item) => item.local)
                ?.map((item) => ({
                    codigo_origem_ferramenta: item?.action?.origin?.id,
                    codigo_cliente_observacao: user?.clientId,
                    codigo_usuario_identificador: user?.id,
                    codigo_usuario_responsavel: item?.action?.responsible?.id,
                    codigo_pos_criticidade: item?.action?.criticism?.id,
                    codigo_acoes_melhorias_tipo: item?.action?.type?.id,
                    codigo_acoes_melhorias_status: item?.action?.status?.id,
                    descricao_desvio: item?.formData?.deviation,
                    descricao_acao: item?.formData?.action,
                    descricao_local_acao: item?.formData?.location,
                    prazo: item?.action?.deadline
                        ? moment(item?.action?.deadline, 'DD/MM/YYYY').format(
                            'YYYY-MM-DD'
                        )
                        : null,
                    formulario_resposta: JSON.stringify({
                        codigo_observacao: {
                            fieldName: 'ID da observa????o',
                            id: Number(observation?.id),
                            selected: true
                        }
                    }),
                    codigo_cliente_bu: observation?.businessUnit,
                    codigo_cliente_opco: observation?.opco
                })),
            criticidade: Number(criticism?.level?.id),
            avaliacao: Number(quality?.rating),
            descricao_complemento: quality?.complementary,
            descricao_participantes_tratativa: quality?.participants
        };
    };

    const handleSubmitClassification = async () => {
        setLoading(true);

        const dataToPost = classificationPostFactory();

        const response = await createClassification(dataToPost);

        if (isEmpty(response)) {
            setLoading(false);
            return;
        }

        history.push('complete', response);
        reset();
    };

    const handleDeleteAction = (id) => {
        const funnel = improvementActions.filter((item) => item.linkId !== id);

        setNewRegisterData({ improvementActions: [...funnel] });
        setLinks(funnel);
        setAlertModalVisible(false);
    };

    const handleConfirmDeleteDialog = () => {
        setModalActionsVisible(false);
        setAlertModalVisible(true);
    };

    useEffect(() => {
        const grabIdFromUrl = () => {
            const splitted = history.location.pathname.split('/');
            return Number(splitted[3]);
        };
        if (isEmpty(quality)) {
            toast.warn(
                'Perdemos alguns dados. Voc?? ser?? redirecionado em alguns segundos'
            );
            sleep(3000).then(() =>
                history.push(`/observer-ehs/risk-rating/${grabIdFromUrl()}`)
            );
        }
    }, [quality, history]);

    useEffect(() => {
        setLinks(improvementActions);
    }, [improvementActions]);

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        typeAction={'Classifica????o de risco EHS'}
                        onClose={() => setModalExitPage(true)}
                    />
                    <LoadingContainer />
                    <NextButton
                        positionRelative={true}
                        onBack={() => history.goBack()}
                        nextDisabled={true}
                        nextLabel={'Concluir'}
                    />
                </Container>
                <ModalComplex
                    title={'Aten????o'}
                    description={
                        'Ao sair, voc?? perdera os dados at?? aqui. Tem certeza que deseja sair?'
                    }
                    nameModal={'exit-page'}
                    visible={modalExitPage}
                    onCancel={() => setModalExitPage(false)}
                    onConfirm={() => history.push('/observer-ehs/')}
                    icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                    confirmButtonLabel={'Sair'}
                    cancelButtonLabel={'Cancelar'}
                />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Classifica????o de risco EHS'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Confira sua classifica????o</PageTitle>
                    </PageInfo>
                    <PageDescription>
                        Revise os dados e se certifique que est?? tudo certo
                        antes de registrar a observa????o
                    </PageDescription>
                    <Wrapper>
                        <Grid>
                            <CardContainer>
                                <CardHeader>
                                    <CardTitle>Classifica????o</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Label>
                                        N??vel de criticidade
                                        <FaPen
                                            color={colors.gray5}
                                            size={14}
                                            onClick={() =>
                                                history.push('criticism', {
                                                    isEditing: true
                                                })
                                            }
                                        />
                                    </Label>
                                    <RatingDot
                                        color={criticism?.level?.color}
                                    />
                                    <Value>
                                        {criticism?.level?.name ??
                                            'N??o informado'}
                                    </Value>
                                </CardContent>
                            </CardContainer>

                            <CardContainer>
                                <CardTitle>A????es de melhoria</CardTitle>
                                {links?.map((link) => (
                                    <ActionCard
                                        action={link?.action}
                                        key={link?.linkId}
                                        showOptions={true}
                                        showStatusInline={true}
                                        onClickOptions={() => {
                                            setModalActionsVisible(true);
                                            setCurrentElementId(link.linkId);
                                            setCurrentElement(link);
                                        }}
                                        onClickDetails={false}
                                    />
                                ))}
                            </CardContainer>

                            <CardContainer>
                                <CardTitle>Avalia????o da observa????o</CardTitle>
                                <CardContent>
                                    <Label>Tipo de Observa????o</Label>
                                    <StarRating
                                        selectedStars={quality?.rating}
                                        label={''}
                                        starSize={20}
                                    />
                                </CardContent>
                                <CardContent>
                                    <Label>Complemento da avalia????o</Label>
                                    <Value>
                                        {quality?.complementary?.length > 1
                                            ? quality?.complementary
                                            : 'N??o informado'}
                                    </Value>
                                </CardContent>
                                <CardContent>
                                    <Label>
                                        Pessoas participantes da tratativa
                                    </Label>
                                    <Value>
                                        {quality?.participants?.length > 1
                                            ? quality?.participants
                                            : 'N??o informado'}
                                    </Value>
                                </CardContent>
                            </CardContainer>
                        </Grid>

                        <WrapperTitle>
                            Observa????o #{observation?.id}
                        </WrapperTitle>
                        <Section>
                            <Label>Tipo de Observa????o</Label>
                            <Value>
                                {observation?.observationType ??
                                    'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>Observador</Label>
                            <Value>
                                {observation?.observer?.name ?? 'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>Local da Observa????o</Label>
                            <Value>
                                {observation?.observationLocation ??
                                    'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>Data e hora</Label>
                            <Value>
                                {observation?.date ?? 'N??o informado'}{' '}
                                {observation?.hour ?? ''}
                            </Value>
                        </Section>
                        <Section>
                            <Label>Descri????o</Label>
                            <Value>
                                {observation?.description ?? 'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>O que eu observei?</Label>
                            <Value>
                                {observation?.whatWasObserved ??
                                    'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>O que eu fiz a respeito?</Label>
                            <Value>
                                {observation?.whatWasDone ?? 'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>A????o complementar sugerida:</Label>
                            <Value>
                                {observation?.whatWasSuggested ??
                                    'N??o informado'}
                            </Value>
                        </Section>
                        <Section>
                            <Label>Fotos da observa????o</Label>
                            <ListPhotos>
                                {observation?.attachments?.length > 0 ? (
                                    observation?.attachments?.map(
                                        (item, index) => (
                                            <Photo
                                                key={index}
                                                onClick={() => {
                                                    history.push(
                                                        `/observer-ehs/${item.code}/view-photo`,
                                                        {
                                                            photo: {
                                                                url: item.file
                                                            }
                                                        }
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={item?.file}
                                                    alt="Imagem da observa????o"
                                                />
                                            </Photo>
                                        )
                                    )
                                ) : (
                                    <Value>Nenhuma foto foi inserida</Value>
                                )}
                            </ListPhotos>
                        </Section>
                        <Section>
                            <Column>
                                <Label>Riscos e impactos</Label>
                                {observation?.risksAndImpacts?.length > 0 ? (
                                    observation?.risksAndImpacts?.map(
                                        (item, index) => (
                                            <SectionSub key={index}>
                                                <SectionSubTitle>
                                                    {item?.riskImpactDescription ??
                                                        'N??o informado'}
                                                </SectionSubTitle>
                                                <Value>
                                                    {item?.dangerAspectsDescription ??
                                                        'N??o informado'}
                                                </Value>
                                            </SectionSub>
                                        )
                                    )
                                ) : (
                                    <Value>N??o informado</Value>
                                )}
                            </Column>
                        </Section>
                    </Wrapper>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => history.goBack()}
                    onNext={() => handleSubmitClassification()}
                    nextLabel={'Concluir'}
                />
            </Container>
            <ModalActions
                title={'A????o de melhoria'}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () => {
                            const action = links.find(
                                (item) => item.linkId === currentElementId
                            );
                            action.local
                                ? history.push(
                                    `/observer-ehs/risk-rating/${observation?.id}/improvement-actions/include-action/${currentElementId}`
                                )
                                : history.push(
                                    `/observer-ehs/risk-rating/${observation?.id}/improvement-actions/link/${currentElementId}`
                                );
                        }
                    },
                    {
                        label: 'Excluir item',
                        icon: 'FaTrashAlt',
                        color: '#FF5C69',
                        onPress: () => handleConfirmDeleteDialog()
                    }
                ]}
            />
            <ModalComplex
                title={'Aten????o'}
                description={`Ao prosseguir, a a????o de melhoria #${currentElement?.local
                        ? currentElement?.action?.uuid?.split('-')[0]
                        : currentElement?.action?.id
                    } ser?? exclu??da. Deseja excluir?`}
                nameModal={'confirm-cancellation '}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => handleDeleteAction(currentElementId)}
                icon={<FaTrashAlt size={40} color={colors.redAux} />}
                confirmButtonLabel={'Sim, excluir'}
                cancelButtonLabel={'N??o, cancelar'}
            />
            <ModalComplex
                title={'Aten????o'}
                description={
                    'Ao sair, voc?? perdera os dados at?? aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => {
                    reset();
                    history.push('/observer-ehs');
                }}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject(
    'ClassificationStore',
    'UserStore'
)(observer(RiskRatingCheckObservation));

import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FaCheck, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    AddButton,
    CompanyHeader,
    NextButton,
    RiskImpactCard
} from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalActions,
    ModalComplex
} from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import colors from '../../../../styles/colors';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    Wrapper,
    PageDescription,
    WrapperDescription,
    WrapperContainer,
    CardsWrapper
} from './styles';
import { updateObservation } from '../../../../services/endpoints/observer/observations';
import { getObserverDetails } from '../../../../services/endpoints/observer/details';
import { sleep } from '../../../../utils/helpers';

const NewRegisterRiskImpact = ({ NewRegisterObserver }) => {
    const { riskAgents, removeRiskAgent, setNewRegisterData } =
        NewRegisterObserver;

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [riskAgentId, setRiskAgentId] = useState(null);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState(false);

    const {
        isEditingFromCheckObservation = false,
        isEditingFromRiskRating = false,
        observation = {}
    } = history.location.state ?? {};

    const handleUpdate = async () => {
        setLoading(true);

        try {
            await updateObservation(observation);

            const [detailsResponse] = await getObserverDetails(observation?.id);

            setLoading(false);

            return history.push(
                `/observer-ehs/risk-rating/${observation?.id}/edit`,
                detailsResponse
            );
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setModalActionsVisible(false);
        setLoading(true);

        const filteredData = observation?.risksAndImpacts.filter(
            (item) => item?.riskClientCode !== riskAgentId
        );
        observation.risksAndImpacts = filteredData;

        sleep(700).then(() => setLoading(false));

        return;
    };

    const render = () => {
        let elements = [];

        riskAgents.forEach((item, index) =>
            elements.push(
                <RiskImpactCard
                    key={index}
                    title={item.dangerAspectType.name}
                    dangersAspects={[item.dangerAspect.name]}
                    risksImpacts={[item.riskImpact.name]}
                    icon={item.dangerAspectType.icon}
                    borderColor={item.dangerAspectType.color}
                    typeRiskImpactCode={item.riskImpact.riskImpactType}
                    onClickEdit={() => {
                        setRiskAgentId(item.id);
                        setModalActionsVisible(true);
                    }}
                />
            )
        );

        if (isEditingFromRiskRating) {
            observation?.risksAndImpacts.forEach((item, index) =>
                elements.push(
                    <RiskImpactCard
                        key={index}
                        title={item?.riskDescription}
                        dangersAspects={[item?.dangerAspectsDescription]}
                        risksImpacts={[item?.riskImpactDescription]}
                        icon={item?.riskTypeIcon}
                        borderColor={item?.riskTypeColor}
                        typeRiskImpactCode={item?.riskImpactCode}
                        onClickEdit={() => {
                            setRiskAgentId(item?.riskClientCode);
                            setModalActionsVisible(true);
                        }}
                    />
                )
            );
        }
        return elements;
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Observador EHS'}
                    onClose={() => {
                        isEditingFromRiskRating
                            ? history.goBack()
                            : setModalExitPage(true);
                    }}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <PageInfo>
                                <PageTitle>Riscos e impactos</PageTitle>
                            </PageInfo>
                            <PageDescription>
                                Selecione quais RISCOS/IMPACTOS estão
                                relacionados à sua observação
                            </PageDescription>
                            <Wrapper>
                                {!riskAgents.length &&
                                !observation?.risksAndImpacts?.length ? (
                                    <>
                                        <WrapperContainer>
                                            <FaInfoCircle
                                                color={colors.grayBorder}
                                                size={64}
                                            />
                                            <WrapperDescription>
                                                <span>
                                                    Você ainda não informou
                                                    nenhum Agente de Risco ou
                                                    Impacto.
                                                </span>
                                                <span>
                                                    Clique no botão "+" para
                                                    iniciar os cadastros.
                                                </span>
                                            </WrapperDescription>
                                        </WrapperContainer>
                                    </>
                                ) : (
                                    <>
                                        <CardsWrapper>{render()}</CardsWrapper>
                                    </>
                                )}
                            </Wrapper>
                            <AddButton
                                position={'absolute'}
                                bottom={56}
                                onClick={() =>
                                    history.push(
                                        '/observer-ehs/new-register/risk-impact/include-risk-impact',
                                        {
                                            isEditingFromRiskRating,
                                            observation
                                        }
                                    )
                                }
                            />
                        </>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        if (isEditingFromRiskRating) {
                            return history.goBack();
                        }

                        if (
                            isEditingFromCheckObservation &&
                            riskAgents.length > 0
                        ) {
                            history.goBack();
                        } else {
                            setNewRegisterData({
                                currentStep:
                                    '/observer-ehs/new-register/pictures'
                            });

                            history.push('pictures');
                        }
                    }}
                    nextDisabled={
                        (!riskAgents.length &&
                            !observation?.risksAndImpacts?.length) ||
                        loading
                    }
                    onNext={() => {
                        if (isEditingFromRiskRating) {
                            return handleUpdate();
                        }

                        setNewRegisterData({
                            currentStep:
                                '/observer-ehs/new-register/check-observation'
                        });

                        history.push('check-observation');
                    }}
                    nextLabel={
                        isEditingFromCheckObservation || isEditingFromRiskRating
                            ? 'Concluir'
                            : 'Avançar'
                    }
                    icon={
                        isEditingFromCheckObservation ||
                        isEditingFromRiskRating ? (
                            <FaCheck />
                        ) : undefined
                    }
                />
            </Container>
            <ModalActions
                title={'Riscos e impactos '}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => {
                    setRiskAgentId(null);
                    setModalActionsVisible(false);
                }}
                options={[
                    {
                        label: 'Editar item',
                        disabled: isEditingFromRiskRating,
                        onPress: () => {
                            history.push(
                                `/observer-ehs/new-register/risk-impact/include-risk-impact/${riskAgentId}`,
                                {
                                    isEditingFromCheckObservation,
                                    isEditingFromRiskRating,
                                    observation
                                }
                            );
                        }
                    },
                    {
                        label: 'Excluir item',
                        onPress: () => {
                            if (isEditingFromRiskRating) {
                                return handleDelete();
                            }

                            if (riskAgentId) {
                                removeRiskAgent(riskAgentId);
                                setRiskAgentId(null);
                                setModalActionsVisible(false);
                            }
                        },
                        icon: 'FaTrashAlt',
                        color: '#FF5C69'
                    }
                ]}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, você perdera os dados dessa tela. Tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
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
};

export default inject('NewRegisterObserver')(observer(NewRegisterRiskImpact));

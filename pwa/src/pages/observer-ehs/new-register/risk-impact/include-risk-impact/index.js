import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import {
    ButtonMultiSelect,
    ConfirmCancelFooter,
    Header
} from '../../../../../components/organisms';
import { WhiteHeader } from '../../../../../components/atoms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    InputField
} from './styles';
import {
    getDangersAndAspects,
    getRisksAndImpacts,
    getRiskTypes
} from '../../../../../services/endpoints/observer/risks';
import { LoadingContainer } from '../../../../../components/molecules';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
import Uuid from 'react-uuid';

const NewRegisterIncludeRiskImpact = ({ NewRegisterObserver }) => {
    const { createOrUpdateRiskAgents, getRiskAgent, registrationLocation } =
        NewRegisterObserver;

    const { id } = useParams();

    const history = useHistory();

    const {
        isEditingFromCheckObservation = false,
        isEditingFromRiskRating = false,
        observation = {}
    } = history.location.state ?? {};

    const [loading, setLoading] = useState(true);
    const [dangerAspectType, setDangerAspectType] = useState([]);
    const [dangerAspect, setDangerAspect] = useState([]);
    const [riskImpact, setRiskImpact] = useState([]);

    const handleSaveDangerAspectType = (items) => {
        setDangerAspect([
            ...dangerAspect.map((i) => ({ ...i, selected: false }))
        ]);
        setRiskImpact([...riskImpact.map((i) => ({ ...i, selected: false }))]);
        setDangerAspectType([...items]);
    };

    const handleSaveDangerAspect = (items) => {
        setDangerAspect([
            ...dangerAspect.map((item) => {
                const itemModal = items.find((i) => i.id === item.id);

                if (itemModal) {
                    item.selected = itemModal.selected;
                }

                return item;
            })
        ]);

        setRiskImpact([
            ...riskImpact.map((item) => {
                const ability = dangerAspect.findIndex(
                    (d) => d.id === item.dangerAspect && d.selected
                );

                if (!ability) {
                    item.selected = false;
                }

                return item;
            })
        ]);
    };

    const handleSaveRiskImpact = (items) => {
        setRiskImpact([
            ...riskImpact.map((item) => {
                const itemModal = items.find((i) => i.id === item.id);

                if (itemModal) {
                    item.selected = itemModal.selected;
                }

                return item;
            })
        ]);
    };

    const handleSubmit = () => {
        try {
            const riskAgents = [];

            if (isEditingFromRiskRating) {
                const impactsFound = riskImpact.filter(
                    (item) => item?.selected
                );

                impactsFound.forEach((impact) => {
                    const dangerAspectData = dangerAspect.find(
                        (d) => d.id === impact.dangerAspect
                    );
                    const dangerAspectTypeData = dangerAspectType.find(
                        (dat) => dat.id === dangerAspectData.dangerAspectType
                    );

                    observation?.risksAndImpacts?.push({
                        riskClientCode: Uuid(),
                        riskTypeCode: dangerAspectTypeData.id,
                        riskTypeColor: dangerAspectTypeData.color,
                        riskTypeIcon: dangerAspectTypeData.icon,
                        riskDescription: dangerAspectTypeData.name,
                        dangerAspectsCode: dangerAspectData.id,
                        dangerAspectsDescription: dangerAspectData.name,
                        riskImpactCode: impact.id,
                        riskImpactDescription: impact.name,
                        local: true
                    });
                });

                history.push('/observer-ehs/new-register/risk-impact', {
                    isEditingFromRiskRating,
                    observation
                });
                return;
            }

            if (!id) {
                riskImpact.forEach((item) => {
                    if (item.selected) {
                        const dangerAspectData = dangerAspect.find(
                            (d) => d.id === item.dangerAspect
                        );
                        const dangerAspectTypeData = dangerAspectType.find(
                            (dat) =>
                                dat.id === dangerAspectData.dangerAspectType
                        );

                        riskAgents.push({
                            id: null,
                            dangerAspectType: {
                                id: dangerAspectTypeData.id,
                                name: dangerAspectTypeData.name,
                                icon: dangerAspectTypeData.icon,
                                color: dangerAspectTypeData.color
                            },
                            dangerAspect: {
                                id: dangerAspectData.id,
                                name: dangerAspectData.name,
                                dangerAspectType:
                                    dangerAspectData.dangerAspectType
                            },
                            riskImpact: {
                                id: item.id,
                                dangerAspect: item.dangerAspect,
                                name: item.name,
                                riskImpactType: item.riskImpactType
                            }
                        });
                    }
                });
            } else {
                const riskImpactData = riskImpact.find((r) => r.selected);
                const dangerAspectData = dangerAspect.find(
                    (d) => d.id === riskImpactData.dangerAspect
                );
                const dangerAspectTypeData = dangerAspectType.find(
                    (dat) => dat.id === dangerAspectData.dangerAspectType
                );

                riskAgents.push({
                    id: id,
                    dangerAspectType: {
                        id: dangerAspectTypeData.id,
                        name: dangerAspectTypeData.name,
                        icon: dangerAspectTypeData.icon,
                        color: dangerAspectTypeData.color
                    },
                    dangerAspect: {
                        id: dangerAspectData.id,
                        name: dangerAspectData.name,
                        dangerAspectType: dangerAspectData.dangerAspectType
                    },
                    riskImpact: {
                        id: riskImpactData.id,
                        dangerAspect: riskImpactData.dangerAspect,
                        name: riskImpactData.name,
                        riskImpactType: riskImpactData.riskImpactType
                    }
                });
            }

            createOrUpdateRiskAgents(riskAgents);

            history.push('/observer-ehs/new-register/risk-impact', {
                isEditingFromCheckObservation
            });
        } catch (error) {
            toast.error('Não foi possível criar ou atualizar o(s) registro(s)');
        }
    };

    useEffect(() => {
        const matchId =
            registrationLocation?.location?.id ??
            observation?.observationClientId;

        async function fetchData() {
            const dangerAspectTypeData = await getRiskTypes(matchId);
            const dangerAspectData = await getDangersAndAspects(matchId);
            const riskImpactData = await getRisksAndImpacts(matchId);

            if (id) {
                const riskAgent = getRiskAgent(id);

                if (riskAgent) {
                    try {
                        const dangerAspectTypeIndex =
                            dangerAspectTypeData.findIndex(
                                (i) => i.id === riskAgent.dangerAspectType.id
                            );
                        const dangerAspectIndex = dangerAspectData.findIndex(
                            (i) => i.id === riskAgent.dangerAspect.id
                        );
                        const riskImpactIndex = riskImpactData.findIndex(
                            (i) => i.id === riskAgent.riskImpact.id
                        );

                        dangerAspectTypeData[
                            dangerAspectTypeIndex
                        ].selected = true;
                        dangerAspectData[dangerAspectIndex].selected = true;
                        riskImpactData[riskImpactIndex].selected = true;
                    } catch (e) {
                        toast.error('Não foi possível consultar registro');
                        history.push('/observer-ehs/new-register/risk-impact', {
                            isEditingFromCheckObservation
                        });
                    }
                }
            }
            setDangerAspectType(dangerAspectTypeData);
            setDangerAspect(dangerAspectData);
            setRiskImpact(riskImpactData);

            setLoading(false);
        }

        fetchData();
    }, [
        getRiskAgent,
        history,
        id,
        isEditingFromCheckObservation,
        registrationLocation?.location?.id,
        observation?.observationClientId,
        observation?.risksAndImpacts,
        isEditingFromRiskRating
    ]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Incluir Risco/Impacto'}
                    onClose={() => history.goBack()}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageTitle>Riscos e impactos</PageTitle>
                            <PageDescription>
                                Agora, informe os Agentes de Risco que você
                                identificou neste ambiente
                            </PageDescription>
                        </PageInfo>
                        <InputField>
                            <ButtonMultiSelect
                                name={'dangerAspectType'}
                                fieldName={'Tipo do perigo / Aspecto'}
                                pageTitle={'Incluir Risco/Impacto'}
                                labelSearchInput={'Tipo do perigo / Aspecto'}
                                category={'danger-aspect-type'}
                                fieldsFilter={['name']}
                                single={true}
                                items={dangerAspectType}
                                onSave={handleSaveDangerAspectType}
                            />
                        </InputField>
                        {dangerAspectType.filter((i) => i.selected).length ===
                            1 && (
                            <InputField>
                                <ButtonMultiSelect
                                    name={'dangerAspect'}
                                    fieldName={'Perigo / Aspecto'}
                                    pageTitle={'Incluir Risco/Impacto'}
                                    labelSearchInput={'Perigo / Aspecto'}
                                    category={'checkbox'}
                                    fieldsFilter={['name']}
                                    items={dangerAspect.filter(
                                        (i) =>
                                            dangerAspectType.findIndex(
                                                (d) =>
                                                    d.id ===
                                                        i.dangerAspectType &&
                                                    d.selected
                                            ) !== -1
                                    )}
                                    onSave={handleSaveDangerAspect}
                                />
                            </InputField>
                        )}
                        {dangerAspect.filter((i) => i.selected).length > 0 && (
                            <ButtonMultiSelect
                                name={'riskImpact'}
                                fieldName={'Risco / Impacto'}
                                pageTitle={'Incluir Risco/Impacto'}
                                labelSearchInput={'Risco / Impacto'}
                                category={'checkbox'}
                                fieldsFilter={['name']}
                                single={id ? true : false}
                                items={riskImpact.filter(
                                    (i) =>
                                        dangerAspect.findIndex(
                                            (d) =>
                                                d.id === i.dangerAspect &&
                                                d.selected
                                        ) !== -1
                                )}
                                onSave={handleSaveRiskImpact}
                            />
                        )}
                    </Content>
                )}
                <ConfirmCancelFooter
                    confirmButtonLabel={'Confirmar'}
                    confirmButtonIcon={<FaCheck />}
                    cancelButtonLabel={'Cancelar'}
                    onConfirm={() => handleSubmit()}
                    onCancel={() => history.goBack()}
                    confirmButtonDisabled={
                        loading ||
                        riskImpact.filter((item) => item.selected).length === 0
                    }
                />
            </Container>
        </Fragment>
    );
};

export default inject('NewRegisterObserver')(
    observer(NewRegisterIncludeRiskImpact)
);

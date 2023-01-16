import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useState } from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex,
    RadioButtonGroup
} from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import { getObserverDetails } from '../../../../services/endpoints/observer/details';
import {
    getTypesOptions,
    updateObservation
} from '../../../../services/endpoints/observer/observations';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription
} from './styles';

const NewRegisterType = ({
    NewRegisterObserver: {
        registrationLocation,
        setNewRegisterData,
        type: storeType
    }
}) => {
    const history = useHistory();
    const {
        isEditingFromCheckObservation = false,
        isEditingFromRiskRating = false,
        observation = {}
    } = history.location.state ?? {};

    const [type, setType] = useState(
        storeType.id ?? observation?.observationTypeCode
    );

    const [typesOptions, setTypesOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalExitPage, setModalExitPage] = useState(false);

    const handleNext = async () => {
        if (isEditingFromCheckObservation) {
            setNewRegisterData({
                type: typesOptions.find((item) => item.id === type)
            });
            return history.goBack();
        }

        if (isEditingFromRiskRating) {
            setLoading(true);

            observation.observationTypeCode = type;

            try {
                await updateObservation(observation);

                const [detailsResponse] = await getObserverDetails(
                    observation?.id
                );

                setLoading(false);

                return history.push(
                    `/observer-ehs/risk-rating/${observation?.id}/edit`,
                    detailsResponse
                );
            } catch (error) {
                setLoading(false);
            }
        }

        setNewRegisterData({
            type: typesOptions.find((item) => item.id === type),
            currentStep: '/observer-ehs/new-register/date-time'
        });

        history.push('date-time');
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            let { typesOptions } = await getTypesOptions({
                clientId:
                    registrationLocation?.company?.clientId ??
                    observation?.observationClientId
            });

            typesOptions = typesOptions?.map((item) => ({
                id: item.id,
                label: item.name
            }));

            setTypesOptions(typesOptions);

            setLoading(false);
        };

        getData();
    }, [
        registrationLocation?.company?.clientId,
        observation?.observationClientId
    ]);

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
                                <PageTitle>
                                    Selecione o tipo de observação
                                </PageTitle>
                                <PageDescription>
                                    Qual tipo de observação deseja realizar?
                                </PageDescription>
                            </PageInfo>
                            <RadioButtonGroup
                                options={typesOptions}
                                selected={type}
                                onSelect={(selected) => setType(selected)}
                            />
                        </>
                    )}
                </Content>
                <NextButton
                    nextDisabled={loading || !type}
                    positionRelative={true}
                    onBack={() => {
                        if (
                            isEditingFromCheckObservation ||
                            isEditingFromRiskRating
                        ) {
                            history.goBack();
                        } else {
                            setNewRegisterData({
                                currentStep:
                                    '/observer-ehs/new-register/registration-location'
                            });

                            history.push('registration-location');
                        }
                    }}
                    onNext={() => handleNext()}
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

export default inject('NewRegisterObserver')(observer(NewRegisterType));

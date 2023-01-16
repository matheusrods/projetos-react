import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    CompanyHeader,
    NextButton,
    TextArea
} from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import {
    ButtonMultiSelectUnForm,
    Header
} from '../../../../components/organisms';
import Yup from '../../../../config/yup';
import { getObserverDetails } from '../../../../services/endpoints/observer/details';
import { getObserverLocation } from '../../../../services/endpoints/observer/location';
import { updateObservation } from '../../../../services/endpoints/observer/observations';
import { Container, Content, PageInfo, PageTitle, StyledForm } from './styles';

const NewRegisterDescription = ({
    NewRegisterObserver: {
        registrationLocation,
        setNewRegisterData,
        description
    }
}) => {
    const history = useHistory();
    const formRef = useRef(null);
    const {
        isEditingFromCheckObservation = false,
        isEditingFromRiskRating = false,
        observation = {}
    } = history.location.state ?? {};

    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [modalExitPage, setModalExitPage] = useState(false);

    const { company } = registrationLocation;

    const handleInitialData = () => {
        if (isEditingFromRiskRating) {
            return {
                complementaryAction: observation?.whatWasSuggested,
                description: observation?.description,
                whatIDid: observation?.whatWasDone,
                whatIObserved: observation?.whatWasObserved,
                local: observation?.localId
            };
        }

        return {
            ...description
        };
    };

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                whatIObserved: Yup.string()
                    .required()
                    .label('O que eu observei?'),
                whatIDid: Yup.string()
                    .required()
                    .label('O que eu fiz a respeito?'),
                complementaryAction: Yup.string()
                    .nullable()
                    .label('Ação complementar'),
                description: Yup.string().required().label('Descrição'),
                local: Yup.string().required().label('Local')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            if (isEditingFromCheckObservation) {
                setNewRegisterData({
                    description: {
                        whatIObserved: data.whatIObserved,
                        whatIDid: data.whatIDid,
                        complementaryAction: data.complementaryAction,
                        description: data.description,
                        local: Number(data.local)
                    }
                });

                return history.goBack();
            }

            if (isEditingFromRiskRating) {
                setLoading(true);
                observation.description = data?.description;
                observation.localId = Number(data?.local);
                observation.whatWasDone = data?.whatIDid;
                observation.whatWasObserved = data?.whatIObserved;
                observation.whatWasSuggested = data?.complementaryAction;
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
                description: {
                    whatIObserved: data.whatIObserved,
                    whatIDid: data.whatIDid,
                    complementaryAction: data.complementaryAction,
                    description: data.description,
                    local: Number(data.local)
                },
                currentStep: '/observer-ehs/new-register/pictures'
            });

            history.push('pictures');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            const itHasNotClientId =
                !company?.clientId && !observation?.localId;

            if (itHasNotClientId) {
                toast.warn(
                    'Código do cliente ou o código do local não foi informado ou é inválido'
                );
                history.goBack();
                return;
            }

            setLoading(true);

            const response = await getObserverLocation(
                company?.clientId ?? observation?.observationClientId
            );

            //Local vindo do editar
            if (isEditingFromRiskRating) {
                const loc = response.map((item) =>
                    item?.id === observation?.localId
                        ? { ...item, selected: true }
                        : item
                );

                setLocations(loc);
                setLoading(false);
                return;
            }

            //Local previamente salvo no store
            if (description?.local) {
                const loc = response.map((item) =>
                    item?.id === description?.local
                        ? { ...item, selected: true }
                        : item
                );

                setLocations(loc);
                setLoading(false);
                return;
            }

            setLocations(response);
            setLoading(false);
        };

        getData();
    }, [
        company?.clientId,
        observation?.localId,
        observation?.observationClientId,
        isEditingFromRiskRating,
        description?.local,
        history
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
                                <PageTitle>Descrição da observação</PageTitle>
                            </PageInfo>
                            <StyledForm
                                id={'form'}
                                ref={formRef}
                                onSubmit={handleSubmit}
                                initialData={handleInitialData()}
                            >
                                <TextArea
                                    name={'whatIObserved'}
                                    label={'O que eu observei?'}
                                    placeholder={
                                        'Descreva aqui o que você observou'
                                    }
                                />
                                <TextArea
                                    name={'whatIDid'}
                                    label={'O que eu fiz a respeito?'}
                                    placeholder={
                                        'Descreva aqui as ações que você tomou em relação a questão'
                                    }
                                />
                                <TextArea
                                    name={'complementaryAction'}
                                    label={
                                        'É necessária alguma ação complementar? Se sim, descreva sua sugestão'
                                    }
                                    placeholder={
                                        'Descreva aqui a ação a ser realizada para complementar'
                                    }
                                />
                                <ButtonMultiSelectUnForm
                                    name={'local'}
                                    pageTitle={'Local da observação'}
                                    fieldName={'Local'}
                                    category={'checkbox'}
                                    fieldsFilter={['name']}
                                    labelSearchInput={'Local'}
                                    single={true}
                                    items={locations}
                                    onSave={(items) => setLocations([...items])}
                                />
                                <TextArea
                                    name={'description'}
                                    label={'Descrição'}
                                    placeholder={
                                        'Descreva aqui o local, projeto, usina ou services'
                                    }
                                />
                            </StyledForm>
                        </>
                    )}
                </Content>
                <NextButton
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
                                    '/observer-ehs/new-register/date-time'
                            });

                            history.push('date-time');
                        }
                    }}
                    onNext={() => formRef.current.submitForm()}
                    nextDisabled={loading}
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

export default inject('NewRegisterObserver')(observer(NewRegisterDescription));

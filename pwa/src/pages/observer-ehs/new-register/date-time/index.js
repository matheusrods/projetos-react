import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    CompanyHeader,
    NextButton,
    InputDatePickerUnForm,
    Input
} from '../../../../components/atoms';
import { LoadingContainer, ModalComplex } from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import moment from '../../../../config/moment';
import Yup from '../../../../config/yup';
import { consultRule } from '../../../../services/endpoints/pos';
import { Container, Content, PageInfo, PageTitle, StyledForm } from './styles';

const NewRegisterDateTime = ({
    NewRegisterObserver: {
        setNewRegisterData,
        dateTime: { date, time },
        registrationLocation: { location },
    }
}) => {
    const history = useHistory();

    const { isEditingFromCheckObservation = false } = history.location.state ?? {};

    const formRef = useRef(null);

    const [modalExitPage, setModalExitPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [minDate, setMinDate] = useState(moment().subtract(30, 'days').format('YYYY/MM/DD'));

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                time: Yup.string()
                    .required()
                    .min(5, 'Hora da observação deve ser uma hora válida.')
                    .label('Hora da observação'),
                date: Yup.date()
                    .transform((curr, orig) => (orig === '' ? null : curr))
                    .required()
                    .label('Data da observação')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            setNewRegisterData({
                dateTime: {
                    date: data.date,
                    time: data.time
                }
            });

            if (isEditingFromCheckObservation) {
                setNewRegisterData({
                    dateTime: {
                        date: data.date,
                        time: data.time
                    }
                });

                history.goBack();
            } else {
                setNewRegisterData({
                    dateTime: {
                        date: data.date,
                        time: data.time
                    },
                    currentStep: '/observer-ehs/new-register/description',
                });

                history.push('description');
            }
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
            setLoading(true);

            const { id } = location;

            const rule = await consultRule({
                clientId: id,
                key: 'TEMPOVISUALIZACAORETROATIVA',
                toolId: 3
            });

            if (rule) {
                const value = parseInt(rule.value);

                setMinDate(moment().subtract(value, 'days').format('YYYY/MM/DD'));
            }

            setLoading(false);
        }

        getData();
    }, [location]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Observador EHS'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    {loading ?
                        <LoadingContainer />
                        :
                        <Fragment>
                            <PageInfo>
                                <PageTitle>Data e hora da observação</PageTitle>
                            </PageInfo>
                            <StyledForm
                                initialData={{
                                    date: date ?? new Date(),
                                    time: time ?? '00:00'
                                }}
                                id={'form'}
                                ref={formRef}
                                onSubmit={handleSubmit}
                            >
                                <InputDatePickerUnForm
                                    name={'date'}
                                    label={'data da observação'}
                                    maxDate={new Date()}
                                    minDate={new Date(minDate)}
                                />
                                <Input
                                    type={'time'}
                                    name={'time'}
                                    label={'Hora da observação'}
                                />
                            </StyledForm>
                        </Fragment>
                    }
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        if (isEditingFromCheckObservation) {
                            history.goBack()
                        } else {
                            setNewRegisterData({
                                currentStep: '/observer-ehs/new-register/type',
                            });

                            history.push("type")
                        }
                    }}
                    onNext={() => formRef?.current?.submitForm()}
                    nextDisabled={loading}
                    nextLabel={
                        isEditingFromCheckObservation ? 'Concluir' : 'Avançar'
                    }
                    icon={
                        isEditingFromCheckObservation ? <FaCheck /> : undefined
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

export default inject('NewRegisterObserver')(observer(NewRegisterDateTime));

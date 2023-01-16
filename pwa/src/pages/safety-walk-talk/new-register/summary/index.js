/* eslint-disable no-labels */
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Container, Content, PageInfo, PageTitle, InputField } from './styles';
import { inject, observer } from 'mobx-react';
import { getClientsByUserIdAndClientId } from '../../../../services/endpoints/users';
import { getObserverLocation } from '../../../../services/endpoints/observer/location';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import Yup from '../../../../config/yup';
import React, {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import {
    CompanyHeader,
    InputDatePickerUnForm,
    NextButton,
    TextArea,
    Input
} from '../../../../components/atoms';
import {
    ButtonMultiSelectUnForm,
    Header
} from '../../../../components/organisms';
import { consultRule } from '../../../../services/endpoints/pos';
import moment from '../../../../config/moment';

const NewRegisterSummary = ({
    NewRegisterSWT: { setNewRegisterData, registrationLocation, summary },
    UserStore: { user }
}) => {
    const formRef = useRef();

    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [modalExitPage, setModalExitPage] = useState(false);
    const [minDate, setMinDate] = useState(
        moment().subtract(30, 'days').format('YYYY/MM/DD')
    );

    const { location: storeLocation = null } = registrationLocation;
    const { location: storeSummaryLocation = null } = summary;

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                description: Yup.string().required().label('Descrição'),
                operation: Yup.string()
                    .required()
                    .label('Operação / Atividade'),
                location: Yup.string().required().label('Local'),
                timeObservation: Yup.string()
                    .required()
                    .min(5, 'Hora da observação deve ser uma hora válida.')
                    .label('Hora da observação'),
                dateObservation: Yup.date()
                    .transform((curr, orig) => (orig === '' ? null : curr))
                    .required()
                    .label('Data da observação')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            setNewRegisterData({
                summary: {
                    description: data.description,
                    operation: data.operation,
                    timeObservation: data.timeObservation,
                    dateObservation: data.dateObservation,
                    location: data.location
                },
                registrationLocation: {
                    ...registrationLocation,
                    location: locations.find(
                        (item) => item.id === parseInt(data.location)
                    )
                },
                currentStep: '/safety-walk-talk/new-register/other-participants'
            });

            history.push('other-participants');
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

    const getLocationData = useCallback(async () => {

        const { clientId } = user;

        setLocationScop: {
            if (!storeLocation?.id) {
                break setLocationScop;
            }

            //const { clients } = await getClientsByUserIdAndClientId(params);
            const observerLocations = await getObserverLocation(clientId);

            // const hasClientsAndUnits =
            //     clients?.length > 0 && clients[0]?.units?.length > 0;

            // const locationMatcher = (item) => {
            //     let itMatches;

            //     if (storeSummaryLocation) {
            //         itMatches = item.id === Number(storeSummaryLocation);
            //     } else {
            //         itMatches = item.id === storeLocation?.id;
            //     }

            //     return itMatches ? { ...item, selected: true } : item;
            // };

            const locationMatcher = (item) => {
                let itMatches;

                if (storeSummaryLocation) {
                    itMatches = item.id === Number(storeSummaryLocation);
                } else {
                    itMatches = item.id === clientId;
                }

                return itMatches ? { ...item, selected: true } : item;
            };

            // const locationReducer = (acc, current) => {
            //     current.units.forEach((unit) => acc.push(unit));
            //     return acc;
            // };

            // if (!hasClientsAndUnits) {
            //     break setLocationScop;
            // }
            // if (!storeLocation?.id) {
            //     setLocations(clients[0].units);
            //     break setLocationScop;
            // }

            // if (!storeLocation?.id) {
            //     setLocations(clients[0].units);
            //     break setLocationScop;
            // }      

            if (!storeLocation?.id) {
                setLocations(observerLocations);
                break setLocationScop;
            }

            // const locations = clients
            //     .reduce(locationReducer, [])
            //     .map(locationMatcher);

            setLocations(observerLocations.map(locationMatcher));
        }

        const rule = await consultRule({
            clientId,
            key: 'TEMPOVISUALIZACAORETROATIVA',
            toolId: 2
        });

        if (rule?.safetyWalkTalk?.daysBacklog) {
            setMinDate(
                moment()
                    .subtract(rule.safetyWalkTalk.daysBacklog, 'days')
                    .format('YYYY/MM/DD')
            );
        }

        setLoading(false);
    }, [storeLocation, storeSummaryLocation, user]);

    useEffect(() => getLocationData(), [getLocationData]);

    const history = useHistory();

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
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <PageInfo>
                                <PageTitle>Resumo do Walk & Talk</PageTitle>
                            </PageInfo>
                            <Form
                                onSubmit={handleSubmit}
                                ref={formRef}
                                initialData={
                                    summary.dateObservation
                                        ? summary
                                        : {
                                            ...summary,
                                            dateObservation: new Date()
                                        }
                                }
                            >
                                <InputField>
                                    <InputDatePickerUnForm
                                        name={'dateObservation'}
                                        label={'Data da observação'}
                                        maxDate={new Date()}
                                        minDate={new Date(minDate)}
                                    />
                                </InputField>
                                <InputField>
                                    <Input
                                        type={'time'}
                                        name={'timeObservation'}
                                        label={'Hora da observação'}
                                        placeholder={'00:00'}
                                    />
                                </InputField>
                                <InputField>
                                    <TextArea
                                        name={'operation'}
                                        label={
                                            'Qual foi a operação/atividade acompanhada durante o Walk & Talk (Ex. Montagem do carcaça da turbina; Usinagem da peça/componente xpto)?'
                                        }
                                        placeholder={
                                            'Descreva aqui o que você observou (ex. Montagem do carcaça da turbina; Usinagem da peça/componente xpto)'
                                        }
                                    />
                                </InputField>
                                <InputField>
                                    <ButtonMultiSelectUnForm
                                        name={'location'}
                                        items={locations}
                                        single={true}
                                        onSave={(values) =>
                                            setLocations(values)
                                        }
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        fieldName={'Local'}
                                        pageTitle={'Alterar local'}
                                        labelSearchInput={'Local'}
                                    />
                                </InputField>
                                <TextArea
                                    name={'description'}
                                    label={'Descrição'}
                                    placeholder={
                                        'Descreva aqui o local, projeto, usina ou services'
                                    }
                                />
                            </Form>
                        </>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() =>
                        history.push(
                            '/safety-walk-talk/new-register/area-observations',
                            { from: history.location.pathname }
                        )
                    }
                    onNext={() => formRef?.current?.submitForm()}
                    nextDisabled={loading}
                    nextLabel={'Avançar'}
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
                onConfirm={() => history.push('/safety-walk-talk/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject(
    'NewRegisterSWT',
    'UserStore'
)(observer(NewRegisterSummary));

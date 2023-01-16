import React, {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form } from '@unform/web';
import { FaTimes } from 'react-icons/fa';
import {
    WhiteHeader,
    TextArea,
    MultiSelectUnForm,
    InputDatePickerUnForm
} from '../../../../../components/atoms';
import {
    ConfirmCancelFooter,
    Header,
    ButtonMultiSelectUnForm
} from '../../../../../components/organisms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    InputField
} from './styles';
import {
    getCriticismOptions,
    getStatusOptions,
    getTypesOptions
} from '../../../../../services/endpoints/actions';
import colors from '../../../../../styles/colors';
import LoadingContainer from '../../../../../components/molecules/loading-container';
import { getEmployees } from '../../../../../services/endpoints/users';
import * as Yup from 'yup';
import Uuid from 'react-uuid';
import moment from 'moment';
import { getOriginDetails } from '../../../../../services/endpoints/origins';

const NewRegisterImprovementActionsIncludeAction = ({
    UserStore,
    NewRegisterSWT
}) => {
    const {
        getQuestions,
        setNewRegisterData,
        linkActionToObservation,
        registrationLocation,
        form: localForm,
        uuid
    } = NewRegisterSWT;

    const history = useHistory();
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [typesOptions, setTypesOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [criticism, setCriticism] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [questions] = useState(getQuestions());
    const [question, setQuestion] = useState(null);
    const [responsible, setResponsible] = useState(null);
    const [linkAction, setAction] = useState(null);
    const { id } = useParams();

    const handleSaveResponsible = (data) => {
        const responsible = data.find((item) => item.selected === true);
        setResponsible(responsible);
    };

    const handleSaveQuestion = (data) => {
        const question = data.find((item) => item.selected === true);
        setQuestion(question);
    };

    const actionFactory = useCallback(
        async (data) => {
            const originResponse = await getOriginDetails(localForm.toolOrigin);
            const origin = {
                description: originResponse?.origin?.name,
                id: originResponse?.origin?.id
            };
            const localCriticism = criticism.find(
                (item) => item.id === data.criticism
            );
            const id = Uuid();
            const date = moment().format('DD/MM/YYYY');
            const deadline = data.completion_time
                ? data.completion_time.split('-').reverse().join('/')
                : null;
            const location = registrationLocation?.location;
            const reopened = false;
            const status = statusOptions.find(
                (item) => item.id === data.action_status
            );
            const type = typesOptions.find(
                (item) => item.id === data.action_type
            );
            const user = {
                avatar: UserStore.user.avatar,
                id: UserStore.user.id,
                name: UserStore.user.name
            };

            return {
                criticism: {
                    active: localCriticism.active,
                    color: localCriticism.color,
                    id: localCriticism.id,
                    description: localCriticism.name
                },
                status: {
                    active: status.active,
                    color: status.color,
                    id: status.id,
                    description: status.name
                },
                type: {
                    active: type.active,
                    id: type.id,
                    description: type.name
                },
                date,
                deadline,
                uuid: id,
                location,
                origin,
                reopened,
                responsible,
                user
            };
        },
        [
            UserStore,
            criticism,
            localForm,
            registrationLocation,
            responsible,
            statusOptions,
            typesOptions
        ]
    );

    const handleSubmit = useCallback(
        async (data) => {
            try {
                setLoading(true);
                const schema = Yup.object().shape({
                    question: Yup.string().required(
                        "O campo 'Item observado' é obrigatório."
                    ),
                    action_type: Yup.string().required(
                        "O campo 'Tipo da ação' é obrigatório."
                    ),
                    action_status: Yup.string().required(
                        "O campo 'Status da ação' é obrigatório."
                    ),
                    criticism: Yup.string().required(
                        "O campo 'Criticidade' é obrigatório."
                    ),
                    deviation: Yup.string().required(
                        "O campo 'descreva o desvio' é obrigatório."
                    ),
                    action: Yup.string().required(
                        "O campo 'Descreva a ação' é obrigatório."
                    ),
                    location: Yup.string().required(
                        "O campo 'Local da ação' é obrigatório."
                    ),
                    responsible: Yup.string().required(
                        "O campo 'Responsável da ação' é obrigatório."
                    ),
                    completion_time: Yup.string()
                });

                await schema.validate(data, {
                    abortEarly: false
                });

                if (id) {
                    const newAction = {
                        ...linkAction,
                        action: await actionFactory(data),
                        question: question,
                        local: true,
                        formData: data
                    };

                    const newLinkToObservation = linkActionToObservation.filter(
                        (item) => item.linkId !== id
                    );

                    setNewRegisterData({
                        linkActionToObservation: [
                            ...newLinkToObservation,
                            {
                                ...newAction
                            }
                        ]
                    });

                    setLoading(false);

                    history.goBack();
                } else {
                    setNewRegisterData({
                        linkActionToObservation: [
                            ...linkActionToObservation,
                            {
                                linkId: Uuid(),
                                action: await actionFactory(data),
                                question: question,
                                local: true,
                                formData: data
                            }
                        ]
                    });
                    setLoading(false);
                    history.push(
                        '/safety-walk-talk/new-register/improvement-actions'
                    );
                }
            } catch (err) {
                setLoading(false);
                console.error(err);
                const validationErrors = {};
                if (err instanceof Yup.ValidationError) {
                    err.inner.forEach((error) => {
                        validationErrors[error.path] = error.message;
                    });
                    formRef?.current?.setErrors(validationErrors);
                }
            }
        },
        [
            actionFactory,
            history,
            id,
            linkAction,
            linkActionToObservation,
            setNewRegisterData,
            question
        ]
    );

    const formDataFactory = (data) => {
        const formData = {
            ...data,
            action_status: {
                label: linkAction?.action?.status?.description,
                value: linkAction?.action?.status?.id
            },
            action_type: {
                label: linkAction?.action?.type?.description,
                value: linkAction?.action?.type?.id
            },
            criticism: {
                label: linkAction?.action?.criticism?.description,
                value: linkAction?.action?.criticism?.id
            }
        };
        return formData;
    };

    const getImprovementActionsData = useCallback(async () => {
        setLoading(true);

        const [typesOptions, statusOptions, criticismOptions, employees] =
            await Promise.all([
                getTypesOptions({ onlyActive: true }),
                getStatusOptions({ onlyActive: true }),
                getCriticismOptions({
                    onlyActive: true,
                    clientId: UserStore.clientId
                }),
                getEmployees()
            ]);

        setTypesOptions(typesOptions.typesOptions);
        setStatusOptions(
            statusOptions.statusOptions.filter((item) =>
                [1, 3, 5].includes(item.id)
            )
        );
        setCriticism(criticismOptions.criticismOptions);
        setEmployees(employees.employees);

        setLoading(false);
    }, [UserStore]);

    const getLinkActionFromStorageById = useCallback(() => {
        const newRegisterStore = localStorage.getItem(
            'safetyWalkTalk@newRegisterStore'
        );

        if (!newRegisterStore) {
            return [];
        }

        const newRegisterStoreParsed = JSON.parse(newRegisterStore);

        const { linkActionToObservation } =
            newRegisterStoreParsed.registers.find((item) => item.uuid === uuid);

        const linkAction = linkActionToObservation.find(
            (item) => item.linkId === id
        );

        return linkAction;
    }, [uuid, id]);

    useEffect(() => getImprovementActionsData(), [getImprovementActionsData]);

    useEffect(() => {
        const linkActionFound = getLinkActionFromStorageById();
        setAction(linkActionFound);
        setResponsible(linkActionFound?.action?.responsible);
        setQuestion(linkActionFound?.question);
    }, [getLinkActionFromStorageById]);

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <WhiteHeader
                        title={`${id ? 'Editar' : 'Incluir'} ação de melhoria`}
                        onClose={() => history.goBack()}
                    />
                    <LoadingContainer />
                    <ConfirmCancelFooter
                        confirmButtonDisabled={true}
                        confirmButtonLabel={id ? 'Editar' : 'Adicionar'}
                        cancelButtonLabel={'Cancelar'}
                        cancelButtonLabelColor={colors.gray6}
                        onCancel={() => history.goBack()}
                        onConfirm={() => history.goBack()}
                    />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={`${id ? 'Editar' : 'Incluir'} ação de melhoria`}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Cadastro de ações de melhoria</PageTitle>
                        <PageDescription>
                            Informe os dados desta ação de melhoria
                        </PageDescription>
                    </PageInfo>
                    <Form
                        ref={formRef}
                        id={'form'}
                        initialData={
                            id ? formDataFactory(linkAction?.formData) : null
                        }
                        onSubmit={(data) => handleSubmit(data)}
                    >
                        <InputField>
                            <ButtonMultiSelectUnForm
                                pageTitle={'Vincular ação de melhoria'}
                                fieldName={'Item observado'}
                                name="question"
                                labelSearchInput={'Responsável da ação'}
                                category={'checkbox'}
                                fieldsFilter={['name']}
                                single={true}
                                items={questions}
                                selected={question?.id}
                                onSave={(items) =>
                                    handleSaveQuestion([...items])
                                }
                                showSelectedInTag={true}
                            />
                        </InputField>
                        <InputField>
                            <MultiSelectUnForm
                                name="action_type"
                                label="Tipo da ação"
                                placeholder="Selecione uma opção"
                                single={true}
                                options={
                                    typesOptions.map((item) => ({
                                        label: item.name,
                                        value: item.id
                                    })) ?? []
                                }
                            />
                        </InputField>
                        <InputField>
                            <MultiSelectUnForm
                                name="action_status"
                                label="Status da ação"
                                placeholder="Selecione uma opção"
                                single={true}
                                options={
                                    statusOptions.map((item) => ({
                                        label: item.name,
                                        value: item.id
                                    })) ?? []
                                }
                            />
                        </InputField>
                        <InputField>
                            <MultiSelectUnForm
                                name="criticism"
                                label="Criticidade"
                                placeholder="Selecione uma opção"
                                single={true}
                                options={
                                    criticism.map((item) => ({
                                        label: item.name,
                                        value: item.id
                                    })) ?? []
                                }
                            />
                        </InputField>
                        <InputField>
                            <TextArea
                                name="deviation"
                                label="Descreva o desvio"
                                placeholder="Descreva o desvio"
                            />
                        </InputField>
                        <InputField>
                            <TextArea
                                name="action"
                                label="Descreva a ação"
                                placeholder="Descreva a ação"
                            />
                        </InputField>
                        <InputField>
                            <TextArea
                                name="location"
                                label="Local da ação"
                                placeholder="Descreva o local da ação"
                            />
                        </InputField>
                        <InputField>
                            <ButtonMultiSelectUnForm
                                name="responsible"
                                fieldName={'Responsável da ação'}
                                pageTitle={'Selecionar responsável'}
                                labelSearchInput={'Responsável da ação'}
                                category={'user'}
                                fieldsFilter={['name']}
                                single={true}
                                items={employees}
                                selected={responsible?.id}
                                onSave={(items) =>
                                    handleSaveResponsible([...items])
                                }
                                showSelectedInTag={true}
                            />
                        </InputField>
                        <InputField>
                            <InputDatePickerUnForm
                                name="completion_time"
                                label="Prazo da conclusão"
                                clearIcon={<FaTimes color={colors.gray4_2} />}
                            />
                        </InputField>
                    </Form>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={id ? 'Editar' : 'Adicionar'}
                    cancelButtonLabel={'Cancelar'}
                    cancelButtonLabelColor={colors.gray6}
                    confirmButtonForm={'form'}
                    confirmButtonType={'submit'}
                    onCancel={() => history.goBack()}
                />
            </Container>
        </Fragment>
    );
};

export default inject(
    'UserStore',
    'NewRegisterSWT'
)(observer(NewRegisterImprovementActionsIncludeAction));

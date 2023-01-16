import React, {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form } from '@unform/web';
import {
    WhiteHeader,
    TextArea,
    MultiSelectUnForm,
    InputDatePickerUnForm
} from '../../../../../../components/atoms';
import {
    ConfirmCancelFooter,
    Header,
    ButtonMultiSelectUnForm
} from '../../../../../../components/organisms';
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
} from '../../../../../../services/endpoints/actions';
import colors from '../../../../../../styles/colors';
import LoadingContainer from '../../../../../../components/molecules/loading-container';
import { getClientsByUserIdAndClientId, getEmployees } from '../../../../../../services/endpoints/users';
import * as Yup from 'yup';
import Uuid from 'react-uuid';
import moment from 'moment';
import { getOriginsByClientId } from '../../../../../../services/endpoints/origins';
import { FaTimes } from 'react-icons/fa';

const ResponsibleDealtImprovementActionsIncludeAction = ({
    Auditing,
    UserStore
}) => {
    const history = useHistory();

    const {
        unConformityRequirement = null,
        improvementActionDealtId = null,
        dealInEditing,
        addImprovementActionsInDealt,
        updateImprovementAction
    } = Auditing;

    const formRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [typesOptions, setTypesOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [criticism, setCriticism] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [responsible, setResponsible] = useState(
        dealInEditing
            ?.improvementActions
            ?.find(action => action.id === improvementActionDealtId)
            ?.responsible || null
    );

    const handleSaveResponsible = (data) => {
        const responsible = data.find((item) => item.selected === true);

        setResponsible(responsible);
    };

    const actionFactory = useCallback(
        async (data) => {
            const id = Uuid();

            const origins = await getOriginsByClientId(UserStore.user.clientId);
            const originResponse = origins.find(o => o.key === 'AUDITORIAS_NCS');

            const origin = {
                description: originResponse?.origin?.name,
                id: originResponse?.origin?.id
            };

            const localCriticism = criticism.find(
                (item) => item.id === data.criticism
            );

            const date = moment().format('DD/MM/YYYY');

            const deadline = data.completion_time
                ? data.completion_time.split('-').reverse().join('/')
                : null;

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

            const { clients = [] } = await getClientsByUserIdAndClientId({
                userId: UserStore.user.id,
                clientId: UserStore.user.clientId
            });

            const location = clients[0]?.units[0] || null;

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
                id,
                location,
                origin,
                responsible,
                user,
                descriptionLocation: data.location,
                descriptionAction: data.action,
                descriptionDeviation: data.deviation
            };
        },
        [UserStore, criticism, responsible, statusOptions, typesOptions]
    );

    const handleSubmit = useCallback(
        async (data) => {
            try {
                setLoading(true);

                const schema = Yup.object().shape({
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

                if (improvementActionDealtId) {
                    const action = await actionFactory(data);

                    updateImprovementAction(improvementActionDealtId, action);

                    setLoading(false);

                    history.goBack();
                } else {
                    const action = await actionFactory(data);

                    addImprovementActionsInDealt([
                        {
                            ...action,
                            itsLink: false
                        }
                    ]);

                    setLoading(false);

                    history.goBack();
                }
            } catch (err) {
                setLoading(false);

                const validationErrors = {};

                if (err instanceof Yup.ValidationError) {
                    err.inner.forEach((error) => {
                        validationErrors[error.path] = error.message;
                    });

                    formRef?.current?.setErrors(validationErrors);
                }
            }
        },
        [improvementActionDealtId, actionFactory, updateImprovementAction, history, addImprovementActionsInDealt]
    );

    const formDataFactory = () => {
        const action = dealInEditing.improvementActions.find(action => action.id === improvementActionDealtId);

        const formData = {
            action_status: {
                label: action?.status?.description,
                value: action?.status?.id
            },
            action_type: {
                label: action?.type?.description,
                value: action?.type?.id
            },
            criticism: {
                label: action?.criticism?.description,
                value: action?.criticism?.id
            },
            location: action?.descriptionLocation,
            action: action?.descriptionAction,
            deviation: action?.descriptionDeviation,
            completion_time: action?.deadline ? action.deadline.split('/').reverse().join('-') : null
        };

        return formData;
    };

    const getImprovementActionsData = useCallback(async () => {
        setLoading(true);

        const [
            typesOptions,
            statusOptions,
            criticismOptions,
            employees
        ] = await Promise.all([
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

    useEffect(() => getImprovementActionsData(), [getImprovementActionsData]);

    if (!unConformityRequirement) {
        return <Redirect to={'/audit/responsible-dealt'} />;
    } else if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <WhiteHeader
                        title={`${improvementActionDealtId ? 'Editar' : 'Incluir'} ação de melhoria`}
                        onClose={history.goBack}
                    />
                    <LoadingContainer />
                    <ConfirmCancelFooter
                        confirmButtonDisabled={true}
                        confirmButtonLabel={improvementActionDealtId ? 'Editar' : 'Adicionar'}
                        cancelButtonLabel={'Cancelar'}
                        cancelButtonLabelColor={colors.gray6}
                        onCancel={history.goBack}
                        onConfirm={history.goBack}
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
                    title={`${improvementActionDealtId ? 'Editar' : 'Incluir'} ação de melhoria`}
                    onClose={history.goBack}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Cadastro de ações de melhoria</PageTitle>
                        <PageDescription>Informe os dados desta ação de melhoria</PageDescription>
                    </PageInfo>
                    <Form
                        ref={formRef}
                        id={'form'}
                        initialData={improvementActionDealtId ? formDataFactory() : null}
                        onSubmit={(data) => handleSubmit(data)}
                    >
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
                                fieldName="Responsável da ação"
                                pageTitle="Selecionar responsável"
                                labelSearchInput="Responsável da ação"
                                category="user"
                                fieldsFilter={['name']}
                                single={true}
                                items={employees}
                                selected={responsible?.id}
                                onSave={(items) => handleSaveResponsible([...items])}
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
                    confirmButtonLabel={improvementActionDealtId ? 'Editar' : 'Adicionar'}
                    cancelButtonLabel={'Cancelar'}
                    cancelButtonLabelColor={colors.gray6}
                    confirmButtonForm={'form'}
                    confirmButtonType={'submit'}
                    onCancel={history.goBack}
                />
            </Container>
        </Fragment>
    );
};

export default inject(
    'Auditing',
    'UserStore'
)(observer(ResponsibleDealtImprovementActionsIncludeAction));

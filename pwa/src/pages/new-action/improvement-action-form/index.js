import React, {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { LoadingContainer, ModalComplex } from "../../../components/molecules";
import {
    AsynchronousButtonMultiSelect,
    ButtonMultiSelectUnForm,
    ConfirmCancelFooter,
    Header,
} from "../../../components/organisms";
import {
    WhiteHeader,
    TextArea,
    MultiSelectUnForm,
    InputDatePickerUnForm,
} from "../../../components/atoms";
import {
    Container,
    Content,
    InputField,
    PageInfo,
    PageTitle,
    PageDescription,
} from "./styles";
import { inject, observer } from "mobx-react";
import {
    getCriticismOptions,
    getStatusOptions,
    getTypesOptions,
} from "../../../services/endpoints/actions";
import { getEmployees } from "../../../services/endpoints/users";
import colors from "../../../styles/colors";
import { getOriginDetails } from "../../../services/endpoints/origins";
import _ from "lodash";

const ImprovementActionForm = ({
    NewActionStore: { setNewActionData, reset, type, recordSource, actions, registrationLocation: { location } },
    UserStore: { clientId },
    PermissionStore: { hasPermission },
}) => {
    const { id } = useParams();

    const history = useHistory();

    const action =
        actions.length !== 0 ? (type === 1 ? actions[0] : actions[id]) : null;

    if (!recordSource.id) history.push("type");

    const formRef = useRef(null);

    const [dynamicFields, setDynamicFields] = useState([]);
    const [dynamicFieldsAnswers, setDynamicFieldsAnswers] = useState({});
    const [criticismOptions, setCriticismOptions] = useState([]);
    const [typesOptions, setTypesOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [responsibleOptions, setResponsibleOptions] = useState([]);
    const [modalExitVisible, setModalExitVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        setLoading(true);

        const {
            origin: { form },
        } = await getOriginDetails(recordSource.id);

        setDynamicFields(form);

        let { criticismOptions } = await getCriticismOptions({
            onlyActive: true,
            clientId: location.id
        });

        criticismOptions = criticismOptions?.map((item) => ({
            value: item.id,
            label: item.name,
            color: item.color,
        }));

        setCriticismOptions(criticismOptions);

        let { typesOptions } = await getTypesOptions({ onlyActive: true, clientId: location.id });

        typesOptions = typesOptions?.map((item) => ({
            value: item.id,
            label: item.name,
        }));

        setTypesOptions(typesOptions);

        let { statusOptions } = await getStatusOptions({ onlyActive: true });

        statusOptions = statusOptions
            ?.filter((item) => [1, 3, 5].includes(item.id))
            .map((item) => ({
                value: item.id,
                label: item.name,
                color: item.color,
            }));

        setStatusOptions(statusOptions);

        let { employees } = await getEmployees();

        if (action?.responsible?.id) {
            employees = employees.map((item) =>
                item.id === action.responsible.id
                    ? { ...item, selected: true }
                    : item
            );
        }

        setResponsibleOptions(employees);

        if (action?.dynamicFieldsAnswers) {
            setDynamicFieldsAnswers(action.dynamicFieldsAnswers);
        }

        setLoading(false);
    }, [action, location.id, recordSource.id]);

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                actionLocationDescription: Yup.string().required(
                    "O campo 'local da ação' é obrigatório."
                ),
                criticism: Yup.string().required(
                    "O campo 'criticidade' é obrigatório."
                ),
                deadline: Yup.date()
                    .transform((curr, orig) => (orig === "" ? null : curr))
                    .nullable()
                    .default(null),
                description: Yup.string().required(
                    "O campo 'descreva a ação' é obrigatório."
                ),
                deviationDescription: Yup.string().required(
                    "O campo 'descreva o desvio' é obrigatório."
                ),
                status: Yup.string().required(
                    "O campo 'status da ação' é obrigatório."
                ),
                type: Yup.string().required(
                    "O campo 'tipo da ação' é obrigatório."
                ),
                responsible: Yup.string().required(
                    "O campo 'Responsável da ação' é obrigatório."
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            let newAction = {
                ...data,
                criticism: criticismOptions.find(
                    (item) => item.value === data.criticism
                ),
                status: statusOptions.find(
                    (item) => item.value === data.status
                ),
                type: typesOptions.find((item) => item.value === data.type),
                responsible: responsibleOptions.find(
                    (item) => item.id === parseInt(data.responsible)
                ),
                dynamicFieldsAnswers,
            };

            let newActionsArray = [];

            if (type === 2) {
                if (id) {
                    newActionsArray = [...actions];
                    newActionsArray[id] = newAction;
                } else {
                    newActionsArray = [...actions, newAction];
                }
            } else {
                newActionsArray = [newAction];
            }

            setNewActionData({
                actions: newActionsArray,
            });

            history.push(
                type === 1 ? "/new-action/details" : "/new-action/various"
            );
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });

                formRef.current.setErrors(validationErrors);
            }
        }
    };

    useEffect(() => {
        getData();
    }, [getData]);

    const renderDynamicFields = () => {
        const elements = [];

        dynamicFields.forEach((item, index) => {
            const { type, name, label } = item;

            switch (type) {
                case "select":
                    elements.push(
                        <InputField key={index.toString()}>
                            <AsynchronousButtonMultiSelect
                                id={item?.id}
                                clientId={clientId}
                                name={name}
                                fieldName={label}
                                pageTitle={"Incluir ação de melhoria"}
                                labelSearchInput={label}
                                fieldRequired={item?.fieldRequired}
                                fieldRequiredValue={!_.isNull(item.fieldRequired) ? Object(dynamicFieldsAnswers).hasOwnProperty(item.fieldRequired) ? dynamicFieldsAnswers[item.fieldRequired] ?? null : null : null}
                                endpoint={item?.endpoint}
                                method={item?.method}
                                prefixTag={'#'}
                                category={item.category}
                                single={true}
                                disabled={!_.isNull(item.fieldRequired) && (!Object(dynamicFieldsAnswers).hasOwnProperty(item.fieldRequired) || !Object(dynamicFieldsAnswers[item.fieldRequired]).hasOwnProperty('id') || _.isNull(dynamicFieldsAnswers[item.fieldRequired].id))}
                                selected={Object(dynamicFieldsAnswers).hasOwnProperty(name) ? dynamicFieldsAnswers[name]?.id ?? null : null}
                                onSave={(item) => (
                                    setDynamicFieldsAnswers((state) => ({
                                        ...state,
                                        [name]: {
                                            fieldName: label,
                                            ...item
                                        },
                                    }))
                                )}
                            />
                        </InputField>
                    );
                    break;
                default:
                    break;
            }
        });

        return elements;
    };

    return hasPermission(1) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={
                        type === 2 && id
                            ? "Editar ação de melhoria"
                            : "Incluir ação de melhoria"
                    }
                    onClose={() => setModalExitVisible(true)}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <PageInfo>
                                <PageTitle>
                                    Cadastro de ações de melhoria
                                </PageTitle>
                                <PageDescription>
                                    Informe os dados desta ação de melhoria
                                </PageDescription>
                            </PageInfo>
                            <Form
                                id={"form"}
                                ref={formRef}
                                initialData={action}
                                onSubmit={(data) => handleSubmit(data)}
                            >
                                {renderDynamicFields()}
                                <InputField>
                                    <MultiSelectUnForm
                                        name={"type"}
                                        label={"Tipo da ação"}
                                        placeholder={"Selecione ou digite"}
                                        single={true}
                                        options={typesOptions}
                                    />
                                </InputField>
                                <InputField>
                                    <MultiSelectUnForm
                                        name={"criticism"}
                                        label={"Criticidade"}
                                        placeholder={"Selecione ou digite"}
                                        single={true}
                                        options={criticismOptions}
                                    />
                                </InputField>
                                <InputField>
                                    <TextArea
                                        name={"deviationDescription"}
                                        label={"Descreva o desvio / Motivo"}
                                        placeholder={
                                            "Descreva o desvio / motivo"
                                        }
                                    />
                                </InputField>
                                <InputField>
                                    <TextArea
                                        name={"description"}
                                        label={"Descreva a ação"}
                                        placeholder={"Descreva a ação"}
                                    />
                                </InputField>
                                <InputField>
                                    <TextArea
                                        name={"actionLocationDescription"}
                                        label={"Descreva o local"}
                                        placeholder={"Descreva o local"}
                                    />
                                </InputField>
                                <InputField>
                                    <InputDatePickerUnForm
                                        name={"deadline"}
                                        label={
                                            "PRAZO PARA CONCLUSÃO"
                                        }
                                        clearIcon={
                                            <FaTimes color={colors.gray4_2} />
                                        }
                                    />
                                </InputField>
                                <InputField>
                                    <ButtonMultiSelectUnForm
                                        name={"responsible"}
                                        fieldName={"Responsável da ação"}
                                        pageTitle={"Selecionar responsável"}
                                        labelSearchInput={"Responsável da ação"}
                                        category={"user"}
                                        fieldsFilter={["name"]}
                                        single={true}
                                        items={responsibleOptions}
                                        onSave={(items) =>
                                            setResponsibleOptions([...items])
                                        }
                                        showSelectedInTag={false}
                                    />
                                </InputField>
                                <InputField>
                                    <MultiSelectUnForm
                                        name={"status"}
                                        label={"Status da ação"}
                                        placeholder={"Selecione ou digite"}
                                        single={true}
                                        options={statusOptions}
                                    />
                                </InputField>
                            </Form>
                        </>
                    )}
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={
                        type === 2 && id ? "Salvar" : "Adicionar"
                    }
                    confirmButtonIcon={<FaCheck />}
                    cancelButtonLabel={"Cancelar"}
                    confirmButtonForm={"form"}
                    confirmButtonType={"submit"}
                    confirmButtonDisabled={loading}
                    onCancel={() => history.goBack()}
                />
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"Ao sair, você perdera todos os dados preenchidos. Este ato não pode ser revertido. Tem certeza que deseja sair?"}
                nameModal={"exit-page"}
                visible={modalExitVisible}
                onCancel={() => setModalExitVisible(false)}
                onConfirm={() => {
                    reset();
                    history.push("/action-plan");
                }}
                icon={<FaExclamationTriangle size={40} color={"#FF5C69"} />}
                confirmButtonLabel={"Sair"}
                cancelButtonLabel={"Cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("NewActionStore", "UserStore", "PermissionStore")(observer(ImprovementActionForm));

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Content,
    PageDescription,
    InputField
} from './styles';
import {inject, observer} from "mobx-react";
import {
    InputDatePickerUnForm, Loading,
    MultiSelectUnForm,
    SideModal,
    TextArea,
    WhiteHeader
} from "../../../../../../components/atoms";
import colors from "../../../../../../styles/colors";
import {ButtonMultiSelectUnForm, ConfirmCancelFooter} from "../../../../../../components/organisms";
import * as Yup from "yup";
import {FaTimes} from "react-icons/fa";
import {Form} from "@unform/web";
import {getCriticismOptions, getStatusOptions, getTypesOptions} from "../../../../../../services/endpoints/actions";
import {getEmployees} from "../../../../../../services/endpoints/users";

const NewImprovementActions = ({
    onClose,
    visible,
    onConfirm,
    InspectionQuestionsStore,
    UserStore
}) => {
    const [loading, setLoading] = useState(false);
    const [questionsList, setQuestions] = useState([]);
    const [typesOptions, setTypesOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [criticism, setCriticism] = useState([]);
    const [employees, setEmployees] = useState([]);
    const formRef = useRef(null);

    const {
        getAllQuestions,
        getActionsList,
        saveImprovementAction,
        linkQuestionToAction
    } = InspectionQuestionsStore;


    const handleSubmit = useCallback(
        async (data) => {
            try {
                setLoading(true);
                const schema = Yup.object().shape({
                    question: Yup.string().required(
                        "O campo 'Item questão' é obrigatório."
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
                    description: Yup.string().required(
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
                const actionId = await saveImprovementAction(data);
                await linkQuestionToAction(data.question, actionId);
                setLoading(false);
                onConfirm();
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
        },[]);

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

    useEffect(() => getImprovementActionsData(), [getImprovementActionsData]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await getAllQuestions().then(questions => {
                questions.map(question => {
                    setQuestions(questionsList => [...questionsList, {
                        id: question.id,
                        name: `${question.title} - ${question.question}`,
                    }]);
                });

            });
            setLoading(false);
        }
        fetchData();
    }, [getAllQuestions, getActionsList]);

    return (
        <SideModal visible={visible} top={0}>
            <WhiteHeader title={'Cadastrar Plano de Ação'} onClose={onClose} />
            <Content>
                <PageDescription>Cadastre um plano de ação</PageDescription>
                {loading ? (
                    <Loading />
                ) : (
                    <Form
                        ref={formRef}
                        id={'form'}
                        onSubmit={(data) => handleSubmit(data)}
                    >
                        <InputField>
                            <ButtonMultiSelectUnForm
                                pageTitle={'Vincular ação de melhoria'}
                                fieldName={'Item Questão'}
                                name="question"
                                labelSearchInput={'Buscar item questão'}
                                category={'checkbox'}
                                fieldsFilter={['name']}
                                single={true}
                                items={questionsList}
                                onSave={(items) => setQuestions([...items])}
                                showSelectedInTag={true}
                                top={0}
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
                                name="description"
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
                                onSave={(items) => setEmployees([...items])}
                                showSelectedInTag={true}
                                top={0}
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

                )}



            </Content>
            <ConfirmCancelFooter
                confirmButtonLabel={'Cadastrar'}
                cancelButtonLabel={'Cancelar'}
                cancelButtonLabelColor={colors.gray6}
                onCancel={onClose}
                confirmButtonType={'submit'}
                confirmButtonForm={'form'}
                confirmButtonDisabled={false}
                confirmButtonLoading={loading}
            />
        </SideModal>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore','UserStore')(observer(NewImprovementActions));

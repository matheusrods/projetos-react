import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaCheck, FaExchangeAlt } from "react-icons/fa";
import { ButtonMultiSelectUnForm, ConfirmCancelFooter } from "../../../../components/organisms";
import { TextArea, WhiteHeader } from "../../../../components/atoms";
import {
    Container,
    Content,
    PageDescription,
    PageInfo,
    PageTitle,
    StyledForm,
} from "./styles";
import colors from "../../../../styles/colors";
import { LoadingContainer, ModalComplex } from "../../../../components/molecules";
import { Header } from "../../../../components/organisms";
import { getEmployees } from "../../../../services/endpoints/users";
import Yup from "../../../../config/yup";
import { createRequest } from "../../../../services/endpoints/requests";
import { getActionDetails } from "../../../../services/endpoints/actions";
import { inject, observer } from "mobx-react";
import { toast } from "react-toastify";

const ChangeResponsible = ({
    UserStore: { user },
}) => {
    const formRef = useRef();

    const history = useHistory();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [loadingSubmitForm, setLoadingSubmitForm] = useState(false);
    const [modalConfirmTransferVisible, setModalConfirmTransferVisible] = useState(false);
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const action = await getActionDetails(id);

            if (
                !(action?.responsible?.id)
                && (action?.requests?.filter(item => item.type === 1 && item.status === 1).length === 0)
                && action?.user?.id
                && action.user.id === user.id
            ) {
                const { employees } = await getEmployees();

                setUserOptions(employees.filter(item => item.id !== user.id));
                setLoading(false);
            } else {
                toast.warning('Essa ação de melhoria já possuí um responsável ou já existe uma solicitação em aberto');
                history.goBack();
            }
        };

        getData();
    }, [history, id, user.id]);

    const handleSubmit = async (data) => {
        try {
            setLoadingSubmitForm(true);

            const schema = Yup.object().shape({
                user: Yup.string().required().label("Usuário"),
                justification: Yup.string().required().label("Justificativa"),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            const responseCreate = await createRequest({
                justification: data.justification,
                responsibleId: data.user,
                newResponsibleId: data.user,
                requestTypeId: 1, // Tipo - Aceite, Recusa
                actionId: id,
                antecedentRequestId: null,
            });

            if (responseCreate) {
                history.goBack();
            } else {
                setModalConfirmTransferVisible(false);
                setLoadingSubmitForm(false);
            }
        } catch (error) {
            setModalConfirmTransferVisible(false);
            setLoadingSubmitForm(false);

            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes"}
                    onClose={() => history.goBack()}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <PageInfo>
                                <PageTitle>
                                    Transferir para outro usuário
                                </PageTitle>
                                <PageDescription>
                                    Informe o usuário que você deseja transferir
                                </PageDescription>
                            </PageInfo>
                            <StyledForm ref={formRef} onSubmit={handleSubmit}>
                                <ButtonMultiSelectUnForm
                                    labelSearchInput={"Selecionar usuário"}
                                    fieldName={"Selecionar usuário"}
                                    pageTitle={"Selecionar usuário"}
                                    fieldsFilter={["name"]}
                                    category={"user"}
                                    single={true}
                                    name={"user"}
                                    items={userOptions}
                                    onSave={(items) => setUserOptions([...items])}
                                />
                                <TextArea
                                    label={"Justificativa"}
                                    placeholder={"Escreva sua justificativa aqui"}
                                    name={"justification"}
                                />
                            </StyledForm>
                        </Fragment>
                    )}
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Avançar"}
                    confirmButtonIcon={<FaCheck />}
                    cancelButtonLabel={"Cancelar"}
                    confirmButtonDisabled={loading}
                    onConfirm={() => setModalConfirmTransferVisible(true)}
                    onCancel={() => history.goBack()}
                />
            </Container>
            <ModalComplex
                title={"Transferir ação"}
                description={"Ao prosseguir, a responsabilidade desta ação será transferida para outro usuário. Este ato não poderá ser revertido. Tem certeza que deseja seguir com esta ação?"}
                nameModal={"confirm-transfer"}
                visible={modalConfirmTransferVisible}
                onCancel={() => setModalConfirmTransferVisible(false)}
                onConfirm={() => formRef.current.submitForm()}
                icon={<FaExchangeAlt size={40} color={colors.client} />}
                confirmButtonLabel={"Sim, transferir"}
                confirmButtonLoading={loadingSubmitForm}
                cancelButtonLabel={"Não, cancelar"}
            />
        </Fragment>
    );
};

export default inject('UserStore')(observer(ChangeResponsible));

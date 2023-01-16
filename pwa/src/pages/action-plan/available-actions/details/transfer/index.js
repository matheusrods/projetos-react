import React, { Fragment, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { FaCheck, FaExchangeAlt } from "react-icons/fa";
import { ButtonMultiSelectUnForm, ConfirmCancelFooter } from "../../../../../components/organisms";
import { TextArea, WhiteHeader } from "../../../../../components/atoms";
import {
    Container,
    Content,
    PageDescription,
    PageInfo,
    PageTitle,
    StyledForm,
} from "./styles";
import colors from "../../../../../styles/colors";
import { LoadingContainer, ModalComplex } from "../../../../../components/molecules";
import { Header } from "../../../../../components/organisms";
import { getEmployees } from "../../../../../services/endpoints/users";
import Yup from "../../../../../config/yup";
import { createRequest, updateRequest } from "../../../../../services/endpoints/requests";
import { inject, observer } from "mobx-react";

const AvailableActionsDetailsTransfer = ({
    UserStore: { user },
    PermissionStore: { hasPermission }
}) => {
    const formRef = useRef();

    const history = useHistory();

    const { id, requestId } = useParams();

    const [loading, setLoading] = useState(true);
    const [loadingSubmitForm, setLoadingSubmitForm] = useState(false);
    const [modalConfirmTransferVisible, setModalConfirmTransferVisible] = useState(false);
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const { employees } = await getEmployees();

            setUserOptions(employees.filter(item => item.id !== user.id));

            setLoading(false);
        };

        getData();
    }, [user.id]);

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

            const responseUpdate = await updateRequest({
                requestId: requestId,
                statusId: 3,
                showSuccessMessage: false
            });

            const responseCreate = await createRequest({
                justification: data.justification,
                responsibleId: data.user,
                newResponsibleId: data.user,
                requestTypeId: 1, // Tipo - Aceite, Recusa
                actionId: id,
                antecedentRequestId: requestId,
            });

            if (responseUpdate && responseCreate) {
                history.push("/available-actions");
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

    return hasPermission(3) ? (
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
                        <>
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
                                    onSave={(items) =>
                                        setUserOptions([...items])
                                    }
                                />
                                <TextArea
                                    label={"Justificativa"}
                                    placeholder={
                                        "Escreva sua justificativa aqui"
                                    }
                                    name={"justification"}
                                />
                            </StyledForm>
                        </>
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
                description={
                    "Ao prosseguir, a responsabilidade desta ação será transferida para outro usuário. Este ato não poderá ser revertido. Tem certeza que deseja seguir com esta ação?"
                }
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
    ) : <Redirect to={'/action-plan'} />;
};

export default inject('UserStore', 'PermissionStore')(observer(AvailableActionsDetailsTransfer));

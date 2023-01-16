import React, { Fragment, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { ConfirmCancelFooter, Header } from "../../../../../components/organisms";
import { TextArea, WhiteHeader } from "../../../../../components/atoms";
import { Form } from "@unform/web"
import {
    Container,
    Content,
    PageDescription,
    PageInfo,
    PageTitle,
} from "./styles";
import colors from "../../../../../styles/colors";
import { ModalComplex } from "../../../../../components/molecules";
import { updateRequest } from "../../../../../services/endpoints/requests";
import Yup from "../../../../../config/yup";
import { inject, observer } from "mobx-react";

const AvailableActionsDetailsRefuse = ({
    PermissionStore: { hasPermission }
}) => {
    const { requestId } = useParams();

    const history = useHistory();

    const formRef = useRef();

    const [loadingSubmitForm, setLoadingSubmitForm] = useState(false);
    const [modalConfirmRefuseVisible, setModalConfirmRefuseVisible] = useState(false);

    const handleSubmit = async (data) => {
        try {
            setLoadingSubmitForm(true);
            const schema = Yup.object().shape({
                justification: Yup.string().required().label("Justificativa"),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            const responseUpdate = await updateRequest({
                requestId: requestId,
                statusId: 3,
                generateNewRequest: true,
            });

            if (responseUpdate) {
                history.push("/available-actions");
            } else {
                setModalConfirmRefuseVisible(false);
                setLoadingSubmitForm(false);
            }
        } catch (error) {
            setModalConfirmRefuseVisible(false);
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

    return hasPermission(4) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes"}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Recusar ação</PageTitle>
                        <PageDescription>Justifique sua recusa</PageDescription>
                    </PageInfo>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <TextArea
                            label={"Justificativa"}
                            placeholder={"Escreva sua justificativa aqui"}
                            name={"justification"}
                        />
                    </Form>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Recusar"}
                    confirmButtonIcon={<FaTimes />}
                    cancelButtonLabel={"Cancelar"}
                    confirmButtonColor={colors.redAux}
                    onConfirm={() => setModalConfirmRefuseVisible(true)}
                    onCancel={() => history.goBack()}
                />
                <ModalComplex
                    title={"Recusar ação"}
                    description={"Ao prosseguir, a ação será recusada. Este ato não pode ser revertido. Tem certeza que deseja recusar esta ação?"}
                    nameModal={"confirm-refuse"}
                    visible={modalConfirmRefuseVisible}
                    onCancel={() => setModalConfirmRefuseVisible(false)}
                    onConfirm={() => formRef.current.submitForm()}
                    icon={<FaExclamationTriangle size={40} color={colors.redAux} />}
                    confirmButtonColor={colors.redAux}
                    confirmButtonLoading={loadingSubmitForm}
                    confirmButtonLabel={"Sim, recusar"}
                    cancelButtonLabel={"Não, cancelar"}
                />
            </Container>
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject('PermissionStore')(observer(AvailableActionsDetailsRefuse));

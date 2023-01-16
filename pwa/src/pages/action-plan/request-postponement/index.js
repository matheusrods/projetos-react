import React, { Fragment, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { FaCheck, FaRegCalendarTimes } from "react-icons/fa";
import { ConfirmCancelFooter, Header } from "../../../components/organisms";
import {
    InputDatePickerUnForm,
    TextArea,
    WhiteHeader,
} from "../../../components/atoms";
import { ModalComplex } from "../../../components/molecules";
import { Form } from "@unform/web";
import colors from "../../../styles/colors";
import {
    Container,
    Content,
    PageDescription,
    PageInfo,
    PageTitle,
    InputField,
} from "./styles";
import { createRequest } from "../../../services/endpoints/requests";
import { inject, observer } from "mobx-react";

const RequestPostponement = ({ PermissionStore: { hasPermission } }) => {
    const history = useHistory();

    const { id } = useParams();

    const formRef = useRef(null);

    const [modalConfirmRefuseVisible, setModalConfirmRefuseVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        setLoading(true)

        const response = await createRequest({
            justification: data.justification,
            newDeadline: data.new_deadline,
            requestTypeId: 2, // Tipo - Postergação
            actionId: id,
        });

        response && history.goBack();

        setLoading(false)
    };

    return hasPermission(6) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes da ação"}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Solicitar postergação</PageTitle>
                        <PageDescription>
                            Justifique sua solicitação
                        </PageDescription>
                    </PageInfo>
                    <Form ref={formRef} onSubmit={(data) => handleSubmit(data)}>
                        <InputField>
                            <TextArea
                                label={"Justificativa"}
                                placeholder={"Escreva sua justificativa aqui"}
                                name={"justification"}
                            />
                        </InputField>
                        <InputField>
                            <InputDatePickerUnForm
                                minDate={new Date()}
                                label={"Novo Prazo"}
                                name={"new_deadline"}
                            />
                        </InputField>
                    </Form>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Enviar"}
                    confirmButtonIcon={<FaCheck />}
                    cancelButtonLabel={"Cancelar"}
                    onConfirm={() => setModalConfirmRefuseVisible(true)}
                    onCancel={() => history.goBack()}
                />
            </Container>
            <ModalComplex
                title={"Postergação"}
                description={
                    "Ao prosseguir, o autor da ação será notificado e poderá ou não seguir com a postergação. Você deseja prosseguir?"
                }
                nameModal={"confirm-postponement"}
                visible={modalConfirmRefuseVisible}
                onCancel={() => setModalConfirmRefuseVisible(false)}
                onConfirm={() => formRef.current.submitForm()}
                icon={
                    <FaRegCalendarTimes size={40} color={colors.blueAux} />
                }
                confirmButtonLabel={"Sim, solicitar"}
                confirmButtonLoading={loading}
                cancelButtonLabel={"Não, voltar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(RequestPostponement));

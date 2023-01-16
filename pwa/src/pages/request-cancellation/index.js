import React, { Fragment, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { ConfirmCancelFooter, Header } from "../../components/organisms";
import { TextArea, WhiteHeader } from "../../components/atoms";
import { Form } from "@unform/web";
import colors from "../../styles/colors";
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
} from "./styles";
import { ModalComplex } from "../../components/molecules";
import { createRequest } from "../../services/endpoints/requests";
import { inject, observer } from "mobx-react";

const RequestCancellation = ({ PermissionStore: { hasPermission } }) => {
    const history = useHistory();

    const { id } = useParams();

    const formRef = useRef(null);

    const [
        modalConfirmCancellationVisible,
        setModalConfirmCancellationVisible,
    ] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        setLoading(true);

        const response = await createRequest({
            justification: data.justification,
            requestTypeId: 3, // Tipo - Cancelamento
            actionId: id,
        });

        response && history.push('/action-plan');

        setLoading(false);
    };

    return hasPermission(7) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes da ação"}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Solicitar cancelamento</PageTitle>
                        <PageDescription>
                            Justifique sua solicitação
                        </PageDescription>
                    </PageInfo>
                    <Form ref={formRef} onSubmit={(data) => handleSubmit(data)}>
                        <TextArea
                            label={"Justificativa"}
                            placeholder={"Escreva sua justificativa aqui"}
                            name={"justification"}
                        />
                    </Form>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Solicitar"}
                    confirmButtonIcon={<FaTimes />}
                    cancelButtonLabel={"Cancelar"}
                    confirmButtonColor={colors.redAux}
                    onConfirm={() => setModalConfirmCancellationVisible(true)}
                    onCancel={() => history.goBack()}
                />
            </Container>
            <ModalComplex
                title={"Cancelamento"}
                description={"Ao prosseguir, o autor da ação será notificado e poderá ou não seguir com o cancelamento. Você deseja prosseguir?"}
                nameModal={"confirm-cancellation "}
                visible={modalConfirmCancellationVisible}
                onCancel={() => setModalConfirmCancellationVisible(false)}
                onConfirm={() => formRef.current.submitForm()}
                icon={<FaTrashAlt size={40} color={colors.redAux} />}
                confirmButtonLabel={"Sim, solicitar"}
                confirmButtonLoading={loading}
                cancelButtonLabel={"Não, voltar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject("PermissionStore")(observer(RequestCancellation));

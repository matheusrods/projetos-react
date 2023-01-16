import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { ConfirmCancelFooter, Header } from "../../components/organisms";
import { TextArea, WhiteHeader } from "../../components/atoms";
import { Form } from "@unform/web";
import { Container, Content, PageInfo, PageTitle } from "./styles";

const SendFeedback = () => {
    const history = useHistory();
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // const { id } = useParams();

    const handleSubmit = async (data) => {
        setLoading(true)

        // const response = await createRequest({
        //     justification: data.justification,
        //     // requestTypeId: ??, // Tipo - Devolutiva
        //     actionId: id,
        // });

        // response && history.goBack();

        history.goBack();

        setLoading(false)
    };

    return (
        <>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Detalhes da ação"}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Enviar devolutiva</PageTitle>
                    </PageInfo>
                    <Form ref={formRef} onSubmit={data => handleSubmit(data)}>
                        <TextArea
                            label={"O que você deseja informar?"}
                            placeholder={"Escreva sua devolutiva aqui"}
                            name={"justification"}
                        />
                    </Form>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Enviar"}
                    confirmButtonIcon={<FaPaperPlane />}
                    confirmButtonLoading={loading}
                    cancelButtonLabel={"Cancelar"}
                    onConfirm={() => formRef.current.submitForm()}
                    onCancel={() => history.goBack()}
                />
            </Container>
        </>
    );
};

export default SendFeedback;

import React, { Fragment, useEffect } from "react";
import { FaCheck, FaHome } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { CompanyHeader, SingleNextButton } from "../../../../components/atoms";
import { Header } from "../../../../components/organisms";
import colors from "../../../../styles/colors";
import {
    Container,
    Content,
    Title,
    Description,
    IconContainer,
} from "./styles";

const NewRegisterComplete = () => {
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => history.push('/observer-ehs'), 3000);

        return () => clearTimeout(timer);
    }, [history]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={"Observador EHS"}
                    onClose={() => alert("Fechar")}
                />
                <Content>
                    <IconContainer>
                        <FaCheck size={32} color={colors.greenAux} />
                    </IconContainer>
                    <Title>Observação registrada com sucesso!</Title>
                    <Description>
                        Você será redirecionado para a tela inicial
                    </Description>
                </Content>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => {
                        history.push("/observer-ehs");
                    }}
                    nextLabel={"Ir para início"}
                    icon={<FaHome />}
                />
            </Container>
        </Fragment>
    );
};

export default NewRegisterComplete;

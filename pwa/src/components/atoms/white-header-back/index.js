import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import colors from "../../../styles/colors";
import { Title, Container, Content } from "./styles";

function WhiteHeaderBack({ title, onBack, fixed, ...rest }) {
    return (
        <Container fixed={fixed} {...rest}>
            <Content>
                <FaAngleLeft size={27} onClick={onBack} color={colors.gray6} />
                <Title>{title}</Title>
            </Content>
        </Container>
    );
}

export default WhiteHeaderBack;

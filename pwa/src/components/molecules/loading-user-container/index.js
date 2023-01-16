import React from "react";
import colors from "../../../styles/colors";

import { Container, LoadingIcon, Text } from "./styles";

function LoadingUserContainer({ text = 'Carregando dados do usuário...' }) {
    return (
        <Container>
            <LoadingIcon size={48} color={colors.client} />
            <Text>{text}</Text>
        </Container>
    );
}

export default LoadingUserContainer;

import React from "react";
import colors from "../../../styles/colors";

import { Container, LoadingIcon, Text } from "./styles";

function LoadingContainer({text = 'Carregando...'}) {
    return (
        <Container>
            <LoadingIcon size={48} color={colors.client} />
            <Text>{text}</Text>
        </Container>
    );
}

export default LoadingContainer;

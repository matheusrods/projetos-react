import React from "react";
import { FaInbox } from "react-icons/fa";

import { Container, IconContainer, ActionContainerDescription } from "./styles";

function EmptyListContainer({ hasBackground = false }) {
    return (
        <Container hasBackground={hasBackground}>
            <IconContainer>
                <FaInbox size={64} />
            </IconContainer>
            <ActionContainerDescription>
                Tudo certo por aqui!
            </ActionContainerDescription>
            <ActionContainerDescription>
                Nenhum registro foi encontrado.
            </ActionContainerDescription>
        </Container>
    );
}

export default EmptyListContainer;

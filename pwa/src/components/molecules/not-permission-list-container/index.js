import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import { Container, IconContainer, ActionContainerDescription } from "./styles";

function NotPermissionListContainer({ hasBackground = false }) {
    return (
        <Container hasBackground={hasBackground}>
            <IconContainer>
                <FaExclamationTriangle size={64} />
            </IconContainer>
            <ActionContainerDescription>
                Não é possível acessar!
            </ActionContainerDescription>
            <ActionContainerDescription>
                O seu perfil não tem permissão para essa ação.
            </ActionContainerDescription>
        </Container>
    );
}

export default NotPermissionListContainer;

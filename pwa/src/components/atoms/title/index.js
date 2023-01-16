import React from "react";
import {
    Container,
} from "./styles";
const Title = ({
    text,
    icon,
    size,
    color,
    borderBottom = false,
}) => {
    return (
        <Container
            size={size}
            color={color}
            borderBottom={borderBottom}
        >
            {icon} {text}
        </Container>
    );
};

export default Title;

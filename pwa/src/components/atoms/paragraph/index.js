import React from "react";
import {
    Container, IconWrapper, Text,
} from "./styles";
const Paragraph = ({
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
            {icon && (
                <IconWrapper>
                    {icon}
                </IconWrapper>
            )}
            <Text>{text}</Text>
        </Container>
    );
};

export default Paragraph;

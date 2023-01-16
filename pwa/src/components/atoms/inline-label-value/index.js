import React from "react";
import {
    Container, Label, SoftLabel, Value, Wrapper
} from "./styles";
const InlineLabelValue = ({
    label,
    value,
    borderBottom = true,
    softLabel,
    flexAlign = "center",
    valueColor,
    iconValue
}) => {
    return (
        <Container
            borderBottom={borderBottom}
            flexAlign={flexAlign}
        >
            <Wrapper>
                <Label>{label}</Label>
                {softLabel && <SoftLabel>{softLabel}</SoftLabel>}
            </Wrapper>

            <Value valueColor={valueColor}>
                {iconValue} {value}
            </Value>
        </Container>
    );
};

export default InlineLabelValue;

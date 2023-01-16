import React from "react";
import {
    Container, Label, Value,
    Wrapper,
} from "./styles";
import {ShapeCard} from "../../atoms";

const CardTitleValue = ({
    title = '',
    subtitle = '',
    value = '',
    icon
}) => {
    return (
        <ShapeCard
            shadow
        >
            <Container>
                <Wrapper>
                    <Label>{title}</Label>
                    <Label>{subtitle}</Label>
                </Wrapper>
                <Wrapper>
                    <Value>{icon}{value}</Value>
                </Wrapper>
            </Container>


        </ShapeCard>
    );
};

export default CardTitleValue;

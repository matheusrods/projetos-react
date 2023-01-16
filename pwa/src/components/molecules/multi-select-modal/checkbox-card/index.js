import React from "react";
import { FaCheck } from "react-icons/fa";
import { Container, Info, Check } from "./styles";

const CheckboxCard = ({
    name,
    avatar,
    onPress,
    selected,
    radio,
    disabled,
    ...rest
}) => {
    return (
        <Container type={'button'} onClick={onPress} {...rest} disabled={disabled}>
            <Check radio={radio} className={'check'} selected={selected}>{selected && <FaCheck />}</Check>
            <Info selected={selected} className={'info'}>{name}</Info>
        </Container>
    );
};

export default CheckboxCard;

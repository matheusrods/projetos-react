import React from "react";
import {
    Value,
    Wrapper,
    Total
} from "./styles";
import {ShapeCard, Title} from "../../atoms";
import {FiCheckCircle} from "react-icons/fi";
import colors from "../../../styles/colors";
const CardConformity = ({
    label = "Conformes",
    icon,
    total,
    value,
    color = colors.greenAux,
    secondColor = colors.gray3,
}) => {
    return (
        <ShapeCard
            shadow
        >
            <Title
                text={label}
                icon={icon ?? <FiCheckCircle size={24} color={color}/>}
            />
            <Wrapper>
                <Value color={color}>{value}</Value>
                <Total secondColor={secondColor}>/{total}</Total>
            </Wrapper>
        </ShapeCard>
    );
};

export default CardConformity;

import React from "react";
import {
    Value,
    Wrapper,
} from "./styles";
import {ShapeCard, Title} from "../../atoms";
import {FiPercent} from "react-icons/fi";
import colors from "../../../styles/colors";
const CardPercent = ({
    label = "Atendimento",
    icon,
    percent,
    color = colors.blue2,
}) => {
    return (
        <ShapeCard
            shadow
        >
            <Title
                text={label}
                icon={icon ?? <FiPercent size={24} color={color}/>}
            />
            <Wrapper>
                <Value color={color}>{percent}%</Value>
            </Wrapper>
        </ShapeCard>
    );
};

export default CardPercent;

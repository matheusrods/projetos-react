import React from "react";
import { FaStar } from "react-icons/fa";
import colors from "../../../styles/colors";
import { Container, Label, Wrapper } from "./styles";

const StarRating = ({
    label,
    stars = 5,
    starSize = 25,
    selectedStars = 0,
    onChange,
    ...rest
}) => {
    const renderStars = () => {
        const elements = [];

        for (let i = 1; i <= 5; i++) {
            elements.push(
                <FaStar
                    key={i}
                    size={starSize}
                    color={selectedStars >= i ? colors.orange2 : colors.gray2}
                    onClick={() => onChange && onChange(i)}
                />
            );
        }

        return elements;
    };

    return (
        <Container {...rest}>
            {label && <Label>{label}</Label>}
            <Wrapper pointer={!!onChange}>{renderStars()}</Wrapper>
        </Container>
    );
};

export default StarRating;

import React from "react";
import colors from "../../../styles/colors";

import {
    Container,
    Header,
    Label,
    Title,
    OptionsButton,
} from "./styles";

function QualityAnalysisCard({
    title,
    controlled,
    description,
    showOptions = false,
    onClickOptions = () => {},
    ...rest
}) {
    return (
        <Container {...rest}>
            <Header>
                <Title>{title}</Title>
                {showOptions && (
                    <OptionsButton
                        size={14}
                        color={colors.gray5}
                        onClick={() => onClickOptions()}
                    />
                )}
            </Header>
            <Label>
                <span>Controlado?</span>
                <span>{controlled}</span>
            </Label>
            {description && <Label direction={"column"}>
                <span>Descrição</span>
                <span>{description}</span>
            </Label>}
        </Container>
    );
}

export default QualityAnalysisCard;

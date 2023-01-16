import React from "react";
import colors from "../../../styles/colors";

import {
    Container,
    ObservedItemHeader,
    ObservedItemLabel,
    ObservedItemTitle,
    Flex,
    CriticismDot,
    OptionsButton,
} from "./styles";

function ObservedItemCard({
    title,
    controlled,
    criticism,
    criticismColor,
    description,
    showOptions = false,
    onClickOptions = () => { },
    ...rest
}) {
    return (
        <Container {...rest}>
            <ObservedItemHeader>
                <ObservedItemTitle>{title}</ObservedItemTitle>
                {showOptions && (
                    <OptionsButton
                        size={14}
                        color={colors.gray5}
                        onClick={() => onClickOptions()}
                    />
                )}
            </ObservedItemHeader>
            <ObservedItemLabel>
                <span>Controlado?</span>
                <span>{controlled}</span>
            </ObservedItemLabel>
            {criticism &&
                <ObservedItemLabel>
                    <span>Criticidade</span>
                    <Flex>
                        <span>{criticism}</span>
                        {criticismColor && <CriticismDot color={criticismColor} />}
                    </Flex>
                </ObservedItemLabel>
            }
            {description &&
                <ObservedItemLabel direction={"column"}>
                    <span>Descrição</span>
                    <span>{description}</span>
                </ObservedItemLabel>
            }
        </Container>
    );
}

export default ObservedItemCard;

import React from 'react';
import { FaCheck } from 'react-icons/fa';

import { Button, CheckBox, Label } from './styles';

/**
 * example params
 * @param colorDefault={colors.gray2}
 * @param colorActive={colors.greenAux}
 * @param type={"button"}
 * @param selected={option[reference] === selected}
 * @param onSelect={() => onSelect(option[reference])}
 */

function RadioButtonMinimal({
    label,
    selected,
    colorActive,
    colorDefault,
    onSelect,
    ...rest
}) {
    return (
        <Button selected={selected} onClick={onSelect} {...rest}>
            <CheckBox
                colorActive={colorActive}
                colorDefault={colorDefault}
                selected={selected}
            >
                <FaCheck />
            </CheckBox>
            <Label>{label}</Label>
        </Button>
    );
}

export default RadioButtonMinimal;

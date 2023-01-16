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

function CheckBoxItem({
    label,
    selected,
    colorActive,
    colorDefault,
    onSelect,
    backgroundColor,
    borderColor,
    paddingCheck,
    width = '100%',
    ...rest
}) {
    return (
        <Button
            selected={selected}
            onClick={onSelect}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            paddingCheck={paddingCheck}
            width={width}
            {...rest}
        >
            <CheckBox
                colorActive={colorActive}
                colorDefault={colorDefault}
                selected={selected}
            >
                <FaCheck fontSize={'10'} />
            </CheckBox>
            <Label colorActive={colorActive} selected={selected}>
                {label}
            </Label>
        </Button>
    );
}

export default CheckBoxItem;

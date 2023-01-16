import React from "react";
import CheckBoxItem from "../../atoms/checkbox";

import {
    ContainerRadioButtons,
} from "./styles";

/**
 * example params
 * @param colorDefault={colors.gray2}
 * @param colorActive={colors.greenAux}
 * @param type={"button"}
 * @param selected={option[reference] === selected}
 * @param onSelect={() => onSelect(option[reference])}
 */

function CheckboxGroup({ options = [], paddingCheck ,backgroundColor, borderColor, reference = 'id', onSelect, selected, colorActive, colorDefault, ...rest}) {
    return (
        <ContainerRadioButtons>
        {options.map((option, index) => {
            const { label } = option;

            return (
                <CheckBoxItem
                    key={index.toString()}
                    label={label}
                    onSelect={() => onSelect(option[reference])}
                    selected={selected === option[reference] || (Array.isArray(selected) && selected.includes(option[reference]))}
                    type={"button"}
                    colorActive={colorActive}
                    colorDefault={colorDefault}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    paddingCheck={paddingCheck}
                />
            );
        })}
      </ContainerRadioButtons>
    );
}

export default CheckboxGroup;

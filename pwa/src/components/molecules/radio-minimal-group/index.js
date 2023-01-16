import React from "react";
import { RadioButtonMinimal } from "../../atoms";

import {
    ContainerRadioButtons,
} from "./styles";

/**
 * example params
 * @param colorDefault={colors.gray2}
 * @param colorActive={colors.greenAux}
 * @param flexDirection={'row'}
 * @param type={"button"}
 * @param selected={option[reference] === selected}
 * @param onSelect={() => onSelect(option[reference])}
 */

function RadioMinimalGroup({ options = [], reference = 'id', onSelect, selected, colorActive, colorDefault, flexDirection, ...rest}) {
    return (
        <ContainerRadioButtons flexDirection={flexDirection?? 'row'}>
        {options.map((option, index) => {
            const { label } = option;

            return (
                <RadioButtonMinimal
                    key={index.toString()}
                    label={label}
                    onSelect={() => onSelect(option[reference])}
                    selected={option[reference] === selected}
                    type={"button"}
                    colorActive={colorActive}
                    colorDefault={colorDefault}
                />
            );
        })}
      </ContainerRadioButtons>
    );
}

export default RadioMinimalGroup;

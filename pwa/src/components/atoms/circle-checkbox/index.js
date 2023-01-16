import React from 'react';
import PropTypes from 'prop-types';

import {
    CheckboxContainer,
    HiddenCheckbox,
    Icon,
    StyledCheckbox
} from './styles';

/**
 * @param {boolean} checked Estado de seleção
 * @example <label> <CircleCheckbox checked={checkedState} /> Receber Newsletter </label>
 * @description É importante notar que, ao contrário do input nativo,
 * nosso componente Checkbox deve ser envolvido por uma tag < label >.
 * O label será o responsável por acionar a callback no evento onChange da caixa de seleção,
 * uma vez que o elemento da caixa de seleção nativo ficará visualmente oculto.
 */

function CircleCheckbox({ checked, ...props }) {
    return (
        <CheckboxContainer>
            <HiddenCheckbox checked={checked} {...props} />
            <StyledCheckbox checked={checked}>
                <Icon />
            </StyledCheckbox>
        </CheckboxContainer>
    );
}

export default CircleCheckbox;

CircleCheckbox.propTypes = {
    checked: PropTypes.bool
};

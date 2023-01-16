import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Button, CheckBox } from './styles';

const RadioButton = ({ label, selected, onSelect, ...rest }) => {
    return (
        <Button selected={selected} onClick={onSelect} {...rest}>
            <CheckBox selected={selected}>
                <FaCheck />
            </CheckBox>
            <span>{label}</span>
        </Button>
    );
}

export default RadioButton;

import React from 'react';
import { RadioButton } from '../../atoms';
import { Container } from './styles';

const RadioButtonGroup = ({ options = [], reference = 'id', onSelect, selected, ...rest }) => {
    return (
        <Container>
            {options.map((option, index) => {
                const { label } = option;

                return (
                    <RadioButton
                        key={index.toString()}
                        label={label}
                        onSelect={() => onSelect(option[reference])}
                        selected={option[reference] === selected}
                        type={"button"}
                    />
                );
            })}
        </Container>
    );
}

export default RadioButtonGroup;

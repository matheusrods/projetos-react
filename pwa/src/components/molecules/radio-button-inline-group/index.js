import React from 'react';
import { RadioButton } from '../../atoms';
import { Container, Label, List } from './styles';

const RadioButtonInlineGroup = ({ label, options = [], reference = 'id', onSelect, selected, ...rest }) => {
    return (
        <Container>
            {label && <Label>{label}</Label>}
            <List>
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
            </List>
        </Container>
    );
}

export default RadioButtonInlineGroup;

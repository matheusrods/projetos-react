import React, { forwardRef } from 'react';
import { Container, Label, Input, Error } from './styles';

const TextAreaDefault = (
    { name, value, onChange, label, placeholder, defaultValue, error, ...rest },
    ref
) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Input
                ref={ref}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
};

export default forwardRef(TextAreaDefault);

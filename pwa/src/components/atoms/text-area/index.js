import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Container, Label, Input, Error } from './styles';

const TextArea = ({ name, label, placeholder, ...rest }) => {
    const inputRef = useRef(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            <Label>{label}</Label>
            <Input
                ref={inputRef}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}

export default TextArea;

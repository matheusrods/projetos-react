import { React, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Container, FieldName, TextInput, TextInputMask, ErrorMessage } from './styles';

export const Input = ({ name, label, mask, hasErrorExtern, ...rest }) => {
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
            {label && <FieldName hasError={error ?? hasErrorExtern}>{label}</FieldName>}
            {mask
                ? <TextInputMask
                    ref={inputRef}
                    defaultValue={defaultValue}
                    mask={mask}
                    maskChar={null}
                    error={error ? 'true' : hasErrorExtern ? 'true' : undefined}
                    {...rest}
                />
                : <TextInput
                    ref={inputRef}
                    defaultValue={defaultValue}
                    error={error ? 'true' : hasErrorExtern ? 'true' : undefined}
                    {...rest}
                />
            }
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
}

export default Input;

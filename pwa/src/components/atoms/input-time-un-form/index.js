import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { FaClock } from 'react-icons/fa';
import {
    Container,
    Content,
    ContainerIcon,
    FieldName,
    Input,
    Error
} from './styles';

const InputTimeUnForm = ({ label, name, placeholder, ...rest }) => {
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const inputRef = useRef(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    const handleChange = (value) => {
        inputRef.current.value = value;
    };

    const handleInput = (e) => {
        const newValue = e.target.value;

        switch (newValue.length) {
            case 0:
                handleChange('');
                break;
            case 1:
                if (parseInt(newValue[0]) >= 0 && parseInt(newValue[0]) <= 2) {
                    handleChange(newValue);
                } else {
                    handleChange(newValue.slice(0, -1));
                }
                break;
            case 3:
                if (parseInt(newValue[0]) !== 2) {
                    handleChange(newValue);
                } else if (
                    parseInt(newValue[0]) === 2 &&
                    parseInt(newValue[1]) >= 0 &&
                    parseInt(newValue[1]) <= 3
                ) {
                    handleChange(newValue);
                } else {
                    handleChange(newValue.slice(0, -2));
                }
                break;
            case 4:
                if (parseInt(newValue[3]) >= 0 && parseInt(newValue[3]) <= 5) {
                    handleChange(newValue);
                } else {
                    handleChange(newValue.slice(0, -1));
                    break;
                }
                break;
            default:
                handleChange(newValue);
                break;
        }

        e.target.value = inputRef.current.value;
    };

    return (
        <Container>
            {label && <FieldName>{label}</FieldName>}
            <Content>
                <Input
                    placeholder={placeholder}
                    mask={'99:99'}
                    maskChar={null}
                    onChange={handleInput}
                    name={name}
                    ref={inputRef}
                    defaultValue={defaultValue}
                    {...rest}
                />
                <ContainerIcon>
                    <FaClock />
                </ContainerIcon>
            </Content>
            {error && <Error>{error}</Error>}
        </Container>
    );
};

export default InputTimeUnForm;

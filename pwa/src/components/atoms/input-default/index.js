import { React } from 'react';
import { Container, Label, TextInput, ErrorMessage, ContainerInput } from './styles';

export const InputDefault = ({
    type,
    name,
    label,
    placeholder,
    errorMessage,
    onChange,
    value,
    width,
    flexDirection,
    min,
    max,
    defaultValue,
    ...rest
}) => {
    return (
        <Container flexDirection={flexDirection}>
            <Label htmlFor={name}>{label}</Label>
            <ContainerInput>
                <TextInput
                    onChange={onChange}
                    min={min}
                    max={max}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    id={name}
                    width={width}
                    {...rest}
                />
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </ContainerInput>
        </Container>
    );
};

export default InputDefault;

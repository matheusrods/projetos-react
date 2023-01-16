import React from 'react';
import { FaClock } from 'react-icons/fa';
import { Container, Content, ContainerIcon, FieldName, Input } from './styles';

const InputTime = ({ label, value, placeholder, onChange, defaultValue, ...rest }) => {
    const handleInput = (e) => {
        const newValue = e.target.value;

        switch (newValue.length) {
            case 1:
                if (parseInt(newValue[0]) >= 0 && parseInt(newValue[0]) <= 2) {
                    onChange(newValue);
                } else {
                    onChange(value);
                }
                break;
            case 3:
                if (parseInt(newValue[0]) !== 2) {
                    onChange(newValue);
                } else if (parseInt(newValue[0]) === 2 && parseInt(newValue[1]) >= 0 && parseInt(newValue[1]) <= 3) {
                    onChange(newValue);
                } else {
                    onChange(value);
                }
                break;
            case 4:
                if (parseInt(newValue[3]) >= 0 && parseInt(newValue[3]) <= 5) {
                    onChange(newValue);
                } else {
                    onChange(value);
                }
                break;
            default:
                onChange(newValue);
                break;
        }
    }

    return (
        <Container>
            {label && <FieldName>{label}</FieldName>}
            <Content>
                <Input
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    value={value ?? ''}
                    mask={'99:99'}
                    maskChar={null}
                    onChange={handleInput}
                    {...rest}
                />
                <ContainerIcon>
                    <FaClock />
                </ContainerIcon>
            </Content>
        </Container>
    );
}

export default InputTime;

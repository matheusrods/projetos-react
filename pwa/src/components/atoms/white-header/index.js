import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Container, Title } from './styles';

const WhiteHeader = ({ title, onClose, fixed, ...rest }) => {
    return (
        <Container fixed={fixed} {...rest}>
            <Title>{title}</Title>
            <FaTimes color={'#5E687D'} size={20} onClick={onClose} />
        </Container>
    );
}

export default WhiteHeader;

import React from 'react';
import { Container } from './styles';

const SideModal = ({ visible, children, top, position = 'fixed', height, zIndex = 100, ...rest }) => {
    return (
        <Container top={top} visible={visible} position={position} height={height} zIndex={zIndex} {...rest}>
            {children}
        </Container>
    );
};

export default SideModal;

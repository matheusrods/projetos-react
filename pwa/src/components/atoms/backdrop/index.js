import React from 'react';
import { Container }from './styles';

const Backdrop = ({ nameModal, visible, onClose, children, ...rest }) => {
    return (
        <Container 
            id={`${nameModal}-backdrop`}
            visible={visible}
            onClick={(e) => e.target.id === `${nameModal}-backdrop` && onClose(false)}
            {...rest}
        >
            {children}
        </Container>
    );
}

export default Backdrop;
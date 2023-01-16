import React, { useRef } from 'react';
import { Container } from './styles';

const Modal = ({ visible, children, ...rest }) => {
    const modalRef = useRef(null);
    
    return (
        <Container 
            ref={modalRef}
            visible={visible} 
            modalHeight={modalRef?.current ? modalRef.current.getBoundingClientRect().height : 300 }
            {...rest}
        >
            {children}
        </Container>
    )
}

export default Modal;
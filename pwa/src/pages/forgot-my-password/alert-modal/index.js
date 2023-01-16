import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useHistory } from 'react-router';

import { Button, Container, Content, Details, IconContainer, Title } from './styles';

function AlertModal({ visible, icon, title, message, error = false, onPress, buttonLabel }) {
    const history = useHistory();

    return (
        <Container visible={visible}>
            <Content>
                <IconContainer error={error}>
                    {icon ?? <FaCheck />}
                </IconContainer>
                <Title>{title}</Title>
                <Details>{message}</Details>
            </Content>
            <Button
                label={buttonLabel ?? 'OK, voltar ao início'}
                onClick={() => {
                    if (typeof onPress === 'function') {
                        onPress();
                    } else {
                        history.push('/', { showSplash: false });
                    }
                }}
            />
        </Container>
    );
}

export default AlertModal;

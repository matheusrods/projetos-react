import React from 'react';
import { Container, Header, Content, Title, ContainerIcon } from './styles';

const CardMethodologyAudit = ({ children, icon, fontColor, title }) => {
    return (
        <Container>
            <Header color={fontColor}>
                <ContainerIcon>{icon}</ContainerIcon>
                <Title>{title}</Title>
            </Header>
            <Content>{children}</Content>
        </Container>
    );
};

export default CardMethodologyAudit;

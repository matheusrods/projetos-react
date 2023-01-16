import React from 'react';

import { Container, InfoIcon, InfoText } from './styles';

const InfoContainer = ({ icon, text }) => {
    return (
        <Container>
            <InfoIcon>{icon}</InfoIcon>

            <InfoText dangerouslySetInnerHTML={{ __html: text }} />
        </Container>
    );
};

export default InfoContainer;

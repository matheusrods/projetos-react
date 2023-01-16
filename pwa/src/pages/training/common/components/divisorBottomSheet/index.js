import React from 'react';

import { Title, Container } from './styles';
import { Divisor } from '../../../../../components/atoms';

const DivisorBottomSheet = ({ title, children }) => {
    return (
        <Container>
            <Title>{title}</Title>

            <Divisor />

            {children}
        </Container>
    );
};

export default DivisorBottomSheet;

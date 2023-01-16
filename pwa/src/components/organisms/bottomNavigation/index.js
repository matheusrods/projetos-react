import React from 'react';

import { Container, ItemContainer, ItemIcon, ItemLabel } from './styles';
import colors from '../../../styles/colors';

const bottomNavigation = ({ items }) => {
    return (
        <Container>
            {items.map(({ onClick, active, icon, label }, idx) => (
                <ItemContainer
                    onClick={onClick}
                    color={active ? colors.client : colors.gray5}
                    key={`${label}_${idx}`}
                >
                    <ItemIcon>{icon}</ItemIcon>
                    <ItemLabel>{label}</ItemLabel>
                </ItemContainer>
            ))}
        </Container>
    );
};

export default bottomNavigation;

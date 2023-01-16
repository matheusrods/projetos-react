import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

import {
    Container,
    Title,
    Icon
} from './styles';

const AuditMiniCard = ({
    backgroundColor,
    borderColor,
    onClick,
    title,
    numberPendent,
    icon
}) => {
    return (
        <Container onClick={onClick} backgroundColor={backgroundColor} borderColor={borderColor}>
            <Title>{`${title} (${numberPendent})`}</Title>
            <Icon>{icon ?? <FaAngleRight fontSize={'24px'} color={'#9FA8B3'} />}</Icon>
        </Container>
    );
}

export default AuditMiniCard;

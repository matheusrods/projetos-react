import React from 'react';

import { Card } from './styles';

const CardItem = ({
    onClick,
    backgroundColor,
    borderColor,
    children,
    ...rest
}) => {
    return (
        <Card
            onClick={onClick}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            {...rest}
        >
            {children}
        </Card>
    );
};

export default CardItem;

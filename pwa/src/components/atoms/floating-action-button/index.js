import React from 'react';

import { Button } from './styles';
import colors from '../../../styles/colors';

function FloatingActionButton({
    onClick,
    right,
    bottom,
    position,
    icon,
    backgroundColor = colors.orange2,
    color = '#FFF',
    size = 21,
    ...rest
}) {
    return (
        <Button
            onClick={onClick}
            bottom={bottom}
            right={right}
            position={position}
            backgroundColor={backgroundColor}
            size={size}
            color={color}
            {...rest}
        >
            {icon}
        </Button>
    );
}

export default FloatingActionButton;

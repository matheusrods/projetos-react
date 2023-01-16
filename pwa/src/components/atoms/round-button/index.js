import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from './styles';
import colors from "../../../styles/colors";

function RoundButton({
     onClick,
     right,
     bottom,
     position,
     icon,
     backgroundColor = colors.orange2,
     ...rest
}) {
    return (
        <Button
            onClick={onClick}
            bottom={bottom}
            right={right}
            position={position}
            backgroundColor={backgroundColor}
            {...rest}
        >
            {icon ?? <FaPlus size={21} color={"#fff"} />}
        </Button>
    );
}

export default RoundButton;

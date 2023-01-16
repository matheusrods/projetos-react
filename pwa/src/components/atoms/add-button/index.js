import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from './styles';

function AddButton({ onClick, right, bottom, position, ...rest }) {
    return (
        <Button onClick={onClick} bottom={bottom} right={right} position={position} {...rest}>
            <FaPlus size={21} color={"#fff"} />
        </Button>
    );
}

export default AddButton;

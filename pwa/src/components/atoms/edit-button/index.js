import React from 'react';
import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { Button } from './styles';

/**
 * @param {function} onClick Ex: onClick={() => history.push("/home")};
 * @param {number} right em px a quantidade que será deslocado para esquerda. Ex: 10;
 * @param {number} bottom em px a quantidade que será deslocado para cima. Ex: 10;
 * @param {string} position propriedade position css. Ex: absolute;
 */

function EditButton({ onClick, right, bottom, position, ...rest }) {
    return (
        <Button
            onClick={onClick}
            bottom={bottom}
            right={right}
            position={position}
            {...rest}
        >
            <FaRegEdit size={21} color={'#fff'} />
        </Button>
    );
}

EditButton.propTypes = {
    onClick: PropTypes.func,
    right: PropTypes.number,
    bottom: PropTypes.number,
    position: PropTypes.string,
};

export default EditButton;

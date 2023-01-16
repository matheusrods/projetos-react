import React from 'react';
import PropTypes from 'prop-types';
import { ContainerItem, Label, Value, Line } from './styles';

const ItemListLarge = ({ label = '', value = '' }) => {
    return (
        <>
            <ContainerItem>
                <Label>{label}</Label>
                <Value>{value}</Value>
            </ContainerItem>
            <Line />
        </>
    );
};

ItemListLarge.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
};

export default ItemListLarge;

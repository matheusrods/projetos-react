import React from 'react';
import PropTypes from 'prop-types';
import { ContainerItem, Label, Value, Line } from './styles';

/**
 * @param {object} data espera 1 objeto com titulo e valor. Ex: {label: null, value: null};
 */

const ItemListLargeInCard = ({ data = {} }) => {
    return (
        <>
            <Line />
            <ContainerItem>
                <Label>{data.label}</Label>
                <Value>{data.value}</Value>
            </ContainerItem>
            <Line />
        </>
    );
};

ItemListLargeInCard.propTypes = {
    data: PropTypes.object
};

export default ItemListLargeInCard;

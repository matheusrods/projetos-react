import React from 'react';
import PropTypes from 'prop-types';
import { ContainerList } from './styles';
import ItemListLarge from '../../atoms/item-list-large';

/**
 * @param {array} data espera um array de objetos com titulo e valor. Ex: [{label: null, value: null}];
 */
function ItemListLargeGroup({ data = [] }) {
    return (
        <ContainerList>
            {data.map((item, index) => item ? (
                <ItemListLarge key={index} label={item.label} value={item.value} />
            ) : null)}
        </ContainerList>
    );
}

ItemListLargeGroup.propTypes = {
    data: PropTypes.array
};

export default ItemListLargeGroup;

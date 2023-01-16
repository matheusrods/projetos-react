import React from 'react';
import PropTypes from 'prop-types';
import { ContainerList } from './styles';
import ItemListLargeInCard from '../../atoms/item-list-large-card';

/**
 * @param {array} data espera um array de objetos com titulo e valor. Ex: [{label: null, value: null}];
 */
function ItemListLargeGroupInCard({ data = [] }) {
    return (
        <ContainerList>
            {data.map((item, index) => (
                <ItemListLargeInCard key={index} data={item} />
            ))}
        </ContainerList>
    );
}

ItemListLargeGroupInCard.propTypes = {
    data: PropTypes.array
};

export default ItemListLargeGroupInCard;

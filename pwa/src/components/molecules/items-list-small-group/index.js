import React from 'react';
import PropTypes from 'prop-types';
import { ContainerList, Title, ContainerRequirements } from './styles';
import ItemListSmall from '../../atoms/item-list-small';

/**
 * @param {array} data espera um array de objetos com titulo e valor. Ex: [{label: null, value: null}];
 */
function ItemListSmallGroup({ data = [], handleOnPress }) {
    return data.map((items, index) => {
        return (
            <ContainerRequirements key={index}>
                <Title>{items.title}</Title>
                <ContainerList>
                    {items.requirements.map((item, index) => (
                        <ItemListSmall
                            key={index}
                            data={item}
                            onClick={() => handleOnPress(item)}
                        />
                    ))}
                </ContainerList>
            </ContainerRequirements>
        );
    });
}

ItemListSmallGroup.propTypes = {
    data: PropTypes.array
};

export default ItemListSmallGroup;

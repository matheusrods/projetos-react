import React from 'react';
import PropTypes from 'prop-types';
import {
    ContainerItem,
    Label,
    Value,
    Line,
    ContainerValues,
    Button
} from './styles';
import { FaAngleRight } from 'react-icons/fa';

/**
 * @param {object} data espera 1 objeto com label e valor. Ex: {label: null, value: null};
 */

const ItemListSmall = ({
    data = {},
    onClick = () => { }
}) => {
    return (
        <>
            <ContainerItem onClick={data.nonConformity ? onClick : null}>
                <Label ncom={data?.nonConformity}>{data.label}</Label>
                <ContainerValues>
                    <Value ncom={data?.nonConformity}>{data.value}</Value>
                    {data?.nonConformity ? (
                        <Button>
                            {'Ver NC/OM'} <FaAngleRight />
                        </Button>
                    ) : null}
                </ContainerValues>
            </ContainerItem>
            <Line />
        </>
    );
};

ItemListSmall.propTypes = {
    data: PropTypes.object
};

export default ItemListSmall;

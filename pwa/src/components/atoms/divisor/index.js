import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';

export const StyledDivisor = styled.hr`
    height: 1px;
    color: ${colors.gray4};
    opacity: 12%;
    max-width: 768px;
    ${(props) => {
        const { width, margin } = props;

        return css`
            width: ${width ?? '100%'};
            margin: ${margin ?? '0 auto'};
        `;
    }};
`;

/**
 * @param {string} width
 * @param {string} margin
 */

export default function Divisor({ width, margin }) {
    return <StyledDivisor width={width} margin={margin} />;
}

Divisor.propTypes = {
    width: PropTypes.string,
    margin: PropTypes.string
};

import styled, { css } from 'styled-components';

import colors from '../../../styles/colors';

export const Card = styled.div`
    ${({ backgroundColor = colors.white, borderColor = colors.white }) => css`
        background-color: ${backgroundColor};
        padding: 10px;
        border-radius: 4px;
        border-left: 3px solid ${borderColor};
        margin-bottom: 16px;
    `}
`;

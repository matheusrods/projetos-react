import styled, { css } from 'styled-components';

import colors from '../../../../../../styles/colors';
import { Font, Container } from '../../../../common';

export const MainContainer = styled(Container)`
    ${({ paddingBottom = '0' }) => css`
        margin-top: 86px;
        padding-bottom: ${paddingBottom};
        overflow: auto;
        height: 100%;
    `}
`;

export const DetailsContainer = styled(Container)`
    ${({ marginBottom = '86px' }) => css`
        background-color: ${colors.gray1};
        border-radius: 3px;
        margin: 16px 0 ${marginBottom} 0;
    `}
`;

export const ProofContainer = styled.div`
    margin: 16px 0;
`;

export const ProofRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: 'center';
    height: 86px;
`;

export const Title = styled(Font)`
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;

    color: ${colors.gray4};
`;

export const Subtitle = styled(Title)`
    font-size: 16px;
    line-height: 40px;
`;

export const Caption = styled(Font)`
    font-size: 12px;
    line-height: 14px;

    color: ${colors.gray5};
`;

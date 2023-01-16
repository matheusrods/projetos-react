import styled, { css } from 'styled-components';

import colors from '../../../styles/colors';
import { Wrapper } from '../../observer-ehs/details/styles';

// Global style for the training module

export const Container = styled.div`
    padding: 16px;
`;

export const ViewContainer = styled.div`
    margin: 10px 0;
`;

export const Font = styled.p`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
`;

export const Title = styled(Font)`
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;

    color: ${colors.gray4};

    padding-bottom: 16px;
`;

export const Card = styled.div`
    color: ${colors.gray10};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    margin-bottom: 4px;
    background-color: ${colors.white};
    border-radius: 4px;
`;

export const Row = styled.div`
    ${({ fullWidth = false }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: ${fullWidth ? '100%' : 'auto'};
    `}
`;

export const Column = styled(Row)`
    flex-direction: column;
`;

export const Content = styled(Wrapper)`
    padding: 0 16px;
`;

const ballColor = {
    PENDENTE: 'redAux',
    AVALIADO: 'blueAux',
    REALIZADO: 'greenAux',
    CANCELADO: 'orange2',
    EXAM: 'purpleAux'
};

export const Ball = styled.div`
    ${({ status = 'PENDENTE' }) => css`
        width: 8px;
        height: 8px;
        border-radius: 50px;
        margin: 0 4px;
        background: ${colors[ballColor[status]]};
    `}
`;

import styled, { css } from 'styled-components';

import { Button } from '../../../components/atoms/button-default/styles';
import colors from '../../../styles/colors';

export const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

export const Content = styled.div`
    padding: 10px 14px;
`;

export const OutlineButton = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    color: #9fa8b2;
`;

export const Caption = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: #2d373c;
    border-radius: 4px;
    padding: 60px 0 0 0;
    margin: 0 20px;
`;

export const Card = styled.div`
    ${({ color }) => css`
        padding: 20px 10px;
        background: ${color};
        border-radius: 3px;
        height: 280px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `}
`;

export const Icon = styled.div`
    ${({ color }) => css`
        height: 58px;
        width: 58px;
        border-radius: 100px;
        background: #ffffff;
        border-radius: 100px;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 30px;
            height: 30px;
            color: ${color};
        }
    `}
`;

export const Title = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 20px;
    color: ${colors.gray4};
    border-radius: 4px;
    padding: 10px;

    display: flex;
    align-items: center;
    text-align: center;
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: ${colors.blackAux};
`;

export const Footer = styled.div`
    background-color: ${colors.white};
    width: 100%;
    height: 80px;
    padding: 16px 24px;
`;

export const ControlButton = styled(Button)`
    background-color: ${colors.orange2};
    color: #ffffff;
    width: 100%;

    &:hover {
        background-color: ${colors.orange2};
    }
`;

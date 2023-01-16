import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

import colors from '../../../styles/colors';
import { Font } from '../../../pages/training/common/styles';

const spin = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: ${colors.gray4};
    height: calc(100% - 76px);
    margin-top: 76px;
    flex-direction: column;

    @media (max-width: 768px) {
        margin-top: 0px;
        height: 100%;
    }
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
    margin-bottom: 30px;
    color: ${({ color = colors.client }) => color};
`;

export const LoadingTitle = styled(Font)`
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;

    text-align: center;

    color: ${colors.gray10};
`;

export const LoadingCaption = styled(LoadingTitle)`
    font-size: 12px;
    line-height: 14px;
`;

import styled, { css, keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

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

export const Button = styled.button`
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    ${props => props?.theme && props.theme === 'secondary'
        ? css`
            background-color: #E9EDF2;
            color: #4F4F4F;

            &:hover {
                background-color: #D1D5D9;
            }
        `
        : css`
            background-color: #FF7843;
            color: #FFFFFF;

            &:hover {
                background-color: #E56C3C;
            }
        `
    }
`;

export const Loading = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

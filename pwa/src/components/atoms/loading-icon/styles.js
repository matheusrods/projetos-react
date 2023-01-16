import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

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

export const Icon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

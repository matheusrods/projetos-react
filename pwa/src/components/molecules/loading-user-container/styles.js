import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import colors from "../../../styles/colors";

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

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: ${colors.gray4};
    height: 100%;
    background-color: ${colors.white};
    margin: 0 auto;
    max-width: 768px;
    flex-direction: column;
    z-index: 100;
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
    margin-bottom: 30px;
`;

export const Text = styled.span`
    text-align: center;
`;

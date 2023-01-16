import { rgba } from 'polished';
import styled, { css, keyframes } from 'styled-components';
import colors from '../../../styles/colors';
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

export const ButtonsWrapper = styled.div`
    ${({ fixed }) =>
        fixed &&
        css`
            bottom: 0;
            left: 0;
            position: fixed;
            /* TODO: Check if this has had any impact on other screens  */
            /* z-index: 110; */
        `}

    height: 80px;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    background-color: ${colors.gray1};
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    gap: 16px;

    ${({ inline }) =>
        !inline &&
        css`
            flex-direction: column-reverse;
            height: 146px;
            padding: 16px 26px;

            & button {
                width: 100%;
            }
        `}
`;

export const ConfirmButton = styled.button`
    cursor: pointer;
    background-color: ${(props) =>
        rgba(
            props.backgroundColor ?? colors.orange2,
            props.disabled ? 0.5 : 1
        )};
    border: none;
    font-size: 14px;
    font-weight: 500;
    min-width: 143px;
    min-height: 44px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 3px;
    color: #fff;
    outline: none;
    flex: 1;
`;

export const CancelButton = styled.button`
    cursor: pointer;
    flex: 1;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 500;
    min-width: 143px;
    min-height: 44px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: ${(props) => props.color ?? colors.gray5};
    outline: none;
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

import { rgba } from 'polished';
import { FaSpinner } from 'react-icons/fa';
import styled, { css, keyframes } from 'styled-components';
import colors from '../../../styles/colors';

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
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #fff;

    ${props => props?.positionRelative && css`
        position: relative;
        bottom: unset;
    `}
`;

export const Back = styled.button`
    background-color: #F2F6FA;
    font-size: 16px;
    color: #9FA8B2;
    outline: none;
    border: 0px;
    border-radius: 0px;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #D9DDE1;
    }
`;

export const Next = styled.button`
    flex: 1;
    color: #FFFFFF;
    background-color: ${props => rgba(colors.orange2, props.disabled ? 0.5 : 1)};
    outline: none;
    border: 0px;
    border-radius: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    padding: 0px 16px;
    cursor: pointer;

    &:hover {
        background-color: #E19409;
    }

    svg {
        font-size: 16px;
    }
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

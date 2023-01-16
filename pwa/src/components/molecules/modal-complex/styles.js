import { rgba } from "polished";
import { FaSpinner } from "react-icons/fa";
import styled, { css, keyframes } from "styled-components";
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

export const ModalContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 9px 16px 27px;
`;

export const ModalLine = styled.div`
    width: 40px;
    height: 4px;
    background: #e9edf2;
    border-radius: 2px;
    margin-bottom: 29px;
`;

export const ModalIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    background-color: #e9edf2;
    margin-bottom: 25px;
    color: #ff5c69;
    font-size: 40px;
`;

export const ModalTitle = styled.h4`
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    color: #2d373c;
    margin-bottom: 16px;
`;

export const ModalDescription = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    overflow: auto;
    max-height: 45vh;
    color: #9fa8b3;
`;

export const FooterModal = styled.div`
    display: flex;
    align-items: center;
    background: #f2f6fa;
    padding: 16px 23px;

    ${(props) =>
        props?.uniqueFooterButton
            ? css`
                  justify-content: center;
              `
            : css`
                  justify-content: space-between;
              `}
`;

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${colors.gray6};
    background-color: transparent;
    padding: 0px 24px;
    border-radius: 3px;
    border: 0px;
    outline: unset;
    width: calc(50% - 4px);
`;

export const AcceptButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 44px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #ffffff;
    background-color: ${(props) =>
        rgba(props.color ?? colors.orange2, props.disabled ? 0.5 : 1)};
    padding: 0px 24px;
    border-radius: 3px;
    border: 0px;
    outline: unset;
    width: calc(50% - 4px);
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

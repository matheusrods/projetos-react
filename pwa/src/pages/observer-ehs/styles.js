import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import colors from "../../styles/colors";

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
    flex-direction: column;
    background-color: ${colors.gray2};
    padding: 20px 16px 96px;
    height: calc(100% - 76px);
    overflow-y: auto;
    max-width: 768px;
    margin: 0px auto;

    @media (min-width: 768px) {
        padding: 20px 16px;
    }
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray4};
  margin-bottom: 12px;
  margin-top: 20px;

  &:first-child {
      margin-top: 0;
  }
`;

export const FilterActionsButton = styled.button`
    height: 48px;
    width: 48px;
    background-color: ${colors.gray5};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 16px;
    right: 64px;
    outline: none;
    border: none;
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
`;

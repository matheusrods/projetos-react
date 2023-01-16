import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    margin: 76px auto 0px;
    height: calc(100% - 76px);
    max-width: 768px;
    overflow-y: auto;

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
`;

export const SmallCard = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.color ?? "gray"};
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    margin-bottom: 4px;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    border-radius: 4px;

    & div > span {
        line-height: 18px;
        margin-left: 10px;
        color: ${colors.gray6};
    }
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const SeeNow = styled.p`
    color: inherit;
    display: block;
    margin-left: 10px;
    font-weight: inherit;
`;

export const Strong = styled.span`
    font-weight: 500;
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
    cursor: pointer;
`;

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: ${colors.gray4};
    height: calc(100% - 76px);
    flex-direction: column;
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
    margin-bottom: 30px;
`;

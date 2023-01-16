import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray1};
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: calc(100% - 76px);
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;
`;

export const Footer = styled.div`
    background-color: #f2f6fa;
    height: 80px;
    width: 100%;
    display: flex;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`
    background-color: #faa50a;
    border-radius: 3px;
    height: 44px;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #ffffff;
    border: none;
    outline: none;
`;

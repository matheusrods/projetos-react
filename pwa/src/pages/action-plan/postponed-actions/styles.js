import styled, { css } from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray2};
    height: 100%;
`;

export const Content = styled.div`
    max-width: 768px;
    margin: 0px auto;
    min-height: calc(100vh - 71px);
    padding: 20px 16px;
    overflow-y: auto;
    height: calc(100% - 71px);
`;

export const ActionContainer = styled.div`
    ${(props) =>
        props.noActions &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        `}
    min-height: calc(100% - 71px - 48px - 20px);
`;

export const IconContainer = styled.div`
    height: 64px;
    width: 64px;
    color: ${colors.gray5};
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
`;

export const ActionContainerDescription = styled.p`
    color: ${colors.gray5};
    text-align: center;
    margin-bottom: 5px;
    margin-left: 30px;
    margin-right: 30px;
`;

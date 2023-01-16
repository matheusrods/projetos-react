import styled, { css } from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${props => props.hasBackground && css`
        background-color: ${colors.white};
        border-radius: 4px;
    `}
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

import styled from "styled-components";
import colors from "../../../styles/colors";

export const Button = styled.button`
    height: 48px;
    width: 48px;
    background-color: ${colors.gray5};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: ${props => props.position ?? 'fixed'};
    bottom: ${props => props.bottom ?? 16}px;
    right: ${props => props.right ?? 8}px;
    outline: none;
    border: none;
    cursor: pointer;
`;

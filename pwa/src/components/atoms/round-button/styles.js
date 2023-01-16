import styled from "styled-components";

export const Button = styled.button`
    height: 48px;
    width: 48px;
    background-color: ${props => props.backgroundColor};
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

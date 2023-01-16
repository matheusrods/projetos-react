import styled, { css } from "styled-components";

export const Container = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    border-radius: 3px;
    display: flex;
    padding: 16px;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
    ${props => props.cursorType && css`cursor: pointer;`}
`;

import styled, { css } from "styled-components";

export const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    opacity: ${props => props.isLoading ? 0.5 : 1};

    ${props => props.clickable && css`
        cursor: pointer;
    `};

    img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }

    svg {
        position: absolute;
        right: 4px;
        top: 8px;
        color: #ffffff;
        font-size: 16px;
    }
`;

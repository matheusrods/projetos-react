import styled, { css } from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    ${(props) => props?.fixed &&
        css`
            top: 0;
            left: 0;
            position: fixed;
            width: calc(100% - 32px);
        `
    };
    height: 76px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    width: 100%;
    z-index: 110;
    position: relative;
`;

export const Title = styled.h2`
    color: ${colors.gray4};
    font-size: 20px;
    margin-left: 10px;
`;

export const Content = styled.div`
    font-size: 20px;
    color: ${colors.gray6};
    padding: 0px;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;

    svg {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        padding: 0px 16px;
    }
`;

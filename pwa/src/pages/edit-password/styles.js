import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
    max-width: 768px;
    margin: 0px auto;
    height: calc(100% - 76px);
    display: flex;
    flex-direction: column;
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px 16px;
    overflow-y: auto;
    background-color: ${colors.white};
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2D373C;
    margin-bottom: 20px;
`;

import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 76px;
    overflow-y: auto;
`;

export const ContainerContent = styled.div`
padding: 20px 16px;
flex: 1;
overflow-y: auto;
`;

export const ContainerHeader = styled.div`
    margin-bottom: 24px;
`;

export const ContainerHeaderTitle = styled.h1`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    color: ${colors.gray4};
`;

export const ContainerHeaderSubTitle = styled.span`
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #9FA8B2;
`;

import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Container = styled.div`
    max-height: calc(100% - 128px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    padding: 20px 16px;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding-bottom: 76px;
    }
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

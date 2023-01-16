import styled from "styled-components";
import colors from "../../../../styles/colors";

export const Container = styled.div`
    min-height: calc(100% - 76px);
    height: 100%;
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 16px;
    padding-bottom: 190px;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;
`;

export const PageTitle = styled.span`
    color: ${colors.gray4};
    font-weight:500;
    font-size: 0.875rem;
    line-height: 1rem;
    margin-bottom: 16px;
`;

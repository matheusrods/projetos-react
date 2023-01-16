import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray1};
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: calc(100% - 76px);
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;

    @media (max-width: 768px) {
        padding-bottom: 60px;
    }
`;

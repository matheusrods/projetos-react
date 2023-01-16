import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${colors.gray2};
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow: auto;
    position: relative;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    background: ${colors.shape};
    padding: 20px 20px;
    overflow-y: auto;
`;

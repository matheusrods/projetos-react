import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.shape};
    padding: 0 16px 96px;
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 0 auto;
    overflow: auto;

`;

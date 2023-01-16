import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.h2`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${props => props.size || "20"}px;
    color: ${props => props.color || colors.text};
    border-bottom: ${props => props.borderBottom && `1px solid ${colors.borderBottom}`};
    padding-bottom: 20px;
    margin-bottom: 10px;
    svg{
        margin-right: 10px;
    }
`;

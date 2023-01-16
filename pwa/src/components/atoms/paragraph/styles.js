import styled from "styled-components";
import colors from "../../../styles/colors";


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: ${props => props.size || "14"}px;
    color: ${props => props.color || colors.text};
    border-bottom: ${props => props.borderBottom && `1px solid ${colors.borderBottom}`};
    margin: 20px 0 15px 0;
    padding-bottom: 15px;

`;
export const IconWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 10px;
`;

export const Text = styled.p``;

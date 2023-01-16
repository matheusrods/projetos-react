import styled from "styled-components";
import colors from "../../../styles/colors";
import { Link } from 'react-router-dom';

export const Card = styled(Link)`
    text-decoration: none;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    border-radius: 3px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border-left:  ${(props) =>  props.bordercolor !== "" ? "3px solid " + props.bordercolor :  "none"};
    svg{
        color: ${colors.icons};
        margin-right: 10px;
    }
`;
export const CardTitle = styled.div`
    display: flex;
    align-items: center;
`;
export const LabelText = styled.span`
    font-size: 16px;
    color: ${colors.text};
    margin-left: 10px;
    text-align: left;
    font-weight: ${(props) => props.bold ? "500" : "normal"};
`;

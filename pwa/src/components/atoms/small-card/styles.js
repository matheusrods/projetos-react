import styled from "styled-components";
import colors from "../../../styles/colors";
import { Link } from 'react-router-dom';

export const SmallCard = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.color ?? "gray"};
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    margin-bottom: 4px;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    border-radius: 4px;

    & div > span {
        line-height: 18px;
        margin-left: 10px;
        color: ${colors.gray6};
    }
`;


export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const SeeNow = styled.p`
    color: inherit;
    display: block;
    margin-left: 10px;
    font-weight: inherit;
`;

export const Strong = styled.span`
    font-weight: 500;
`;

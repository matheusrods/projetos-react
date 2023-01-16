import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    border-left: 3px solid;
    border-color: ${(props) => props.borderColor ?? "#fff"};
    border-radius: 3px;
    display: flex;
    padding: 16px 22px 16px 16px;
    line-height: 18px;
    flex-direction: row;
    margin-bottom: 24px;
    /* min-height: 64px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 3px 10px 0px #00000005;
`;

export const Title = styled.h3`
    color: ${colors.black};
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
`;

export const Icon = styled.div`
    width:25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

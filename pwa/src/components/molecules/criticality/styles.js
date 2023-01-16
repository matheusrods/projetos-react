import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

export const LegendsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Legend = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: ${colors.gray6};
`;

export const Donut = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 30px solid ${props => props.color ?? colors.greenAux};
    margin-right: 10px;
`;

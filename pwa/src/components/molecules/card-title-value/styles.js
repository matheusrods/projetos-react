import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    align-items: center;
`;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.div`
    color: ${colors.gray3};
    font-size: 14px;
    margin-bottom: 20px;
`;

export const Value = styled.div`
    color: ${colors.text};
    font-size: 18px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

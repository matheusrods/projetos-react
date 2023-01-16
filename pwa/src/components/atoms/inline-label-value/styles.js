import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: ${props => props.flexAlign || "center"};
    margin-top: 10px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: ${props => props.borderBottom ? `1px solid ${colors.borderBottom}` : 'none'};
`;

export const Label = styled.div`
    color: ${colors.gray4};
    font-weight: 500;
`;

export const SoftLabel = styled.div`
    color: ${colors.gray3};
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Value = styled.div`
    color: ${props => props.valueColor ?? colors.gray4};
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    svg{
        margin-right: 5px;
    }
`;

import styled from "styled-components";
import colors from "../../../../styles/colors";

export const Container = styled.button`
    background-color: #fff;
    padding: 12px 0;
    border: none;
    border-bottom: 1px solid ${colors.grayBorder};
    display: flex;
    flex-direction: row;
    align-items: center;
    outline: none;
    cursor: pointer;
    &:disabled{
        .check{
            background-color: #BDBDBD;
            border: 1px solid #F2F2F2;
        };
        .info {
            color: #BDBDBD;
        }
    }
`;

export const Check = styled.div`
    border-radius: ${props => props.radio ? '50%' : '3px'};
    min-height: 16px;
    min-width: 16px;
    height: 16px;
    width: 16px;
    background-color: ${(props) => props?.selected ? colors.greenAux : colors.gray2};
    margin-right: 12px;
    border: 1px solid ${(props) => props?.selected ? colors.greenAux : '#CCD4DB'};
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);

    svg {
        color: #fff;
        font-size: 10px;
    }
`;

export const Info = styled.div`
    color: ${(props) => (props.selected ? colors.greenAux : colors.gray6)};
    font-weight: ${(props) => (props.selected ? '500' : '400')};
    font-size: 14px;
    text-align: left;
    line-height: 20px;
`;

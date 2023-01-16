import styled from "styled-components";
import colors from "../../../styles/colors";
import { rgba } from 'polished';

export const Container = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    border-radius: 3px;
    display: flex;
    padding: 16px;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
    margin-top: 8px;

    /* &:last-of-type {
        margin-bottom: 96px;
    } */
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-bottom: 10px;
    flex-direction: column;
    border-bottom: 1px solid ${colors.grayBorder};
    &:before {
        content: '';
        width: 3px;
        height: calc(100% + 16px);
        background-color: ${(props) => props.borderColor ?? 'grey'};
        position: absolute;
        left: -16px;
        top: -16px;
    }
    h2{
        color: ${colors.textDarker};
        font-weight: 500;
        font-size: 14px;
    }
`;
export const HeaderTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
    width: 100%;
`;

export const SubHeaderTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`;
export const StrongSubHeader = styled.span`
  color: ${colors.text};
    font-weight: 500;
    font-size: 12px;
`;
export const LabelValueWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
`;
export const Label = styled.span`
    color: ${colors.text};
    font-weight: 400;
    font-size: 12px;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    flex: 1;
    padding-top: 20px;
    padding-bottom: 10px;
`;
export const DetailsButton = styled.div`
    color: ${colors.orange2};
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    text-decoration: none;
`;
export const Button = styled.button`
    color: inherit;
    display: block;
    margin-right: 6px;
    font-weight: inherit;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Item = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.customPadding !== '' ? props.customPadding : '10px 0'};
    border-bottom: ${(props) => props.borderBottom ? '1px solid '+colors.grayBorder : 'none'};
    div{
        color: ${colors.text};
        font-weight: 400;
        font-size: 13px;
        text-align: right;
    }
`;
export const ItemLabel = styled.span`
    color: ${colors.text};
    font-weight: 400;
    padding-right: 10px;
    strong{
        color: ${colors.text};
        font-weight: 500;
        display: block;
        font-size: 14px;
    }
`;
export const ItemLabelSoft = styled.span`
    color: ${colors.gray3};
    font-weight: 400;
    padding-right: 10px;
    font-size: 13px;
`;
export const Row = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
export const FullDescription = styled.div`
    margin-top: 10px;
`;

export const InlineSpanIconText = styled.span`
    padding-left: 10px;
    display: block;
`;

export const AlertItem = styled.div`
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.color ?? "grey"};
    color: ${(props) => props.color ?? "grey"};
    background-color: ${(props) => rgba(props.color ?? "grey", 0.12)};
    border-radius: 3px;
    margin-top: 10px;
    padding: 8px;
`;

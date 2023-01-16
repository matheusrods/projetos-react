import { FaChevronDown } from "react-icons/fa";
import styled, { css } from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: ${(props) => props.backgroundColor};
    border-bottom: 1px solid ${colors.grayBorder};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
`;

export const ContainerText = styled.div`
    display: flex;
    /* justify-content: space-between; */
    /* align-items: center; */
    flex-direction: row;
    width: 100%;
`;

export const LabelWrapper = styled.div`
    cursor: pointer;
    color: ${colors.gray6};
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Label = styled.span`
    font-weight: 500;
    font-size: 14px;
    max-width: 80%;
    color: ${(props)=>props.labelColor}
`;

export const AccordionSection = styled.div`
    margin-top: ${(props) => props.open ? '8px' : 0};
    width: 100%;
    opacity: ${props => props.maxHeight ? 1 : 0};
    ${(props) =>
        props.maxHeight &&
        css`
            max-height: ${(props) => (props.open ? props.maxHeight : 0)}px;
        `}
    transition: all 0.3s ease-in-out;
    overflow: hidden;
`;

export const AccordionButton = styled(FaChevronDown)`
    cursor: pointer;
    color: ${colors.gray5};
    transition: transform 0.3s ease-in-out;
    ${(props) =>
        props.open &&
        css`
            transform: rotate(-180deg);
        `}
`;

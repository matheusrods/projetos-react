import { FaChevronDown } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    padding: 20px;
    background-color: ${(props) => props.backgroundColor};
    border-bottom: 1px solid ${colors.grayBorder};
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const LabelWrapper = styled.div`
    cursor: pointer;
    color: ${colors.gray6};
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const LabelRow = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    svg {
        margin-right: 15px;
    }
`;

export const Label = styled.span`
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.labelColor};
    padding-top: 4px;
`;

export const AccordionSection = styled.div`
    margin-top: ${(props) => (props.open ? '25px' : 0)};
    width: 100%;
    opacity: ${(props) => (props.maxHeight ? 1 : 0)};
    ${(props) =>
        props.maxHeight &&
        css`
            max-height: ${(props) => (props.open ? props.maxHeight : 0)}px;
        `}
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    border-top: ${(props) =>
        props.open ? `1px solid ${colors.grayBorder}` : 'none'};
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
export const AccordionItem = styled.div`
    padding: 20px 10px;
    border-bottom: 1px solid ${colors.grayBorder};
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
`;

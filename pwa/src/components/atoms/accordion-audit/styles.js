import { FaChevronDown } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    background-color: ${(props) => (props.open ? null : '#fff')};
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    transition: border 0s linear 0.3s;
    border-left: ${(props) => {
        const { status, open } = props;

        if (open) {
            return;
        }

        switch (status) {
            case 'pending':
                return `3px solid ${colors.auditOrange}`;
            case 'inProgress':
                return `3px solid ${colors.inProgress}`;
            case 'done':
                return `3px solid ${colors.auditGreen}`;
            case 'nc':
                return `3px solid ${colors.redNC}`;
            case 'contested':
                return `3px solid ${colors.auditBlue}`;
            case 'exam':
                return `3px solid ${colors.purpleAux}`;

            default:
                return `3px solid ${colors.gray1}`;
        }
    }};
`;

export const LabelWrapper = styled.div`
    cursor: pointer;
    color: ${colors.gray6};
    display: flex;
    width: 100%;
    display: flex;
    height: 64px;
    justify-content: inherit;
    align-items: center;
`;

export const Dot = styled.span`
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${(props) => {
        const { status } = props;

        switch (status) {
            case 'pending':
                return colors.auditOrange;
            case 'inProgress':
                return colors.inProgress;
            case 'done':
                return colors.auditGreen;
            case 'nc':
                return colors.redNC;
            case 'contested':
                return colors.auditBlue;
            case 'exam':
                return colors.purpleAux;

            default:
                return colors.gray1;
        }
    }};
`;

export const Label = styled.span`
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    max-width: 80%;
    margin-left: ${(props) => (props.open ? null : '16px')};
    color: ${colors.textDarker};
`;

export const AccordionSection = styled.div`
    width: 100%;
    opacity: ${(props) => (props.maxHeight ? 1 : 0)};
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
    margin-right: 16px;
    color: ${colors.gray5};
    transition: transform 0.3s ease-in-out;
    ${(props) =>
        props.open &&
        css`
            transform: rotate(-180deg);
        `}
`;

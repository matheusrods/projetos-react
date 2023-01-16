import styled, { css } from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.button`
    position: relative;
    width: 100%;
    height: 83px;
    background-color: #F2F6FA;
    padding: 16px;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    border-left: 3px ${props => props.borderColor ?? 'red'} solid;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    svg {
        font-size: 14px;
        color: #5E687D;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const RiskName = styled.span`
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #5E687D;
`;

export const Checkbox = styled.div`
    height: 24px;
    width: 24px;
    background-color: ${(props) => props?.selected ? colors.greenAux : colors.gray2};
    border: 1px solid ${(props) => props?.selected ? colors.greenAux : '#CCD4DB'};
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        color: #FFF;
        font-size: 12px;
        ${props => !props?.selected && css`
            display: none;
        `}
    }
`;

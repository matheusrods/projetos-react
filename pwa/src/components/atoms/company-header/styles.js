import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    width: 100%;
    position: fixed;
    top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding: 16px;
    background-color: ${colors.client};

    ${props => props?.positionRelative && css`
        position: relative;
        top: unset;
    `}
`;

export const ActionInformation = styled.div``;

export const CompanyName = styled.h2`
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 2px;
    color: ${colors.white};
`;

export const TypeAction = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.5);
`;

export const RightAction = styled.div``;

export const CloseButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0px;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 25px;
    color: #FFFFFF;

    &:hover {
        color: #E5E5E5;
    }
`;

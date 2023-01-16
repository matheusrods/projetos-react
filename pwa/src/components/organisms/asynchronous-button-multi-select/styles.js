import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import colors from '../../../styles/colors';
import { rgba } from 'polished';

const spin = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
`;

export const Container = styled.div`
    max-Width: calc(100vw - 32px);
`;

export const ContainerButton = styled.div`
    height: 44px;
    width: 100%;
    position: relative;
`;

export const Button = styled.button`
    background: ${props => props.disabled ? colors.gray2 : '#ffffff'};
    border: 1px solid #ccd4db;
    border-radius: 3px;
    min-height: 44px;
    outline: none;
    width: 100%;
    padding: 5px 32px 5px 44px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
`;

export const Label = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #2D373C;
`;

export const LeftIcon = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 44px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 3px;
    font-size: 16px;
    color: #2D373C;
`;

export const RightIcon = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 32px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    font-size: 14px;
    color: #697882;
`;

export const FieldName = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9FA8B3;
    display: block;
    margin-bottom: 8px;
`;

export const Loading = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

export const Tag = styled.div`
    min-height: 24px;
    color: ${colors.gray6};
    font-size: 14px;
    font-weight: 500;
    border-radius: 3px;
    background-color: ${rgba(colors.greenAux, 0.08)};
    border: 1px solid ${colors.greenAux};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 7px;
`;

import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import colors from '../../../styles/colors';

export const Button = styled.button`
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 10px 12px;
    border: 0px;
    outline: none;
    background-color: ${props => props?.selected ? rgba(colors.client, 0.2) : '#E9EDF2'};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12);
    width: 100%;

    span {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: ${props => props?.selected ? colors.client : '#5E687D'};

        @media (max-width: 400px) {
            text-align: left;
            flex: 1;
        }
    }
`;

export const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    height: 24px;
    width: 24px;
    min-width: 24px;
    border-radius: 24px;
    color: ${colors.white};
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
    margin-right: 12px;

    ${props => props?.selected
        ? css`
            background-color: ${colors.client};

            svg {
                display: block;
            }
        `
        : css`
            background-color: #CCD4DB;

            svg {
                display: none;
            }
        `
    }
`;

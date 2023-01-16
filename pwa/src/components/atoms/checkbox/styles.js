import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';

export const Button = styled.button`
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: ${(props) => props.paddingCheck ?? '10px 12px'} ;
    border: 0px;
    border-bottom: 1px solid ${(props) => props.borderColor ?? '#2D373C21'};
    outline: none;
    background-color: ${(props) => props.backgroundColor ?? '#F2F2F2'};
    width: ${(props) => props.width};
`;

export const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    height: 16px;
    width: 16px;
    min-width: 16px;
    border-radius: 3px;
    color: ${colors.white};
    margin-right: 8px;

    ${(props) =>
        props?.selected
            ? css`
                  background-color: ${props.colorActive ?? colors.client};

                  svg {
                      display: block;
                  }
              `
            : css`
                  background-color: ${props.colorDefault ?? '#CCD4DB'};
                  border: 1px solid #ccd4db;
                  svg {
                      display: none;
                  }
              `}
`;

export const Label = styled.span`
    cursor: pointer;
    font-size: 0.75rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: #4f4f4f;
    @media (max-width: 400px) {
        text-align: left;
        flex: 1;
    }
    ${(props) =>
        props?.selected
            ? css`
                  color: ${props.colorActive ?? colors.client};
                  font-weight: 500;
              `
            : css`
                  color: #4f4f4f;
              `}
`;

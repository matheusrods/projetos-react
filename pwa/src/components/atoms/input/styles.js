import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
    margin-bottom: 16px;
`;

export const TextInput = styled.input`
    width: 100%;
    height: 44px;
    padding: 0px 12px;
    border: 1px solid #CCD4DB;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2D373C;
    outline: none;

    &::placeholder {
        color: #CCD4DB;
    }

    ${props => props.error && css`
        border-color: #FF5C69;
    `}
`;

export const TextInputMask = styled(InputMask)`
    width: 100%;
    height: 44px;
    padding: 0px 12px;
    border: 1px solid #CCD4DB;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2D373C;
    outline: none;

    &::placeholder {
        color: #CCD4DB;
    }

    ${props => props.error && css`
        border-color: #FF5C69;
    `}
`;

export const FieldName = styled.span`
    display: block;
    margin-bottom: 8px;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9FA8B2;

    ${props => props?.hasError && css`
        color: #FF5C69;
    `}
`;

export const ErrorMessage = styled.span`
    font-size: 12px;
    line-height: 21px;
    font-weight: 400;
    color: #FF5C69;
`;

import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
    margin-bottom: 16px;
`;

export const Input = styled(InputMask)`
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
`;

export const Content = styled.div`
    position: relative;
`;

export const ContainerIcon = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;

    svg {
        font-size: 16px;
        color: #CCD4DB;
    }
`;

export const Error = styled.span`
    color: red;
    font-size: 13px;
`;

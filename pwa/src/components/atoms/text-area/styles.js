import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Label = styled.label`
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9FA8B3;
    margin-bottom: 8px;
`;

export const Input = styled.textarea`
    background: #FFFFFF;
    border: 1px solid #CCD4DB;
    border-radius: 3px;
    outline: none;
    width: 100%;
    resize: none;
    height: 120px;
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2D373C;

    &::placeholder {
        color: #CCD4DB;
    }
`;

export const Error = styled.span`
    color: red;
    font-size: 13px;
`;

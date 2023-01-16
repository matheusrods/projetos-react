import styled, { css } from 'styled-components';

export const Container = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: ${(props)=> props.flexDirection ?? 'column'}
`;
export const ContainerInput = styled.div`
    display: flex;
    margin-top: 8px;
`;

export const TextInput = styled.input`
    width: ${(props) => props.width ?? '100%'};
    height: 44px;
    padding: 0px 12px;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2d373c;
    outline: none;

    &::placeholder {
        color: #ccd4db;
    }

    ${(props) =>
        props.errorMessage &&
        css`
            border-color: #ff5c69;
        `}
`;

export const Label = styled.label`
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    color: #9fa8b2;
    margin-bottom: 8px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;
export const ErrorMessage = styled.span`
    font-size: 12px;
    line-height: 21px;
    font-weight: 400;
    color: #ff5c69;
`;

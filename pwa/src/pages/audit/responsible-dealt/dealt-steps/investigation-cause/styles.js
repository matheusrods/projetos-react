import styled from 'styled-components';
import colors from '../../../../../styles/colors';

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 76px;
    overflow-y: auto;
`;

export const ContainerContent = styled.div`
padding: 20px 16px;
flex: 1;
overflow-y: auto;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #4f4f4f;
    text-transform: uppercase;
    margin-bottom: 8px;
`;

export const TextArea = styled.textarea`
    font-size: 0.875rem;
    line-height: 1rem;
    color: #2d373c;
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid #ccd4db;
    padding: 12px;
    height: 200px;
    resize: unset;
    outline: none;

    &::placeholder{
        color: #ccd4db;
    }
`;

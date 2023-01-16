import styled from 'styled-components';

export const TagContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    padding: 4px 6px;
    max-height: 24px;
    border: 1px solid ${(props) => props.color ?? '#000000' };
    background-color: ${(props) => props.color ?? '#000000'}1A;
    label{
        color: ${(props) => props.color ?? '#000000' }
    }
`;

export const Label = styled.label`
    font-size: 0.75rem;
    font-weight: 500;
`;

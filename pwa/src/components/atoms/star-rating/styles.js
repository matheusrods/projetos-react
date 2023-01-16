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
    margin-bottom: 12px;
`;

export const Wrapper = styled.div`
    display: flex;
    gap: 10px;

    svg {
        cursor: ${props => props.pointer ? 'pointer' : 'default'};
    }
`;

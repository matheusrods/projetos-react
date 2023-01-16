import styled from 'styled-components';
import colors from '../../../styles/colors';

export const ContainerItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

export const Label = styled.label`
    font-weight: 400;
    font-size: 0.6875rem;
    line-height: 1.25rem;
    color: ${colors.gray6};
`;

export const Value = styled.label`
    font-weight: 400;
    font-size: 0.6875rem;
    line-height: 1.25rem;
    color: ${colors.gray6};
`;

export const Line = styled.hr`
    border: none;
    border-bottom: 1px solid #2d373c1a;
    margin: 8px 0;
`;

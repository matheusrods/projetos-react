import styled from 'styled-components';
import colors from '../../../styles/colors';

export const ContainerItem = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
`;

export const ContainerValues = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
`;

export const Label = styled.label`
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1rem;
    margin-right: 16px;
    min-width: 35px;
    color: ${(props) => props.ncom ? '#EB5757' : colors.gray6};
`;

export const Value = styled.label`
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    color: ${(props) => props.ncom ? '#EB5757' : colors.gray6};
`;

export const Button = styled.label`
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: ${colors.auditOrange};
    display: flex;
    align-items: center;
    margin: 5px 0px;
    cursor: pointer;
`;

export const Line = styled.hr`
    border: none;
    border-bottom: 1px solid #2d373c1A;
    margin: 4px 0;
`;

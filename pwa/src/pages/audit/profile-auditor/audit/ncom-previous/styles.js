import styled from 'styled-components';
import colors from '../../../../../styles/colors';

export const Container = styled.div`
    height: calc(100% - 107px);
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 20px 16px 50px;
    max-width: 768px;
    margin: 0px auto;
    overflow-y: auto;
    gap: 24px;

    @media (min-width: 768px) {
        padding: 20px 16px;
    }
`;
export const CardContainer = styled.div`
    background-color: white;
    padding: 16px;
    border-radius: 3px;
    border-left: 3px solid ${colors.auditOrange};
    gap: 8px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

export const ContainerItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
export const ContainerItemColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: ${colors.gray6};
`;

export const LabelCriticism = styled.span`
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #828282;
`;

export const ValueCriticism = styled.label`
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const LinkAction = styled.span`
    padding: 5px 0px;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #faa50a;
    margin-right: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    & svg{
        margin-left: 5px;
    }
`;


import styled from 'styled-components';
import colors from '../../../styles/colors';

export const CardContainer = styled.div`
    background-color: ${(props) => props.backgroundColor ?? '#fff'};
    box-shadow: 0px 3px 10px 0px #00000005;
    border-left: 3px solid ${(props) => props.borderColor ?? '#fff'};
    border-radius: 3px;
    /* min-height: 64px; */
    cursor: pointer;
    padding: 16px 16px 16px 11px;
    margin-bottom: 18px;
    line-height: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
`;

export const ContainerList = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const ContainerRequirements = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
`;

export const SubTitle = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #4f4f4f;
    margin-bottom: 8px;
`;

export const Id = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #828282;
    margin-bottom: 8px;
`;

export const Description = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #4f4f4f;
    margin-bottom: 24px;
`;

export const Infos = styled.div`
    color: ${colors.black};
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Title = styled.h3`
    color: ${colors.black};
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    margin-bottom: 4px;
`;

export const Type = styled.span`
    color: ${colors.gray5};
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
`;

export const ContainerButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

export const Button = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    color: ${colors.auditOrange};
    font-weight: 500;
    font-size: 0.75rem;
`;

export const Icon = styled.i`
    display: flex;
    align-items: flex-end;
    margin-left: 4px;
`;

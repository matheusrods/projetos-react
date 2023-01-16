import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;
    padding-bottom: 76px;
`;

export const ContainerText = styled.div`
    flex: 1;
    padding: 20px 16px;
    overflow-y: auto;
`;

export const ContainerHeader = styled.div`
    margin-bottom: 24px;
`;

export const ContainerHeaderTitle = styled.h1`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    color: ${colors.gray4};
`;

export const ContainerHeaderSubTitle = styled.span`
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: #9fa8b2;
`;

export const H2 = styled.h2`
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #4f4f4f;
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 16px;
`;

export const Request = styled.div``;

export const Requests = styled.div``;

export const RequestTitle = styled.h2`
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #4f4f4f;
    text-transform: uppercase;
    color: ${colors.auditOrange}
`;

export const AccordionInfo = styled.span`
    font-size: 0.625rem;
    font-weight: 400;
    line-height: 1rem;
    color: #9fa8b2;
`;

export const RequestItem = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const InputContainer = styled.div`
    margin-bottom: 24px;
    &:last-child {
        margin-bottom: 0px;
    }
`;

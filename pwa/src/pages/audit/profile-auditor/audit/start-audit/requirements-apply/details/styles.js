import styled from 'styled-components';
import colors from '../../../../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px 16px 60px;
    overflow-y: auto;
    gap: 4px;
`;

export const Title = styled.h1`
    font-weight: 500;
    font-size: 1rem;
    color: #2d373c;
    margin-bottom: 16px;
`;

export const Request = styled.div``;

export const Requests = styled.div``;

export const RequestTitle = styled.h2`
    margin-top: 10px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1rem;
    color: #faa50a;
    text-transform: uppercase;
`;

export const AccordionInfo = styled.span`
    font-size: 0.75rem;
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

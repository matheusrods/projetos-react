import styled from 'styled-components';
import colors from '../../../../../styles/colors';

export const Container = styled.div`
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
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
    color: #9FA8B2;
`;

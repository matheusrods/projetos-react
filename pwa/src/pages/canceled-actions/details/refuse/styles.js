import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.gray1};
    height: 100%;
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        height: calc(100% - 76px);
        margin-top: 76px;
    }
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;
`;

export const Description = styled.p`
    margin-bottom: 24px;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
`;

export const PageInfo = styled.div`
    margin-bottom: 16px;
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9fa8b3;
    text-align: justify;
`;

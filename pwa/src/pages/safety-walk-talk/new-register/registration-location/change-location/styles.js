import styled from 'styled-components';
import colors from '../../../../../styles/colors';

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
    flex: 1;
    padding: 20px 16px 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Description = styled.p`
    margin-bottom: 24px;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
`;

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
`;

export const ContainerModal = styled.div`
    width: 100%;
`;

export const TitleModal = styled.h3`
    padding: 0px 16px 16px;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid ${colors.grayBorder};
    color: ${colors.gray4};
`;

export const DescriptionModal = styled.p`
    padding: 16px 16px 0px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray5};
`;

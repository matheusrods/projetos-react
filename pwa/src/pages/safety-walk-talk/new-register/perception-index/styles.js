import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.gray2};
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

export const PageInfo = styled.div`
    margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2D373C;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
    text-align: justify;
`;

export const PerceptionIndex = styled.div`
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;
`;

export const PerceptionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 32px;
`;

export const PerceptionIcon = styled.div`
    height: 64px;
    width: 64px;
    border-radius: 50%;
    background-color: ${colors.gray1};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`;

export const PerceptionTitle = styled.span`
    font-size: 14px;
    color: ${colors.gray4};
    margin-bottom: 8px;
`;

export const PerceptionValue = styled.span`
    font-size: 40px;
    color: ${colors.gray4};
`;

export const Label = styled.span`
    color: ${colors.gray5};
    font-weight: 500;
    font-size: 10px;
    margin-bottom: 8px;
`;

export const Value = styled.span`
    color: ${colors.gray6};
    font-size: 20px;
`;

export const Wrapper = styled.div`
    padding: 24px;
    border-top: 1px solid ${colors.grayBorder};
    display: flex;
    width: calc(100% - 32px);
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`;

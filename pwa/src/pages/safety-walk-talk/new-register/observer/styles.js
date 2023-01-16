import styled from 'styled-components';
import colors from '../../../../styles/colors';

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

export const ObserverCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    background: #F2F6FA;
    border-radius: 3px;
    margin-bottom: 8px;
`;

export const ObserverAvatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    background: #009999;
    border-radius: 24px;
    margin-right: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #FFFFFF;

    img {
        height: 40px;
        width: 40px;
        border-radius: 24px;
    }
`;

export const ObserverInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ObserverName = styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #5E687D;
`;

export const ChangeObserver = styled.button`
    height: 44px;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #FAA50A;
    text-decoration: none;
    outline: none;
    border: 0px;
    background-color: transparent;
`;

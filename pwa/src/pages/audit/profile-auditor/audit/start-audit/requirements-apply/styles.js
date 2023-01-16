import styled from 'styled-components';
import colors from '../../../../../../styles/colors';

export const Container = styled.div`
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
    font-weight: 400;
    font-size: 1rem;
    color: ${colors.gray4};
    margin-bottom: 16px;
`;

export const ContainerCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
`;

export const CardNCOM = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffffff;
    padding: 16px;
    border-radius: 3px;
`;

export const SubCard = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TitleSubCard = styled.h1`
    font-weight: 500;
    font-size: 0.875rem;
    color: ${colors.gray4};
    margin-bottom: 13px;
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #8282824a;
    margin-bottom: 10px;
`;

export const ItemId = styled.span`
    font-weight: 400;
    font-size: 0.875rem;
    color: #828282;
    margin-bottom: 13px;
`;

export const ItemContent = styled.div`
    display: flex;
`;

export const ItemLabel = styled.div`
    font-weight: 400;
    font-size: 0.875rem;
    color:#4F4F4F;
    margin-bottom: 5px;
    min-width: 35px;
    margin-right: 5px;
`;

export const ItemValue = styled.div`
    font-weight: 400;
    font-size: 0.875rem;
    color: #4F4F4F;
    margin-bottom: 8px;
`;


export const TitleSubCardButton = styled.button`
    border: none;
    background-color: transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #faa50a;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    margin: 10px 0px 20px 0px;
`;

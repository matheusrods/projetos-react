import styled from "styled-components";
import colors from "../../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

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

export const PageInfo = styled.div``;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    margin-bottom: 4px;
`;

export const Wrapper = styled.div`
    > div > svg {
        margin-bottom: 22px;
    }

    display: flex;
    height: calc(100% - 56px);
    flex-direction: column;
`;

export const WrapperContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;

export const WrapperDescription = styled.p`
    font-size: 16px;
    color: ${colors.gray5};
    line-height: 19px;
    text-align: center;
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    gap: 15px;
    flex-direction: column;
`;

export const CardsWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 88px;
`;

export const PageDescription = styled.p`
    color: ${colors.gray5};
    font-size: 12px;
`;

import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;

`;

export const Content = styled.div`
    width: 100%;
    max-width: 768px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background: ${colors.shape};
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 20px;
    overflow-y: auto;
    width: 100%;
`;
export const PageInfo = styled.div``;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    border-bottom: 1px solid ${colors.grayBorder};
    padding-bottom: 12px;
    margin-bottom: 8px;
`;
export const PageDescription = styled.p`
    color: ${colors.gray5};
    font-size: 12px;
`;

export const Wrapper = styled.div`
    > div > svg {
        margin-bottom: 27px;
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(100% - 56px);
    flex-direction: column;
`;

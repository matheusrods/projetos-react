import styled from 'styled-components';

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: #e9edf2;
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 76px;
    overflow-y: auto;
`;

export const ContainerContent = styled.div`
padding: 20px 16px;
flex: 1;
overflow-y: auto;
`;

export const ContainerTitles = styled.div`
    margin-bottom: 24px;
`;

export const H2 = styled.h2`
    font-size: 0.875rem;
    line-height: 1rem;
    color: #828282;
    margin-bottom: 8px;
`;

export const H1 = styled.h1`
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const ContainerMore = styled.div`
    width: 100%;
    margin-top: 24px;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: rgba(250, 165, 10, 1);
    cursor:pointer;
`;

export const ContainerIcon = styled.div`
    margin-right: 5px;
    display: flex;
    align-items: center;
    font-size: 1rem;
`;

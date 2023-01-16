import styled from 'styled-components';

export const Container = styled.div`
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    padding: 15px 20px 15px 15px;
    display: flex;
    align-items: center;
    position: relative;
`;

export const ContainerIcon = styled.div`
    font-size: 2.125rem;
    color: #4f4f4f;
    margin-right: 10px;
    display: flex;
    align-items: center;
`;

export const ContainerContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 75%;
`;

export const ContainerClose = styled.div`
    position: absolute;
    z-index: 10;
    top: 8px;
    right: 12px;
`;

export const ContainerText = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const Name = styled.span`
    font-size: 0.75rem;
    line-height: 16px;
    color: #4f4f4f;
    margin-right: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Size = styled.span`
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 16px;
    color: #828282;
`;

import styled from 'styled-components';

export const Container = styled.div`
    background-color: #ffffff;
    border-radius: 3px;
    padding: 16px;
    padding-bottom: 44px;
    margin-bottom: 24px;
`;

export const Header = styled.div`
    color: ${(props) => props.color};
    display: flex;
    align-items: center;
    margin-bottom: 17px;
`;
export const ContainerIcon = styled.div`
    background-color: #F2F2F2;
    border-radius: 50%;
    padding: 7px;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h3`
    font-size: 0.875rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
`;

export const Content = styled.div``;

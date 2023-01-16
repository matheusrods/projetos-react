import styled from 'styled-components';

export const Container = styled.div`
    max-width: 100%;
    margin: 76px auto 0px;
    height: calc(100% - 76px);

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Header = styled.div`
    height: 40px;
    width: 100%;
    background-color: #FFFFFF;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Footer = styled.div`
    height: 40px;
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    grid-gap: 3px;
    padding: 6px;
`;

export const Color = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 100%;
    border: none;
    outline: none;
    background-color: ${props => props?.color ? props.color : '#000'};
    cursor: pointer;
`;

export const Button = styled.button`
    height: 28px;
    padding: 0px 4px;
    background-color: #FAA50A;
    border-radius: 4px;
    outline: none;
    border: none;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    color: #FFFFFF;
    cursor: pointer;
`;

export const DotButton = styled.button`
    height: 28px;
    width: 28px;
    border-radius: 14px;
    background-color: #FAA50A;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const WeightLine = styled.div`
    width: ${props => props.size ?? 5}px;
    height: ${props => props.size ?? 5}px;
    border-radius: ${props => props.size ?? 5}px;
    background-color: #FFFFFF;
`;

export const ContainerActions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

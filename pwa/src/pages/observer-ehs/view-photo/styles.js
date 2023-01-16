import styled from 'styled-components';

export const Container = styled.div`
    background: url(${props => props.imageURL ?? ''}) black;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    max-width: 768px;
    margin: 0px auto;

    @media (min-width: 768px) {
        height: calc(100% - 76px);
        margin-top: 76px;
    }
`;

export const Header = styled.div`
    padding: 16px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const CloseButton = styled.button`
    font-size: 24px;
    color: #FFFFFF;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Footer = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: flex-end;
    padding: 0px 16px 24px;
`;

export const BackButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 100%;
    background: #FAA50A;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    border: none;
`;

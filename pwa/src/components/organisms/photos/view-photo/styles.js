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

export const EditPhotoButton = styled.button`
    background-color: #FAA50A;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 21px;
    box-shadow: 0px 8px 8px rgba(250, 165, 10, 0.12);
`;

export const RemovePhotoButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 100%;
    background: transparent;
    border: 2px solid #FAA50A;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #FAA50A;
    cursor: pointer;
    position: relative;
    outline: none;

    svg {
        position: absolute;
        left: 16px;
        font-size: 16px;
    }
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

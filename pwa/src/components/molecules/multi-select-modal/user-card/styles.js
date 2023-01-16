import styled from 'styled-components';

export const Container = styled.button`
    background-color: #F2F6FA;
    border-Radius: 3px;
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    outline: none;
    border: 0px;
    cursor: pointer;
`;

export const Check = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;

    svg {
        color: #00B247;
        font-size: 20px;
    }
`;

export const Avatar = styled.div`
    height: 40px;
    width: 40px;
    background-color: #009999;
    border-radius: 24px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;

    img {
        height: 40px;
        width: 40px;
        border-radius: 24px;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Name = styled.span`
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #5E687D;
`;

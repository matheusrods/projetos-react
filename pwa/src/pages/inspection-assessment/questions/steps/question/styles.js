import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`;

export const ButtonsWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    width: 100% !important;
    justify-content: flex-end;
    button{
        margin: 0 10px;
    }
`;

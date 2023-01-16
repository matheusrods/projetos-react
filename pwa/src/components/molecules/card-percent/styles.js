import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    padding-bottom: 30px;
`;

export const Value = styled.div`
    font-size: 26px;
    color: ${props => props.color};
`;

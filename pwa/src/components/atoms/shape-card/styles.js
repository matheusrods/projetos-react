import styled from "styled-components";

export const Card = styled.div`
    background-color: ${props => props.backgroundColor};
    padding: 10px 20px;
    border-radius: 5px;
    ${props => props.shadow && `-webkit-box-shadow: 1px 3px 8px 2px rgba(0,0,0,0.2);`}
    ${props => props.shadow && `box-shadow: 1px 3px 8px 2px rgba(0,0,0,0.2);`}
`;

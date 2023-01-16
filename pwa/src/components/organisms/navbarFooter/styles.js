import styled from 'styled-components';

export const Container = styled.div`
    background-color: #fff;
    width: 100%;
    z-index: 108;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:8px 40px;
    box-shadow: 0px -2px 4px rgb(0 0 0 / 8%);
`;

export const ItemsContainer = styled.div`
    max-width: 768px;
    display: flex;
    width:100%;
    justify-content: space-between;
`;

export const ItemContainer = styled.div`
    cursor: pointer;
    color: ${props => props.color};
    &:not(:first-child):not(:last-child){
       position: relative;
       left: 15px;
    }
`;

export const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
`;

export const ItemIcon = styled.div`

`;

export const ItemLabel = styled.span`
    font-size: 0.75rem;
`;

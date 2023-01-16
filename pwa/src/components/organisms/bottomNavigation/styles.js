import styled from 'styled-components';

import colors from '../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.white};
    width: 100%;
    z-index: 108;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px;
    box-shadow: 0px -2px 4px rgb(0 0 0 / 8%);
`;

export const ItemContainer = styled.div`
    cursor: pointer;
    color: ${(props) => props.color};

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ItemIcon = styled.div``;

export const ItemLabel = styled.p`
    font-size: 0.75rem;
`;

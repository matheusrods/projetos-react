import styled, { css } from 'styled-components';

export const Container = styled.div`
    ${props => props?.fixed &&
        css`
            top: 0;
            left: 0;
            position: fixed;
            width: calc(100% - 32px);
        `
    }

    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #EBF0F5;
    background: #FFFFFF;
    padding: 16px;
    max-width: 768px;
    width: 100%;
    margin: 0 auto;

    svg {
        cursor: pointer;
    }
`;

export const Title = styled.h1`
    font-size: 20px;
    color: #2D373C;
`;

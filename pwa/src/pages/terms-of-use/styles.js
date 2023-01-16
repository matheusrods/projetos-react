import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
    flex: 1;
    padding: 24px 16px;
    overflow-y: auto;

    ${props => !(props?.loading) && 
        css`* {
            padding: revert;
            margin: revert;
            font-weight: revert;
        }`
    }
`;
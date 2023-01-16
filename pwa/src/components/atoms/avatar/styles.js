import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    width: ${props => props.width ?? '32'}px;
    height: ${props => props.height ?? '32'}px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${colors.gray5};

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    span {
        font-size: ${props => props.fontSize ?? '12'}px;
        color: #fff;
        cursor: default;
    }
`;

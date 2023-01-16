import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;
export const IconWrapper = styled.div`
    margin-bottom: 20px;
`;

export const Text = styled.h4`
    font-size: 24px;
    color: ${colors.gray10};
    text-align: center;
    margin-bottom: 16px;
`;

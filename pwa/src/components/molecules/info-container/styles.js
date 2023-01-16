import styled from 'styled-components';

import colors from '../../../styles/colors';

export const Container = styled.div`
    position: absolute;
    bottom: 30px;
    margin: 60px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const InfoIcon = styled.div`
    background-color: ${colors.gray5};
    color: ${colors.white};

    padding: 16px;
    border-radius: 50px;
    margin: 16px;
`;

export const InfoText = styled.p`
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: ${colors.gray5};
`;

import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.gray2};
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    flex-direction: column;
    flex: 1;
`;

export const Title = styled.h2`
    color: ${colors.gray10};
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    margin: 25px 50px 8px;
    text-align: center;
`;

export const Description = styled.p`
    color: ${colors.gray10};
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;
`;

export const IconContainer = styled.div`
    height: 64px;
    width: 64px;
    border-radius: 50%;
    background-color: transparent;
    border: 5px solid ${colors.greenAux};
    display: flex;
    align-items: center;
    justify-content: center;
`;

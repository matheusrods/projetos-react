import styled from 'styled-components';
import { ButtonDefault } from '../../../components/atoms';
import colors from '../../../styles/colors';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fff;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: ${props => props?.visible ? '0px' : '-100vw'};
    top: 0;
    transition: 0.5s left ease-in;
    flex-direction: column;
    max-width: 768px;
    margin: 0 auto;
`;

export const Content = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: auto;
`;

export const Title = styled.h1`
    font-size: 26px;
    color: ${colors.gray4};
    margin-bottom: 8px;
    margin-top: 16px;
`;

export const Details = styled.p`
    text-align: center;
    font-size: 14px;
    color: ${colors.gray5};
`;

export const IconContainer = styled.div`
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.error ? colors.redAux : colors.greenAux};
    border-radius: 50%;

    svg {
        font-size: 24px;
        color: #fff;
    }
`;

export const Button = styled(ButtonDefault)`
    margin-top: auto;
`;

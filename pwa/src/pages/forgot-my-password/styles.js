import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
    height: 100%;
    display: flex;
    background-color: #EE5252;
    flex-direction: column;
    justify-content: space-between;
    max-width: 768px;
    margin: 0 auto;
`;

export const LogoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;

    padding: 48px 0px;

    span {
        &:nth-child(1) {
            font-size: 48px;
            font-weight: 300;
            line-height: 58px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        &:nth-child(2) {
            font-size: 26px;
            font-weight: 400;
            line-height: 40px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
        }
    }
`;

export const AuthContainer = styled.div`
    flex: 2;
    padding: 32px 16px;
    background-color: #FFFFFF;
    border-radius: 14px 14px 0px 0px;
`;

export const PageDescription = styled.p`
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #9FA8B2;
`;

export const CustomForm = styled(Form)`
    margin-bottom: 16px;
`;

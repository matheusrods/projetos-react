import styled from 'styled-components';
import { Form } from '@unform/web';
import colors from '../../../styles/colors';

export const Container = styled.div`
    height: 100%;
    display: flex;
    background-color: #EE5252;
    flex-direction: column;
    justify-content: space-between;
    max-width: 768px;
    margin: 0 auto;
`;

export const CodeContainer = styled.div`
    flex: 2;
    padding: 32px 16px;
    background-color: #FFFFFF;
    border-radius: 14px 14px 0px 0px;
    margin-top: 48px;
`;

export const PageTitle = styled.h1`
    font-size: 20px;
    font-weight: 500;
    color: ${colors.gray4};
    margin-bottom: 12px;
`;

export const PageDescription = styled.p`
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #9FA8B2;
`;

export const PageMessage = styled.p`
    margin-bottom: 24px;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #9FA8B2;
`;

export const ClickHere = styled.button`
    outline: none;
    border: none;
    font-weight: 500;
    color: ${colors.blueAux};
    font-size: 14px;
    text-decoration: underline;
    background: none;
`;

export const CustomForm = styled(Form)`
    margin-bottom: 16px;
`;

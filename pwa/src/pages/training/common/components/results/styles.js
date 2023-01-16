import styled, { css } from 'styled-components';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import colors from '../../../../../styles/colors';
import { Font } from '../../styles';
import { Container as WizardContainer } from '../wizardForm/styles';

export const Container = styled(WizardContainer)`
    padding: 0 16px;
    background-color: ${colors.gray2};
`;

export const Title = styled(Font)`
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;

    color: ${colors.gray4};
`;

export const Caption = styled(Title)`
    font-size: 12px;
    line-height: 14px;

    color: ${colors.gray5};
`;

export const Card = styled.div`
    margin: 16px 0;
    padding: 0 16px;
    height: 205px;

    background: ${colors.white};
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    text-align: center;
`;

export const CardTitle = styled(Title)`
    font-size: 14px;
    line-height: 17px;
`;

export const CardBold = styled(Title)`
    font-size: 40px;
    line-height: 44px;
`;

export const CardCaption = styled(Title)`
    ${({ approved }) => css`
        font-size: 12px;
        line-height: 16px;

        color: ${colors[approved ? 'greenAux' : 'redAux']};
    `}
`;

export const IconCheck = styled(FaCheckCircle).attrs(({ size = 46 }) => ({
    size,
    color: colors.greenAux
}))``;

export const IconTimes = styled(FaTimesCircle).attrs(({ size = 46 }) => ({
    size,
    color: colors.redAux
}))``;

export const Question = styled(Font)`
    font-size: 14px;
    line-height: 20px;

    color: ${colors.gray6};
`;

export const Answer = styled(Font)`
    ${({ correct }) => css`
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;

        color: ${colors[correct ? 'greenAux' : 'redAux']};
    `}
`;

export const RowContainer = styled.div`
    margin: 16px 0;
`;

export const AnswersContainer = styled.div`
    margin-top: 46px;
`;

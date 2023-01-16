import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';

import colors from '../../../../../../../styles/colors';
import { Font, Row as CustomRow } from '../../../../../common/styles';

export const Title = styled(Font)`
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    color: ${colors.gray4};
`;

export const Caption = styled(Font)`
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    padding: 16px 0 26px 0;

    color: ${colors.gray5};
`;

export const SubTitle = styled(Font)`
    font-size: 12px;
    line-height: 14px;

    color: ${colors.blackAux};
`;

export const Question = styled(Font)`
    font-size: 14px;
    line-height: 20px;

    color: ${colors.gray6};
    width: 70%;
`;

export const Answer = styled(Font)`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray6};
`;

export const EditIcon = styled(FaPen).attrs({
    size: 24,
    color: colors.gray5
})``;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Item = styled.div`
    padding: 16px 0;
`;

export const Row = styled(CustomRow)`
    align-items: flex-start;
    padding-bottom: 10px;
`;

import styled from 'styled-components';

import colors from '../../../../../styles/colors';
import { Card as TrainingCard } from '../../../common/styles';

export const Card = styled(TrainingCard)`
    padding: 20px 12px;
    border-left: 3px solid ${colors.blueAux};
    margin-bottom: 8px;
`;

export const CardTitle = styled.p`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    display: flex;
    align-items: center;

    color: ${colors.gray6};
`;

export const CardSubtitle = styled(CardTitle)`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
`;

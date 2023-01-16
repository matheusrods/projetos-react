import styled from 'styled-components';
import { LoadingIcon } from '../../../components/atoms';

import colors from '../../../styles/colors';

export const CardIcon = styled.div`
    color: ${colors.gray10};
`;

export const CardText = styled.p`
    font-size: 12px;
    padding: 5px 10px;

    & strong {
        line-height: 18px;
        font-size: 16px;
        color: ${colors.gray6};
    }
`;

export const Loading = styled(LoadingIcon).attrs({ size: 28 })``;

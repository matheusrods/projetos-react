import styled from 'styled-components';

import colors from '../../../../../styles/colors';
import { Font } from '../../styles';

export const Container = styled.div`
    width: 100%;
`;

export const Title = styled(Font)`
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;

    padding: 10px 0;

    color: ${colors.gray4};
`;

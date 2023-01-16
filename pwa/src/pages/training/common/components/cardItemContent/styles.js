import styled from 'styled-components';

import colors from '../../../../../styles/colors';
import { Font } from '../../styles';

const styles = {
    justifyContent: 'center',
    alignItems: 'flex-start'
};

export const CardTitle = styled(Font)`
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray6};
`;

export const CardSubTitle = styled(Font)`
    font-style: italic;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray5};
`;

export default styles;

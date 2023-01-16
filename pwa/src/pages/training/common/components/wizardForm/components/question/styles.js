import styled from 'styled-components';

import colors from '../../../../../../../styles/colors';
import { Font } from '../../../../styles';

const styles = {
    next: { zIndex: 111, height: 50 }
};

export const Bold = styled(Font)`
    font-size: 12px;
    line-height: 14px;

    color: ${colors.blackAux};
`;

export const Caption = styled(Font)`
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;

    color: ${colors.gray5};
`;

export const ViewContainer = styled.div`
    margin: 10px 0;
    & span {
        text-align: left;
    }
`;

export default styles;

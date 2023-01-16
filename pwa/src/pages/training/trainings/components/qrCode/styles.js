import { FaQrcode } from 'react-icons/fa';
import styled from 'styled-components';

import colors from '../../../../../styles/colors';
import { Container, Font } from '../../../common';

const styles = {
    color: colors.white,
    backgroundColor: colors.gray5,
    bottom: 68,
    right: 12,
    position: 'absolute',
    icon: <FaQrcode />
};

export const QrCodeContainer = styled(Container)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const QrCodeCaption = styled(Font)`
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;

    text-align: center;

    color: ${colors.gray10};
`;

export default styles;

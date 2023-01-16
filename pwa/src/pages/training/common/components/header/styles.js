import styled from 'styled-components';

import { Container } from '../../../../../components/organisms/header/styles';
import colors from '../../../../../styles/colors';
import { Font } from '../../styles';

const styles = {
    icon: colors.white
};

export const Header = styled(Container)`
    background-color: ${colors.client};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled(Font)`
    font-size: 18px;
    line-height: 32px;
    color: ${colors.white};
`;

export const SubTitle = styled(Font)`
    font-size: 14px;
    line-height: 16px;
    color: ${colors.whiteAux};
`;

export default styles;

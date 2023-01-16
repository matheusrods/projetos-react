import styled, { css } from 'styled-components';

import { Container } from '../../../components/atoms/modal/styles';
import { Title as TitleCard } from '../common/styles';

export const Title = styled(TitleCard)`
    padding: 16px;
`;

export const Modal = styled(Container)`
    ${({ visible = false, height = 0 }) => css`
        max-width: 100%;
        bottom: ${!visible ? `-100%` : `-${height}px`};
        height: 100%;
        z-index: 999;
    `}
`;

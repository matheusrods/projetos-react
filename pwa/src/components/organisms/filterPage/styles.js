import { FaTimes, FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

import colors from '../../../styles/colors';

export const Title = styled.h2`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 44px;

    color: ${colors.gray4};
`;

export const Container = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid ${colors.grayBorder};
`;

export const CloseIcon = styled(FaTimes).attrs(({ color = 'black' }) => ({
    size: 24,
    color
}))``;

export const CheckIcon = styled(FaCheck).attrs({ size: 14 })``;

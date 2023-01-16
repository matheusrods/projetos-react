import { FaRegCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { LoadingContainer } from '../../../../../components/atoms/loading/styles';

import colors from '../../../../../styles/colors';
import { Font } from '../../../common/styles';

const styles = {
    next: { zIndex: 111, height: 50 },
    loading: colors.redAux
};

export const Container = styled.div`
    height: 100%;
    margin-top: 116px;
`;

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

export const IconCheck = styled(FaRegCheckCircle).attrs({
    size: 46,
    color: colors.greenAux
})``;

export const SuccessContainer = styled(LoadingContainer)`
    margin-top: -76px;
`;

export const ViewContainer = styled.div`
    margin: 10px 0;
`;

export const Text = styled(Font)`
    font-size: 14px;
    line-height: 20px;

    padding: 10px 0;

    color: ${colors.gray5};
`;

export default styles;

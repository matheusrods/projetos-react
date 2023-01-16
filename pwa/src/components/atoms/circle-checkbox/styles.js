import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import colors from '../../../styles/colors';

export const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
`;

export const Icon = styled(FaCheck)`
    color: ${colors.white};
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    display: none;
`;

export const StyledCheckbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: ${(props) => (props.checked ? colors.greenAux : colors.gray2)};
    border-radius: 12px;
    transition: all 150ms;
    box-shadow: 0 0 0 1px ${colors.gray4_2};
    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${colors.greenLight};
    }
    ${Icon} {
        visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
    }
`;

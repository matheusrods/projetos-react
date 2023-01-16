import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    position: relative;
`;
export const WrapperLabel = styled.div`
  cursor: pointer;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    ${props => props.align === 'left' && `
        left: 0;
    `}
    ${props => props.align === 'right' && `
        right: 0;
    `}
    width: auto;
    z-index: 99;
    background: ${colors.white};
    border: 1px solid ${colors.gray4_2};
    min-width: 200px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
`;

export const Wrapper = styled.div`
    width: 100%;
`;
export const DropdownItem = styled.div`
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        background-color: ${colors.gray1};
    }
`;

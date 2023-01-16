import styled, { css } from 'styled-components';
import { rgba } from 'polished';

export const Header = styled.div`
    padding: 9px 16px 12px;
    border-bottom: 1px ${rgba('#9FA8B3', 0.2)} solid;
`;

export const Content = styled.div`
    display: grid;
    justify-items: flex-end;
    grid-gap: 8px;
    padding: 16px 16px 50px;
`;

export const Line = styled.div`
    width: 40px;
    height: 4px;
    background: #e9edf2;
    border-radius: 2px;
    margin: 0px auto 16px;
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: #2d373c;
`;

export const Option = styled.button`
    display: flex;
    justify-content: center;
    padding: 8px 0px;
    color: ${(props) => (props?.color ? props.color : '#5E687D')};
    background-color: transparent;
    outline: none;
    border: 0px;
    cursor: pointer;
    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.3;
            cursor: default;
        `}

    svg {
        font-size: 14px;
    }
`;

export const OptionName = styled.span`
    margin-right: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
`;

import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';
import { Tab, TabList } from 'react-tabs';
import { rgba } from 'polished';
export const Container = styled.div`
    margin-top: 76px;
`;
export const StyledTabList = styled(TabList)`
    ${({ color = colors.white }) => css`
        width: 100%;
        height: 42px;
        display: flex;
        list-style: none;
        background-color: ${color};
        margin-bottom: 20px;
    `}
`;

export const StyledTab = styled(Tab)`
    ${({ selected, bbc = rgba(colors.gray5, 0.12) }) => css`
        cursor: pointer;
        width: 50%;
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10px;
        background-color: transparent;

        color: ${selected ? colors.gray4 : colors.gray5};
        border-bottom: 1px solid ${selected ? colors.orange2 : bbc};
    `}
`;
export const TabHeader = styled.div`
    padding-top: 10px;
    background-color: #fff;
    position: fixed;
    top: 76px;
    width: 100%;
    z-index: 5;
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    ul {
        margin-bottom: 0;
        li {
            svg {
                margin-right: 10px;
            }
        }
    }
`;

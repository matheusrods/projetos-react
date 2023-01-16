import styled, { css } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import colors from '../../../styles/colors';

export const Container = styled.div`
    background-color: #fff;
    width: 100%;
    /* padding-top: 10px; */
    /* z-index: 110; */
    box-shadow: ${(props) => props?.boxShadow ?? 'none'};
    position: ${(props) => props?.position ?? null};
    z-index: ${(props) => props?.zIndex ?? null};
    /* top: 0; */

    ${(props) =>
        props?.hiddenMobile &&
        css`
            @media (max-width: 768px) {
                display: none;
            }
        `}
`;

export const Content = styled.div`
    max-width: 768px;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const MenuIcon = styled(GiHamburgerMenu)`
    color: ${colors.gray4_2};
    cursor: pointer;
`;

export const LeftHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    gap: 16px;
`;

export const RightHeader = styled.div`
    margin-right: 16px;
`;

export const TabContainer = styled.div`
    max-width: 768px;
    margin: 0 auto;
    display: flex;
    align-items: baseline;
    flex-direction: row;
    /* margin-top: 10px; */
    padding-top: 10px;
`;

export const TabOption = styled.div`
    display: flex;

    width: ${(props) => `calc(100% / ${props.numberOfTabs})`} ;
    justify-content: space-around;
    padding-bottom: 4px;
    cursor: pointer;

    ${(props) => {
        const { selected } = props;

        return css`
            color: ${selected ? colors.gray4 : colors.subText};
            border-bottom: ${selected ? `1px solid ${colors.orange2}` : null};
        `;
    }}
`;

export const TabDescription = styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
`;

export const DaysContainer = styled.div`
    max-width: 768px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
`;

export const WeekDaysHolder = styled.span`
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    color: ${(props) => (props.selected ? colors.client : colors.subText)};
`;

export const DaysHolder = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ${(props) => {
        const { selected } = props;

        return css`
            background-color: ${selected ? colors.client : colors.white};
        `;
    }}
`;

export const Days = styled.span`
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    border-radius: 4px;

    ${(props) => {
        const { selected } = props;

        return css`
            color: ${selected ? colors.white : colors.text};
        `;
    }}
`;

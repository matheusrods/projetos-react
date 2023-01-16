import styled from 'styled-components';
import colors from '../../../styles/colors';
import { Tab, TabList } from 'react-tabs';
import { rgba } from 'polished';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding-bottom: 16px;
    overflow-y: auto;
    height: 100%;
    max-height: calc(100% - 90px);
    max-width: 768px;
    margin: 90px auto 0px;

    @media (min-width: 768px) {
        margin-top: 166px;
        max-height: calc(100% - 166px);
    }
`;

export const HeaderContainer = styled.div`
    height: 90px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 5;
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);

    @media (min-width: 768px) {
        top: 76px;
    }
`;

export const Header = styled.div`
    font-size: 20px;
    color: ${colors.gray6};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
`;

export const Title = styled.h2`
    color: ${colors.gray4};
    font-size: 16px;
    font-weight: 500;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const Strong = styled.span`
    font-weight: 500;
`;

export const StyledTabList = styled(TabList)`
    width: 100%;
    height: 42px;
    display: flex;
    list-style: none;
    background-color: #fff;
    margin-top: 8px;
`;

export const StyledTab = styled(Tab)`
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

    color: ${(props) => (props.selected ? colors.gray4 : colors.gray5)};
    border-bottom: 1px solid
        ${(props) =>
            props.selected ? colors.orange2 : rgba(colors.gray5, 0.12)};
`;

export const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 56px);
    padding-top: 20px;
`;

export const WrapperTitle = styled.h2`
    font-weight: 500;
    font-size: 16px;
    color: ${colors.gray4};
    margin-bottom: 12px;
`;

export const Section = styled.div`
    padding: 12px 0;
    border-top: 1px solid ${colors.grayBorder};
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    &:last-of-type {
        border-bottom: 1px solid ${colors.grayBorder};
    }
`;

export const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 14px;
    color: ${colors.gray6};
    margin-bottom: 5px;
    flex-basis: 90%;
`;

export const SectionSub = styled.div`
    margin-bottom: 13px;
    &:last-of-type {
        margin-bottom: 0px;
    }
`;

export const SectionSubTitle = styled.h4`
    font-weight: 500;
    font-size: 12px;
    color: ${colors.gray6};
    margin-bottom: 5px;
`;

export const SectionText = styled.p`
    font-weight: 400;
    font-size: 12px;
    color: ${colors.gray6};
    line-height: 16px;
    flex-basis: 90%;
`;

export const Photo = styled.div`
    cursor: pointer;
    position: relative;
    height: 100%;
    width: 100%;

    img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
`;

export const ListPhotos = styled.div`
    display: flex;
    gap: 8px;
    overflow-x: auto;
    width: 100%;
    margin-top: 10px;

    div {
        width: calc((768px - 24px - 36px) / 4);
        height: calc((768px - 24px - 36px) / 4);
        min-width: calc((768px - 24px - 36px) / 4);
        min-height: calc((768px - 24px - 36px) / 4);

        @media (max-width: 768px) {
            width: calc((100vw - 24px - 36px) / 4);
            height: calc((100vw - 24px - 36px) / 4);
            min-width: calc((100vw - 24px - 36px) / 4);
            min-height: calc((100vw - 24px - 36px) / 4);
        }
    }
`;

export const CriticismDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? 'grey'};
    margin-right: 4px;
    border-radius: 50%;
    display: inline-block;
`;

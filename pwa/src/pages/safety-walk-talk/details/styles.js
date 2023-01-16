import styled from "styled-components";
import colors from "../../../styles/colors";
import { Tab, TabList } from "react-tabs";
import { rgba } from "polished";

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

export const Section = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    display: flex;
    line-height: 18px;
    flex-direction: column;
    padding: 16px;
`;

export const WalkTalkTitle = styled.div`
    font-weight: 500;
    color: ${colors.gray4};
    font-size: 16px;
    margin-bottom: 12px;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const WalkTalkLabel = styled.div`
    border-bottom: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray6};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    flex-direction: ${(props) => props.direction ?? "row"};

    & > span:first-child {
        font-size: 14px;
        font-weight: 500;
    }

    p {
        color: ${colors.gray5};
        font-size: 13px;
    }
`;

export const WalkTalkHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.grayBorder};
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
        ${(props) => (props.selected ? colors.orange2 : rgba(colors.gray5, 0.12))};
`;

export const ShowMoreSection = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 16px;
    width: 100%;
    color: ${colors.orange2};
    font-weight: 500;
    background: none;
    outline: none;
    border: none;
`;

export const ShowMore = styled.span`
    font-weight: inherit;
    color: inherit;
    margin-right: 8px;
`;

export const Text = styled.p`
    font-weight: 400;
    font-size: 12px;
    color: ${colors.gray6};
    line-height: 16px;
    flex-basis: 90%;
`;

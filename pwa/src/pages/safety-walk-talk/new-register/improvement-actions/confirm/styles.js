import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px 16px 16px;
    overflow-y: auto;
`;

export const Section = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    display: flex;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 32px;
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

export const PageInfo = styled.div`
    margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9fa8b3;
    text-align: justify;
`;

export const AddActionSection = styled(Link)`
    font-size: 12px;
    color: ${colors.orange2};
    font-weight: 500;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    display: flex;

    svg {
        margin-left: 6px;
        color: inherit;
    }
`;

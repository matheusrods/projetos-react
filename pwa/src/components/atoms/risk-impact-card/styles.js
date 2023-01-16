import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray1};
    border-radius: 3px;
    padding: 0 16px 16px;
    width: 100%;
`;

export const Header = styled.div`
    padding-top: 10px;
    margin-bottom: 13px;
    display: flex;
    position: relative;
    justify-content: space-between;
    min-height: 43px;

    &::after {
        content: "";
        position: absolute;
        left: -16px;
        top: 0;
        height: 100%;
        min-height: 53px;
        width: 3px;
        border-radius: 3px 0px 0px 0px;
        background-color: ${(props) => props.borderColor ?? "grey"};
    }

    > div {
        display: flex;
    }

    > svg {
        color: ${colors.gray5};
        font-size: 16px;
        align-self: center;
        position: relative;
        bottom: 6px;
        margin-left: 10px;
        min-width: 16px;
    }
`;

export const Title = styled.h2`
    font-weight: 500;
    color: ${colors.gray6};
    font-size: 14px;
    line-height: 20px;
    align-self: center;
`;

export const CardIcon = styled.div`
    display: flex;
    align-items: center;

    svg {
        font-size: 14px;
        color: ${colors.gray6};
        margin-right: 13px;
        margin-left: 3px;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 17px;

    > div {
        display: flex;
        flex-direction: column;
    }
`;

export const Label = styled.span`
    font-weight: 500;
    font-size: 10px;
    color: ${colors.gray5};
    margin-bottom: 6px;
`;

export const Value = styled.span`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: ${colors.gray4};
`;

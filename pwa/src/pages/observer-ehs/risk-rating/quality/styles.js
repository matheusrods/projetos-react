import { rgba } from "polished";
import styled from "styled-components";
import colors from "../../../../styles/colors";
import { Form } from "@unform/web";

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px 16px 32px;
    overflow-y: auto;
`;

export const PageInfo = styled.div`
    margin-bottom: 16px;
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

export const ObserverCard = styled.div`
    background-color: ${colors.gray1};
    border-radius: 3px;
    display: flex;
    padding: 16px;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
`;

export const ObserverLabel = styled.div`
    border-bottom: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray5};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    font-weight: 400;
    align-items: center;

    flex-wrap: wrap;

    & > * {
        flex: 1 1 auto;
    }

    & > span:first-child {
        font-size: 14px;
        color: ${colors.gray6};
        font-weight: 500;
    }

    p,
    span {
        &:last-child {
            display: flex;
            font-size: 13px;
            font-weight: 400;
            /* justify-content: flex-end; */
        }
    }

    div {
        span {
            color: ${colors.gray6};
        }
    }
`;

export const ObserverInfo = styled.div`
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
`;

export const Avatar = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${colors.client};
    margin-right: 8px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    span {
        font-size: 12px;
        color: #fff;
    }
`;

export const ObserverUser = styled.span`
    font-size: 12px;
    color: ${colors.gray6};
`;

export const ObserverDate = styled.span`
    font-size: 11px;
    color: ${colors.gray5};
`;

export const ObserverStatus = styled.div`
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.color ?? "grey"};
    color: ${(props) => props.color ?? "grey"};
    background-color: ${(props) => rgba(props.color ?? "grey", 0.12)};
    border-radius: 3px;
    padding: 8px;
    max-height: 32px;
    max-width: 55%;
`;

export const RiskDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? "grey"};
    margin-left: 4px;
    border-radius: 50%;
`;

export const ObserverHeader = styled.div`
    position: relative;

    &:before {
        content: "";
        width: 3px;
        height: calc(100% + 16px);
        background-color: ${(props) => props.borderColor ?? "grey"};
        position: absolute;
        left: -16px;
        top: -16px;
    }

    ${ObserverLabel} {
        padding-top: 0;

        & > span:first-child {
            color: ${colors.gray4};
            margin-bottom: 8px;
            flex-basis: 80%;
        }

        & > div {
            margin-bottom: 8px;
        }
    }
`;

export const DetailsButton = styled.div`
    color: ${colors.orange2};
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    align-self: flex-end;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContinueButton = styled.button`
    color: inherit;
    display: block;
    margin-right: 6px;
    font-weight: inherit;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
`;

export const StyledForm = styled(Form)`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

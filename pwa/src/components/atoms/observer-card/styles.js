import { rgba } from "polished";
import { FaExclamationCircle } from "react-icons/fa";
import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    border-radius: 3px;
    display: flex;
    padding: 16px;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
`;

export const ObserverId = styled.div`
    cursor: pointer;
    font-weight: 500;
    color: ${colors.gray5};
    font-size: 11px;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    span {
        font-size: 13px;
        font-weight: 500;
        color: ${colors.gray4};
    }
`;

export const ObserverLabel = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray5};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    font-weight: 500;

    flex-wrap: wrap;

    & > * {
        flex: 1 1 auto;
    }

    & > span:first-child {
        font-size: 14px;
        color: ${colors.gray4};
        font-weight: 500;
    }

    p {
        font-weight: 500;
        justify-content: flex-end;

        @media (max-width: 580px) {
            justify-content: flex-start;
        }
    }

    p,
    span {
        &:last-child {
            display: flex;
            font-size: 13px;
            font-weight: 400;
        }
    }

    div {
        span {
            color: ${colors.gray6}
        }

        &:last-child {
            justify-content: flex-end;
        }
    }
`;

export const ObserverInfo = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding-top: 16px;
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
    background-color: ${colors.gray5};
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
    padding: 4px 6px;
    max-height: 24px;
`;

export const RiskDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? "grey"};
    margin-left: 4px;
    border-radius: 50%;
`;

export const ObserverHeader = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;

    &:before {
        content: '';
        width: 3px;
        height: calc(100% + 16px);
        background-color: ${(props) => props.borderColor ?? 'grey'};
        position: absolute;
        left: -16px;
        top: -16px;
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

export const RiskIcon = styled(FaExclamationCircle)`
    color: ${colors.gray5};
    margin-right: 10px;
`;

export const RiskLabel = styled.span`
    font-weight: 500 !important;
    font-size: 13px;
    color: ${colors.gray5} !important;
`;

export const ContainerTextContainAction = styled.div``;

export const TextContainAction = styled.span`
    font-size: 13px;
    font-weight: 400;
`;

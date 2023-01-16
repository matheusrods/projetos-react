import styled from "styled-components";
import { rgba } from "polished";
import colors from "../../../../styles/colors";

export const ActionId = styled.div`
    font-weight: 500;
    color: ${colors.gray5};
    font-size: 11px;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    span {
        font-size: 16px;
        font-weight: 500;
        color: ${colors.gray4};
    }
`;

export const DeadlineWarning = styled.div`
    background-color: ${props => rgba(props.color ?? colors.orange2, 0.1)};
    font-weight: 500;
    color: ${props => props.color ?? colors.orange2};
    font-size: 12px;
    text-align: center;
    border: 1px solid ${props => props.color ?? colors.orange2};
    border-radius: 3px;
    width: 100%;
    padding: 8px;
    margin-top: 9px;
`;

export const Counter = styled.div`
    font-size: 13px;
    color: #fff;
    max-width: 24px;
    height: 22px;
    border-radius: 50%;
    background-color: ${colors.client};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ActionStatus = styled.div`
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

export const ActionLabel = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray6};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & > * {
        flex: 1 1 auto;
    }

    & > span:first-child {
        max-width: 50%;
        font-size: 13px;
        font-weight: 500;
    }

    p,
    span {
        &:last-child {
            display: flex;
            font-size: 13px;
            justify-content: flex-end;
        }
    }

    div:not(${DeadlineWarning}, ${Counter}, ${ActionStatus}) {
        justify-content: flex-end;
    }

    ${ActionStatus}{
        flex: 0 0 auto;
        justify-content: center;
    }
`;

export const ActionInfo = styled.div`
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

export const ActionUser = styled.span`
    font-size: 12px;
    color: ${colors.gray6};
`;

export const ActionDate = styled.span`
    font-size: 11px;
    color: ${colors.gray5};
`;

export const CriticismDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? "grey"};
    margin-left: 4px;
    border-radius: 50%;
`;

export const ActionHeader = styled.div`
    display: flex;
    justify-content: space-between;
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

export const StyledLink = styled.button`
    text-decoration: none;
    color: inherit;
    display: block;
    margin-left: 10px;
    font-weight: inherit;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
`;

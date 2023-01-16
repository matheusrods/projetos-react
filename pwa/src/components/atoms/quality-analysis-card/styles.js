import { FaEllipsisV } from "react-icons/fa";
import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray1};
    display: flex;
    line-height: 18px;
    flex-direction: column;
    padding: 16px;
    margin-bottom: 8px;
`;

export const Title = styled.div`
    font-weight: 500;
    color: ${colors.gray6};
    font-size: 14px;
    max-width: 95%;
`;

export const Label = styled.div`
    border-bottom: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray6};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    flex-direction: ${(props) => props.direction ?? "row"};

    & > span:first-child {
        font-size: 13px;
        font-weight: 500;
    }

    p {
        color: ${colors.gray5};
        font-size: 13px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.grayBorder};
    padding-bottom: 12px;
    align-items: center;
`;

export const OptionsButton = styled(FaEllipsisV)`
    align-self: flex-start;
    cursor: pointer;
`;

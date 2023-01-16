import { rgba } from "polished";
import styled from "styled-components";

export const CardFile = styled.div`
    width: 100%;
    padding: 16px 8px 16px 16px;
    background-color: ${rgba("#5CB3FF", 0.2)};
    border-radius: 3px;
    opacity: ${props => props.isLoading ? 0.5 : 1};
`;

export const HeaderCardFile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TitleFile = styled.a`
    text-decoration: none;
    color: #5cb3ff;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
`;

export const SizeFile = styled.span`
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    color: #5cb3ff;
`;

export const CloseButton = styled.button`
    outline: none;
    border: none;
    background-color: transparent;
    color: #5cb3ff;
    font-size: 14px;
    max-height: 16px;
    cursor: pointer;
`;

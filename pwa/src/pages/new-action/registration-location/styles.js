import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../styles/colors";

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
    display: flex;
    flex-direction: column;
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

export const PageLabel = styled.div`
    padding-bottom: 24px;
    color: ${colors.gray4};
    font-size: 14px;
    display: flex;
    flex-direction: column;

    & > span {
        &:first-child {
            font-size: 10px;
            font-weight: 500;
            color: ${colors.gray5};
            padding-bottom: 6px;
        }
    }
`;

export const ChangeLocationLink = styled.div`
    height: 100%;
    justify-content: center;
    margin-bottom: 10px;
    align-items: flex-end;
    display: flex;
`;

export const StyledLink = styled(Link)`
    font-weight: 500;
    color: ${colors.orange2};
    font-size: 14px;
    text-decoration: none;
`;

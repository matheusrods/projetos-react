import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray1};
    height: 100%;
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        height: calc(100% - 76px);
        margin-top: 76px;
    }
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;
`;

export const Description = styled.p`
    margin-bottom: 24px;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9fa8b3;
`;

export const PageTitle = styled.h2`
    font-size: 18px;
    color: ${colors.gray4};
    margin-bottom: 16px;
`;

export const JustificationCard = styled.div`
    background-color: ${colors.gray1};
    border-radius: 3px;
    padding: 7px 16px;
    margin-bottom: 24px;
`;

export const ActionLabel = styled.div`
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray6};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) => props.direction ?? "row"};

    &:not(:last-child){
        border-bottom: 1px solid ${colors.grayBorder};
    }

    & > span {
        &:first-child {
            min-width: 50%;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
        }

        &:last-child {
            font-size: 12px;
            line-height: 16px;
        }
    }
`;

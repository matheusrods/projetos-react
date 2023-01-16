import styled from "styled-components";
import colors from "../../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.gray1};
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: calc(100% - 76px);
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;
`;

export const RelatedActions = styled.div`
    margin-bottom: 16px;
`;

export const RelatedActionsList = styled.div`
    display: grid;
    gap: 10px;
`;

export const TitleSection = styled.span`
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #2D373C;
`;

export const DescriptionSection = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
    margin-top: 4px;
`;


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

export const ActionLabel = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray6};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) => props.direction ?? 'row'};

    & > * {
        flex: 1 1 auto;
        flex-direction: ${(props) => props.direction ?? 'row'};
    }

    & > span:first-child {
        min-width: 50%;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
    }

    p,
    div,
    span {
        &:last-child {
            display: flex;
            font-size: 12px;
            justify-content: flex-end;
            line-height: 20px;
        }
    }
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const CriticismDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? 'grey'};
    margin-left: 4px;
    border-radius: 50%;
`;

export const User = styled.div`
    display: flex;
    gap: 8px;
    padding: 8px 0px;
    border-top: 1px solid ${colors.grayBorder};
    border-bottom: 1px solid ${colors.grayBorder};
    margin-bottom: 41px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UserName = styled.span`
    font-size: 12px;
    font-weight: normal;
    line-height: 20px;
    color: #5E687D;
`;

export const Date = styled.span`
    font-size: 11px;
    font-weight: normal;
    line-height: 16px;
    color: #9FA8B3;
`;

export const Avatar = styled.div`
    background-color: #9FA8B3;
    color: #FFFFFF;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    line-height: 20px;
`;

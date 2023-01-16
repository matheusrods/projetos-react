import styled from 'styled-components';
import { rgba } from 'polished';
import colors from '../../../styles/colors';

export const Container = styled.div`
    height: 100%;
    background-color: ${colors.gray2};
`;

export const Content = styled.div`
    flex: 1;
    max-height: calc(100% - 70px);
    padding: 20px 16px 16px;
    overflow-y: auto;
    max-width: 768px;
    margin: 0 auto;
`;

export const CardGoal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 8px;
`;

export const ContainerCheckIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.gray1};
    border-radius: 32px;
    height: 64px;
    width: 64px;
    margin-bottom: 16px;

    svg {
        font-size: 26px;
        color: ${colors.client};
    }
`;

export const GoalText = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
    color: ${colors.gray4};
    margin-bottom: 12px;
`;

export const GoalNumber = styled.span`
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: ${colors.gray4};
`;

export const CardGraphical = styled.div`
    background-color: ${colors.white};
    border-radius: 4px;
    padding: 20px 24px;
`;

export const Graphic = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ItemGraphic = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const BarEmpty = styled.div`
    background-color: ${colors.gray2};
    height: 120px;
    width: 20px;
    border-radius: 2px;
    margin-bottom: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

export const BarFilled = styled.div`
    height: ${(props) => props.height ?? 0}%;
    width: 100%;
    background: #97dc52;
    border-radius: ${(props) =>
        props?.height
            ? props.height === 100
                ? '2px'
                : '2px 0px 0px 2px'
            : '2px 0px 0px 2px'};
`;

export const Month = styled.span`
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    text-align: center;
    color: ${colors.gray4};
    text-transform: capitalize;
`;

export const Goal = styled.div`
    position: absolute;
    width: calc(100% - 20px);
    top: ${(props) => (props?.top ? props.top : 80)}%;
    left: 10px;
    right: 10px;
    border-bottom: 2px dashed ${colors.orange2};

    span {
        display: block;
        width: 20px;
        margin-bottom: 4px;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: center;
        color: ${colors.gray4};
        position: absolute;
        top: -8px;
        left: -30px;
    }
`;

export const Results = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        display: block;
        width: 20px;
        margin-bottom: 4px;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: center;
        color: ${colors.gray4};
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Dot = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 4px;
    background-color: ${(props) => props.color ?? 'red'};
    margin-right: 8px;
`;

export const Info = styled.span`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: ${colors.gray4};
`;

export const TitleGraphic = styled.span`
    display: block;
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: ${colors.gray4};
    padding: 0px 0px 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${rgba(colors.gray5, 0.12)};
`;

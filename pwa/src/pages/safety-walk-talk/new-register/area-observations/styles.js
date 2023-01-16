import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.gray2};
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
`;

export const PageInfo = styled.div`
    margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2D373C;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
    text-align: justify;
`;

export const Card = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    padding: ${props => props.padding ?? '16px 12px 24px'};
    margin-bottom: 8px;
    border-radius: 3px;
`;

export const TitleCard = styled.span`
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    color: ${colors.gray4};
    padding: 0px 0px 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${rgba(colors.gray5, 0.12)};
`;

export const RiskRatingBar = styled.div`
    height: ${props => props.height ?? '20px'};
    width: 100%;
    background: #E9EDF2;
    border-radius: 8px;
    display: flex;

    align-items: center;

    ${props => props?.flexGap
        ? css`
            gap: 4px;
            justify-content: flex-start;
        `
        : css`
            justify-content: space-between;
        `
    }
`;

export const RiskRatingBarFilled = styled.div`
    border-radius: ${props => props.borderRadius ?? 'none'};
    background-color: ${props => props.color ?? colors.blueAux};
    width: ${props => props.width ?? '0px'};
    height: 100%;
`;

export const Ratings = styled.div`
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${rgba(colors.gray5, 0.12)};
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Rating = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const Dot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${props => props.color ?? 'red'};
    margin-right: 8px;
`;

export const RatingText = styled.span`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: ${colors.gray4};
`;

export const Category = styled.div`
    ${props => props?.last
        ? css`
            margin-bottom: 14px;
        `
        : css`
            padding-bottom: 14px;
            margin-bottom: 14px;
            border-bottom: 1px solid ${rgba(colors.gray5, 0.12)};
        `
    }
`;

export const CategoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    gap: 16px;
`;

export const CategoryTitle = styled.span`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: ${colors.gray4};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Number = styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    color: ${colors.gray6};
`;

export const CategoryFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;

    span {
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        color: ${colors.gray5};
    }
`;

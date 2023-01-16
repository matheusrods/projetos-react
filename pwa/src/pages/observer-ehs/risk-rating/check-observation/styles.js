import styled from 'styled-components';
import colors from '../../../../styles/colors';

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
    overflow-x: hidden;
`;

export const PageInfo = styled.div``;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    color: ${colors.gray5};
    font-size: 12px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 56px);
    padding-top: 20px;
`;

export const WrapperTitle = styled.h2`
    font-weight: 500;
    font-size: 16px;
    color: ${colors.gray4};
    margin-bottom: 12px;
`;

export const Section = styled.div`
    padding: 12px 0;
    border-top: 1px solid ${colors.grayBorder};
    display: flex;
    flex-wrap: wrap;

    &:last-of-type {
        border-bottom: 1px solid ${colors.grayBorder};
    }
`;

export const SectionSub = styled.div`
    margin-bottom: 13px;

    &:last-of-type {
        margin-bottom: 0px;
    }
`;

export const SectionSubTitle = styled.h4`
    font-weight: 500;
    font-size: 12px;
    color: ${colors.gray6};
    margin-bottom: 5px;
`;

export const Photo = styled.div`
    cursor: pointer;
    position: relative;
    height: 100%;
    width: 100%;

    img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
`;

export const ListPhotos = styled.div`
    display: flex;
    gap: 8px;
    overflow-x: auto;
    width: 100%;
    margin-top: 10px;

    div {
        width: calc((768px - 24px - 36px) / 4);
        height: calc((768px - 24px - 36px) / 4);
        min-width: calc((768px - 24px - 36px) / 4);
        min-height: calc((768px - 24px - 36px) / 4);

        @media (max-width: 768px) {
            width: calc((100vw - 24px - 36px) / 4);
            height: calc((100vw - 24px - 36px) / 4);
            min-width: calc((100vw - 24px - 36px) / 4);
            min-height: calc((100vw - 24px - 36px) / 4);
        }
    }
`;

export const Grid = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;
    margin-bottom: 32px;
`;

export const CardContainer = styled.div`
    padding: 16px;
    border-radius: 3px;
    background-color: ${colors.gray1};
`;

export const CardHeader = styled.div``;

export const CardTitle = styled.h2`
    font-weight: 500;
    font-size: 16px;
    color: ${colors.gray4};
    padding-bottom: 12px;
`;

export const CardContent = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding: 10px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &:last-of-type {
        padding-bottom: 0;
    }
`;

export const Label = styled.div`
    display: flex;
    font-weight: 500;
    font-size: 14px;
    color: ${colors.gray6};
    flex: 1 100%;
    justify-content: space-between;
    padding-bottom: 4px;
`;

export const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 14px;
    color: ${colors.gray6};
    margin-bottom: 5px;
    flex-basis: 90%;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Value = styled.span`
    font-size: 12px;
    color: ${colors.gray6};
    display: flex;
    align-items: center;
    line-height: 16px;
`;

export const RatingDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? 'grey'};
    border-radius: 50%;
    margin-right: 4px;
`;

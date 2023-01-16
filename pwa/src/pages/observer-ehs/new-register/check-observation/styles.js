import { FaPen } from "react-icons/fa";
import styled from "styled-components";
import colors from "../../../../styles/colors";

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
    gap: ${props => props.gap ? '20px' : 0};

    &:last-of-type {
        border-bottom: 1px solid ${colors.grayBorder};
    }
`;

export const SectionWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1 100%;
`;

export const SectionIcon = styled(FaPen)`
    font-size: 14px;
    color: ${colors.gray5};
    margin-left: auto;
    margin-right: 3px;
    cursor: pointer;
`;

export const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 14px;
    color: ${colors.gray6};
    margin-bottom: 5px;
    flex-basis: 90%;
`;

export const SectionSub = styled.div`
    width: 100%;
    margin-bottom: 13px;
`;

export const SectionSubTitle = styled.h4`
    font-weight: 500;
    font-size: 12px;
    color: ${colors.gray6};
    margin-bottom: 5px;
`;

export const SectionText = styled.p`
    font-weight: 400;
    font-size: 12px;
    color: ${colors.gray6};
    line-height: 16px;
    flex-basis: 90%;
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

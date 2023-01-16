import { FaPen } from 'react-icons/fa';
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
    flex-direction: column;
    flex-wrap: wrap;
    gap: ${(props) => (props.gap ? '20px' : 0)};

    &:last-of-type {
        border-bottom: 1px solid ${colors.grayBorder};
    }
`;

export const SectionWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
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
    margin-bottom: 13px;

    &:last-of-type {
        margin-bottom: 0;
    }
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

export const Photo = styled.div`
    position: relative;
    width: 66px;
    min-width: 66px;

    img {
        width: 66px;
        height: 66px;
        border-radius: 4px;
    }
`;

export const ListPhotos = styled.div`
    display: flex;
    grid-gap: 8px;
`;

export const ContainerPhotos = styled.div`
    margin-top: 10px;
    overflow-x: auto;
`;

import styled from "styled-components";
import { rgba } from "polished";
import colors from "../../../styles/colors";
import { FaPen } from "react-icons/fa";

export const Container = styled.div`
    background-color: ${(props) => props.backgroundColor ?? "#fff"};
    border-radius: 3px;
    display: flex;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
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
    border-top: ${(props) =>
        props?.noBorder ? "none" : `1px solid ${colors.grayBorder}`};
    padding-top: 9px;
    padding-bottom: 9px;
    color: ${colors.gray6};
    font-size: 12px;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) => props.direction ?? "row"};
    align-items: ${(props) =>
        props.direction !== "column" ? "center" : "initial"};

    & > * {
        flex: 1 1 auto;
        flex-direction: ${(props) => props.direction ?? "row"};
    }

    & > span:first-child {
        min-width: 50%;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
    }

    > p,
    > div,
    > span {
        &:last-child {
            display: flex;
            font-size: 12px;
            justify-content: flex-end;
            line-height: 20px;
        }
    }
`;

export const ActionStatus = styled.div`
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.color ?? "grey"};
    color: ${(props) => props.color ?? "grey"};
    background-color: ${(props) => rgba(props.color ?? "grey", 0.12)};
    border-radius: 3px;
    padding: 4px 6px;
    max-height: 24px;
`;

export const CriticismDot = styled.div`
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color ?? "grey"};
    margin-left: 4px;
    border-radius: 50%;
`;

export const ActionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 46px;

    svg {
        cursor: pointer;
    }
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const DeadLineLabel = styled.div`
    max-height: 20px;
    font-size: 11px;
    color: ${(props) => props.color ?? "grey"};
    background-color: ${(props) => rgba(props.color ?? "grey", 0.12)};
    border-radius: 13px;
    margin-left: 6px;
    padding: 2px 6px;
    align-items: center;
`;

export const RelatedRecordsContainer = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding: 9px 0px;
`;

export const RelatedRecordsLabel = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${colors.gray6};
    margin-bottom: 11px;
    display: block;
`;

export const RelatedRecordsList = styled.div`
    display: grid;
    gap: 4px;
`;

export const RelatedRecord = styled.div`
    background-color: ${rgba("#9D7CE4", 0.2)};
    color: #9d7ce4;
    padding: 16px;
    width: 100%;
    cursor: pointer;
    border-radius: 3px;
`;

export const RelatedRecordTitle = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-bottom: 4px;
    display: block;
`;

export const RelatedRecordSubTitle = styled.span`
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    display: block;
`;

export const SectionTitle = styled.span`
    border-top: 1px solid ${colors.grayBorder};
    padding-top: 32px;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    color: #2d373c;
    display: block;
`;

export const SectionDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9fa8b3;
    padding-bottom: 7px;
`;

export const AttachedPhotos = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    border-bottom: 1px solid ${colors.grayBorder};
    padding: 9px 0px;
`;

export const SectionLabel = styled.span`
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #5e687d;
    display: block;
    margin-bottom: 10px;
`;

export const AttachedPhotosList = styled.div`
    display: flex;
    gap: 8px;
    overflow-x: auto;

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

export const AttachedDocuments = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding: 9px 0px;
`;

export const AttachedDocumentsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Button = styled.button`
    background-color: transparent;
    border: none;
    color: ${colors.blueAux};
    font-size: 12px;
    outline: none;
`;

export const EditIcon = styled(FaPen)`
    font-size: 14px;
    color: ${colors.gray5};
    margin-left: 10px;
    cursor: pointer;
    align-self: center;
`;

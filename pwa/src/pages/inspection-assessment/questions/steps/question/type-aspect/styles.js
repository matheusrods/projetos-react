import styled from "styled-components";
import colors from "../../../../../../styles/colors";

export const Container = styled.div`
`;

export const Title  = styled.h2`
    color: ${props => props.type === "0" ? colors.icons : colors.redNC};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;
`;
export const SubTitle = styled.p`
    color: ${colors.gray3};
    font-size: 14px;
    margin-bottom: 15px;
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.grayBorder};
    margin-bottom: 15px;
`;

export const QuestionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 15px;
`;
export const Question = styled.p`
    color: ${colors.gray4};
    font-size: 14px;
    font-weight: 500;
`;
export const IconImage = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
`;

export const InfoTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid ${colors.grayBorder};
    width: 100%;
    padding-bottom: 10px;
`;

export const InfoTitle = styled.h3`
    color: ${colors.gray4};
    font-size: 14px;
    font-weight: 500;
`;

export const InfoBodyWrapper = styled.div`
    width: 100%;
    padding-top: 20px;
`;

export const Label = styled.div`
    color: ${colors.text};
    font-size: 14px;
    margin-bottom: 10px;
`;

export const WrapperTextArea = styled.div`
    margin-top: 30px;
    flex-direction: column;
`;

export const LabelTextArea = styled.div`
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;


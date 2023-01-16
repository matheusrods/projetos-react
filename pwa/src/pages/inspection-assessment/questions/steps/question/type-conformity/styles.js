import styled from "styled-components";
import colors from "../../../../../../styles/colors";

export const Container = styled.div``;

export const Title = styled.h2`
    color: ${colors.gray4};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;
`;

export const QuestionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Question = styled.p`
    color: ${colors.gray4};
    font-size: 14px;
    font-weight: 500;
`;


export const ButtonConform = styled.div`
    background: ${(props) => props.conform && !props.doesNotApply ? colors.greenLightButton : colors.gray2};
    max-width: 180px;
    height: 40px;
    text-align: center;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;
`;

export const ButtonNoConform = styled.div`
    border-radius: 3px;
    background: ${(props) => props.conform || props.doesNotApply ? colors.gray2 : colors.greenLightButton};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12);
    max-width: 180px;
    height: 40px;
    text-align: center;
    padding: 10px 20px;
    flex-wrap: wrap;
    cursor: pointer;
`;

export const ButtonsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    flex-grow: 1;
`;

export const Button = styled.div`
    background: ${(props) => props.selected ? colors.greenLightButton : colors.gray2};
    flex: 1 1 auto;
    margin: 0 10px;
    text-align: center;
    border-radius: 4px;
    padding: 15px 20px;
    cursor: pointer;
`;

export const CheckButtonContainer = styled.div`
    margin-top: 20px;
`;

export const CheckButton = styled.input`
    width: 16px;
    height: 16px;
`;

export const DevianceContainer = styled.div`
    margin-top: 30px;
    flex-direction: column;
`;

export const DevianceLabel = styled.div`
    font-size: 12px;
    font-weight: 500;
`;

export const EvidencesContainer = styled.div`
    margin-top: 30px;
    flex-direction: column;
`;

export const EvidencesLabel = styled.div`
    font-size: 12px;
    font-weight: 500;
`;

export const IconImage = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
    align-self: flex-end;
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



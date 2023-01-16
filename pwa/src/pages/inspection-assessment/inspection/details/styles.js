import styled from "styled-components";
import colors from "../../../../styles/colors";

export const Container = styled.div`
    padding-bottom: 50px;
`;

export const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.gray4};
`;
export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.grayBorder};
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;
export const TitleLabel = styled.h3`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.gray6};
    margin-bottom: 10px;
`;
export const Label = styled.p`
    font-size: 12px;
    color: ${colors.gray6};
`;

export const WrapperCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


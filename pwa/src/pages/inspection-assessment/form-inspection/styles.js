import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Body = styled.div`
    flex: 1;
    padding: 20px 16px 16px;
    overflow-y: auto;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;
export const Title = styled.h2`
    font-size: 16px;
    color: ${colors.gray4};
    margin-bottom: 5px;
`;
export const Paragraph = styled.p`
    font-size: 14px;
    color: ${colors.subText};
`;

export const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

export const InfoTitle = styled.h3`
    font-size: 13px;
    color: ${colors.text};
    margin-bottom: 10px;
    font-weight: 500;
`;
export const InfoParagraph = styled.p`
    font-size: 13px;
    color: ${colors.text};
`;

export const WrapperInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;
export const Line = styled.div`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid ${colors.gray2};
    margin-bottom: 10px;
`;

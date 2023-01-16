import styled from "styled-components";
import colors from '../../../../../styles/colors';

export const Container = styled.div`
`;

export const Paragraph = styled.p`
    font-size: 14px;
    color: ${colors.subText};
`;

export const Wrapper = styled.div`
    margin: 25px 0;
`;

export const QrCodeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 25px;
    color: ${colors.text};
    margin-bottom: 30px;

    img{
        width: 50px;
        margin-bottom: 20px;
    }
    div{
        cursor: pointer;
        text-align: center;
    }

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

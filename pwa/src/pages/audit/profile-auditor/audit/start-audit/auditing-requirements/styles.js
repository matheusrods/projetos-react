import styled from 'styled-components';
import colors from '../../../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 16px 90px;
    overflow-y: auto;
    gap: 4px;
`;

export const ScrollContainer = styled.div`
    border-bottom: 1px solid #bdbdbd;
`;

export const Title = styled.h1`
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #4f4f4f;
    margin-bottom: 16px;
`;

export const SubTitle = styled.h2`
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #4f4f4f;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SubTitleTextArea = styled.h2`
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #4f4f4f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & svg{
        cursor: pointer;
    }
`;

export const Info = styled.div`
    width: 20px;
    height: 20px;
    min-height: 20px;
    min-width: 20px;
    font-size: 10px;
    margin-left: 10px;
    background-color: #5cb3ff;
    color: #fff;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ContainerQuestion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
`;

export const ContainerQuestionClassification = styled.div`
    margin-bottom: 36px;
`;

export const CheckboxLabel = styled.label`
    margin: ${(props) => props.margin ?? null};
    cursor: pointer;
`;

export const CardBodyText = styled.p`
    display: ${(props) => props.display ?? null};
    margin: ${(props) => props.margin ?? null};
    font-weight: ${(props) => (props.checked ? 500 : 400)};
    font-size: 0.875rem;
    line-height: 16px;
    color: ${colors.text};
`;

export const ContainerTextArea = styled.div`
    margin-bottom: 20px;
`;

export const ContainerButtonsNC = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
`;

export const InfoNC = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    line-height: 0px;
    color: #4f4f4f;
    svg {
        margin-right: 5px;
        position: relative;
        bottom: 2px;
    }
`;

export const ButtonAddNC = styled.button`
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 0.875rem;
    color: #faa50a;
    text-decoration: underline;
    svg {
        margin-right: 5px;
    }
    cursor: pointer;
`;

export const ContainerPhotos = styled.div`
    margin-top: 10px;
    overflow-x: auto;
    width: 100%;
`;

export const ListPhotos = styled.div`
    display: flex;
    grid-gap: 8px;
    width: max-content;
    padding-bottom: 10px;
    cursor: pointer;
    & div {
        height: 66px;
        width: 66px;
        & img {
            object-fit: cover;
        }
    }
`;

export const Section = styled.div`
    padding: 12px 0;
    display: flex;
    flex-wrap: wrap;
`;

export const ContainerModal = styled.div`
    width: 100%;
`;

export const TitleModal = styled.h3`
    padding: 0px 16px 16px;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid ${colors.grayBorder};
    color: ${colors.gray4};
`;

export const DescriptionModal = styled.p`
    padding: 16px 16px 0px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray5};
`;

export const ContainerSend = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TextSend = styled.span`
    margin-top: 24px;
    font-size: 20px;
    line-height: 24px;
    color: ${colors.gray10};
    text-align: center;
`;

export const ContainerButtonAddPhoto = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-end;
`;

export const ButtonAddPhoto = styled.button`
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 0.875rem;
    color: #faa50a;
    text-decoration: underline;

    svg {
        margin-right: 5px;
    }

    cursor: pointer;
`;

import { FaSpinner } from "react-icons/fa";
import styled, { css, keyframes } from "styled-components";
import colors from "../../styles/colors";

const spin = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
`;

export const Container = styled.div`
    background-color: ${colors.gray1};
    height: 100%;
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        height: calc(100% - 76px);
        margin-top: 76px;
    }
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;
`;

export const SectionTitle = styled.span`
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    color: #2d373c;
    display: block;
    ${(props) =>
        props?.hasBorderBottom
            ? css`
                  padding-bottom: 12px;
                  border-bottom: 1px solid #e4e8ed;
                  margin-bottom: 8px;
              `
            : css`
                  margin-bottom: 20px;
              `}
`;

export const SectionDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9fa8b3;
    margin-bottom: 16px;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 100%;
    background: #ffffff;
    border: 2px solid #faa50a;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #faa50a;
    cursor: pointer;
    position: relative;
    margin-bottom: 20px;
    opacity: ${(props) => (props.disabled ? "0.5" : 1)};

    svg {
        position: absolute;
        left: 16px;
        font-size: 16px;
    }
`;

export const InputFile = styled.input`
    opacity: 0;
    display: none;
    z-index: -1;
`;

export const InputField = styled.div`
    margin-bottom: 20px;
`;

export const ListFiles = styled.div`
    display: grid;
    gap: 8px;
    margin-bottom: 16px;
`;

export const ContainerPhotos = styled.div``;

export const LabelListPhotos = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9fa8b3;
    margin-bottom: 8px;
    display: block;
`;

export const ListPhotos = styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: calc((768px - 24px - 32px) / 4);

    @media (max-width: 768px) {
        grid-auto-rows: calc((100vw - 24px - 32px) / 4);
    }
`;

export const AddPhotoButton = styled.label`
    width: 100%;
    height: 100%;
    background-color: #e4e8ed;
    border-radius: 4px;
    font-size: 24px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
`;

export const LoadingIcon = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

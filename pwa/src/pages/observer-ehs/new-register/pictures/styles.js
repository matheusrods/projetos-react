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
`;

export const PageInfo = styled.div``;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    border-bottom: 1px solid ${colors.grayBorder};
    padding-bottom: 12px;
    margin-bottom: 8px;
`;

export const Wrapper = styled.div`
    > div > svg {
        margin-bottom: 27px;
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(100% - 56px);
    flex-direction: column;
`;

export const WrapperContainer = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const WrapperDescription = styled.p`
    font-size: 16px;
    color: ${colors.gray5};
    line-height: 19px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`;

export const PageDescription = styled.p`
    color: ${colors.gray5};
    font-size: 12px;
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
    margin-top: auto;

    > svg {
        position: absolute;
        left: 16px;
        font-size: 16px;
        margin-bottom: 0;
    }
`;

export const InputFile = styled.input`
    opacity: 0;
    display: none;
    z-index: -1;
`;

export const ListPhotos = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    div, label {
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

export const ContainerPhotos = styled.div`
    margin-top: 24px;
    width: 100%;
    padding-bottom: 20px;
`;

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

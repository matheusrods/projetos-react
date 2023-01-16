import styled from 'styled-components';
import colors from '../../../../../../../styles/colors';

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
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 16px 60px;
    overflow-y: auto;
    gap: 4px;
`;

export const Title = styled.h1`
    font-weight: 400;
    font-size: 1rem;
    color: ${colors.gray4};
    padding-bottom: 8px;
    border-bottom: 1px solid #e4e8ed;
    margin-bottom: 8px;
`;

export const ContainerTextArea = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContainerCanvas = styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    background: #ffffff;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    position: relative;
`;
export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
`;

export const ClearButton = styled.span`
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: #4f4f4f;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ccd4db;
    cursor: pointer;
    & svg {
        margin-left: 5px;
    }
`;

export const UndoButton = styled.span`
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: #4f4f4f;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ccd4db;
    cursor: pointer;
    & svg {
        margin-right: 5px;
    }
`;

export const Description = styled.span`
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: #4f4f4f;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    & svg {
        margin-right: 5px;
    }
`;

export const TextArea = styled.textarea`
    margin-bottom: 15px;
    padding: 12px;
    height: 40vh;
    background: #ffffff;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    outline: none;
    width: 100%;
    resize: none;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4f4f4f;

    &::placeholder {
        color: #ccd4db;
    }
`;

// MODAL SAVE

export const ContainerSaveModal = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 8px 0px;
`;

export const TextSaveModal = styled.span`
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #4f4f4f;
`;

export const InputTitle = styled.input`
    margin-top: 24px;
    margin-bottom: 30px;
    font-size: 0.75rem;
    line-height: 1.25rem;
    padding-left: 5px;
    color: #828282;
    border: none;
    border-bottom: 0.5px solid #828282a1;
    outline: none;
`;

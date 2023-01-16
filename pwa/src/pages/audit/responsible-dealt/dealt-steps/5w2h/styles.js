import styled from 'styled-components';

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: #e9edf2;
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;
    padding-bottom: 76px;
`;

export const ContainerContent = styled.div`
    padding: 20px 16px;
    flex: 1;
    overflow-y: auto;
`;

export const ContainerTitles = styled.div`
    margin-bottom: 24px;
`;

export const H2 = styled.h2`
    font-size: 0.875rem;
    line-height: 1rem;
    color: #828282;
    margin-bottom: 8px;
`;

export const H1 = styled.h1`
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const ContainerMethodology5w = styled.div`
    background-color: #ffffff;
    border-radius: 3px;
    padding: 16px;
    margin-bottom: 16px;
    margin-top: 10px;
    & h3 {
        color: #9b51e0;
    }
    & svg {
        color: #9b51e0;
    }
`;

export const ContainerMethodology2h = styled.div`
    background-color: #ffffff;
    border-radius: 3px;
    padding: 16px;
    margin-bottom: 24px;
    & h3 {
        color: #f2994a;
    }
    & svg {
        color: #f2994a;
    }
`;

export const Title = styled.h3`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid;
`;

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    width: 100%;
`;

export const ContainerQuestion = styled.div`
    display: flex;
    margin-bottom: 10px;
    align-items: center;
`;

export const Icon = styled.div`
    margin-right: 5px;
    display: flex;
    align-items: center;
    font-size: 1rem;
`;

export const QuestionLabel = styled.span`
    font-size: 12px;
    line-height: 16px;
    color: #4f4f4f;
`;

export const ContainerAnswer = styled.div`
    width: 100%;
`;

export const ContainerMore = styled.div`
    width: 100%;
    margin-top: 24px;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: rgba(250, 165, 10, 1);
    cursor:pointer;
`;

export const QuestionAnswer = styled.input`
    border: none;
    border-bottom: 0.5px solid #bdbdbd;
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    color: #828282;
    padding: 2px;
    &:focus {
        outline: none;
        border: none;
        border-bottom: 0.5px solid #bdbdbd;
    }
`;

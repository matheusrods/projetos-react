import styled from 'styled-components';

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: #e9edf2;
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 76px;
    overflow-y: auto;
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

export const ContainerMethodology5pqs = styled.div`
    background-color: #ffffff;
    border-radius: 3px;
    padding: 16px;
    margin-bottom: 30px;
    margin-top: 10px;
    & h3 {
        color: #9b51e0;
    }
    & svg {
        color: #9b51e0;
    }
`;

export const ContainerQuestion = styled.div`
    display: flex;
    margin-top: 24px;
    flex-direction: column;
`;

export const Icon = styled.div`
    margin-right: 5px;
    display: flex;
    align-items: center;
    font-size: 1rem;
`;

export const ContainerAnswer = styled.div`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ContainerMore = styled.div`
    cursor: pointer;
    width: 100%;
    margin-top: 24px;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: rgba(250, 165, 10, 1);
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

export const Cause = styled.span`
    font-size: 0.875rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const Number = styled.span`
    font-size: 1.125rem;
    line-height: 1rem;
    color: #9b51e0;
    font-weight: 700;
    margin-right: 10px;
`;

export const QuestionTitle = styled.span`
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const ContainerTitle = styled.div`
    display: flex;
    margin-bottom: 5px;
`;

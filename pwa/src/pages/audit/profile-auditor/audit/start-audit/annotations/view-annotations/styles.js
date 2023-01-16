import styled, { css } from 'styled-components';
import colors from '../../../../../../../styles/colors';

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

export const Title = styled.h1`
    font-weight: 400;
    font-size: 1rem;
    color: ${colors.gray4};
    padding-bottom: 8px;
    border-bottom: 1px solid #e4e8ed;
    margin: 8px 0px;
`;

export const Description = styled.span`
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: #9fa8b3;
    margin-bottom: 24px;
`;

export const SubTitle = styled.h2`
    font-weight: 500;
    font-size: 0.625rem;
    line-height: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9fa8b2;
    border-bottom: 1px solid #e4e8ed;
    padding-bottom: 8px;
`;

export const ContainerAnnotations = styled.div`
    display: flex;
    flex-direction: column;
    ${({ fullHeight }) => fullHeight && css`
        flex: 1;
    `};
`;

export const ContainerBorderText = styled.div`
    background: #ffffff;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4f4f4f;
    margin-bottom: 10px;
    display: flex;
`;

export const ContainerBorderCanvas = styled.div`
    background: #ffffff;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4f4f4f;
    margin-bottom: 10px;
    /* height: 50vh; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

// MODAL SAVE

// export const ContainerSaveModal = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 16px 8px 0px;
// `;

// export const TextSaveModal = styled.span`
//     font-size: 0.875rem;
//     line-height: 1.25rem;
//     color: #4f4f4f;
// `;

// NOT FOUND ANNOTATIONS

export const ContainerNotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
    margin-top: 50px;
`;
export const ContainerIconNotFound = styled.div`
    color: #9fa8b34d;
    font-size: 60px;
`;

export const TextNotFound = styled.span`
    font-size: 1rem;
    line-height: 1.1875rem;
    text-align: center;
    color: #828282;
`;

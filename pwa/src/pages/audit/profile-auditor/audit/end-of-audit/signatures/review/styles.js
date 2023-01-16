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
    position: relative;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const ContainerSuccess = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 16px 40px;
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

export const ContainerSignature = styled.div`
    width: 100%;
    max-width: 100%;
    border-bottom: 1px solid #e4e8ed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Image = styled.img`
    max-width: 80%;
    margin-bottom: 10px;
`;

export const Name = styled.span`
    margin-bottom: 16px;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const Date = styled.span`
    font-size: 0.75rem;
    line-height: 1rem;
    margin-top: 16px;
    color: #4f4f4f;
`;

export const ContainerNotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
`;
export const ContainerIconNotFound = styled.div`
    color: #9fa8b34D;
    font-size: 60px;
`;

export const TextNotFound = styled.span`
    font-size: 1rem;
    line-height: 1.1875rem;
    text-align: center;
    color: #828282;
`;


// MODAL SIGNATURES
export const ContainerSignaturesModal = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 8px 0px;
`;

export const TextSignaturesModal = styled.span`
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #4f4f4f;
`;

export const InputSignatures = styled.input`
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

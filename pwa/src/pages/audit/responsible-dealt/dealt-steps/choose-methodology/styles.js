import styled from 'styled-components';
import colors from '../../../../../styles/colors';

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;
    padding-bottom: 76px;
`;

export const Content = styled.div`
    padding-bottom: 190px;
    display: flex;
    flex-direction: column;
    padding: 20px 16px;
    flex: 1;
    overflow-y: auto;
`;

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #4f4f4f;
    text-transform: uppercase;
    margin-bottom: 8px;
`;

export const Select = styled.select`
    background: #ffffff;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    padding: 14px 12px;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #bdbdbd;
`;

export const Option = styled.option`
    color: #333333;
    background: #ffffff;
`;

export const ContainerDivisor = styled.div`
    margin: 24px 0;
    display: flex;
    justify-content: center;
`;

export const Span = styled.span`
    font-size: 0.875rem;
    line-height: 1rem;
    color: #333333;
`;

export const ContainerUpload = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const LabelFile = styled.label`
    font-size: 0.875rem;
    line-height: 16px;
    color: #4f4f4f;
`;

export const InputFile = styled.input``;

export const ButtonFile = styled.button`
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background-color: #bdbdbd;
    color: #ffffff;
    border: none;
    margin-bottom: 16px;
    box-shadow: 0px 8px 8px 0px #9797971f;
`;

export const ContainerUploaded = styled.div`
    margin-top: 24px;
`;

export const ModalContainer = styled.div`
    padding: 32px 16px 0;
`;

export const ModalHeader = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: ${colors.gray4};
`;

export const ModalContent = styled.div`
    margin-top: 18px;
    margin-bottom: 36px;
`;

export const ModalText = styled.p`
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray5};
    margin-bottom: 10px;
`;

export const ModalFooter = styled.div`
    padding: 20px 94px;
    background-color: ${colors.gray1};
`;

export const ModalButton = styled.button`
    background-color: ${colors.orange2};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border-radius: 3px;
    border: none;
    height: 44px;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
`;

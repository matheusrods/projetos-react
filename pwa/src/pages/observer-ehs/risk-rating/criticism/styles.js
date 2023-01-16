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
`;

export const PageInfo = styled.div`
    margin-bottom: 31px;
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2D373C;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
    text-align: justify;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const InputHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
`;

export const InputLabel = styled.span`
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 1px;
    color: ${colors.client};
    text-transform: uppercase;
`;

export const KnowMore = styled.button`
    background: none;
    border: none;
    color: ${colors.blueAux};
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 5%;
    text-decoration: underline;
    outline: none;
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

export const ModalTextContainer = styled.div`
    margin-bottom: 10px;
`;

export const ModalText = styled.p`
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray5};
    margin-bottom: 10px;
`;

export const Strong = styled.span`
    font-weight: 500;
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

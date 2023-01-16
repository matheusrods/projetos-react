import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;

`;

export const Content = styled.div`
    width: 100%;
    max-width: 768px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background: ${colors.shape};
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 20px;
    overflow-y: auto;
    width: 100%;
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
    width: 100%;
`;
export const PageDescription = styled.p`
    color: ${colors.gray5};
    font-size: 12px;
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

export const ContainerNameInput = styled.div`
    display: flex;
    flex-direction: column;
`;
export const ContainerCanvas = styled.div`
    display: flex;
    flex-direction: column;
    height: 30vh;
    background: #ffffff;
    border: 1px solid #ccd4db;
    border-radius: 3px;
    position: relative;
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
export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
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
export const AlignRight = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

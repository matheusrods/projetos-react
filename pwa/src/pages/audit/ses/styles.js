import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 20px 16px;
    padding-top: 96px;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    overflow-y: auto;
`;

export const ModalTitle = styled.h1`
    font-size: 1rem;
    font-weight: 400;
    line-height: 2rem;
    color: #4F4F4F;
    margin-bottom: 24px;
`;

export const Title = styled.h2`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 2rem;
    margin-bottom: 2px;
    color: #4F4F4F;
`;

export const ContainerModalIntern = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

import styled, { css } from "styled-components";
import colors from "../../../../../styles/colors";

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 0px auto 0px;
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
/* padding-bottom: 160px; */
overflow-y: auto;
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px 16px 96px;
    overflow-y: auto;
`;

export const ActionContainer = styled.div`
    ${(props) =>
        props.noActions &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        `}
    min-height: calc(100% - 71px - 48px - 20px);
`;

export const IconContainer = styled.div`
    height: 64px;
    width: 64px;
    background-color: ${colors.gray5};
    color: #fff;
    margin-bottom: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
`;

export const ActionContainerDescription = styled.p`
    color: ${colors.gray5};
    text-align: center;
    margin-bottom: 30px;
    margin-left: 30px;
    margin-right: 30px;
`;

export const PageInfo = styled.div`
    margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2d373c;
    margin-bottom: 4px;
`;

export const PageDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9fa8b3;
    text-align: justify;
`;

export const LinkButton = styled.button`
    height: 48px;
    width: 48px;
    background-color: ${colors.gray5};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 56px;
    right: 72px;
    outline: none;
    border: none;
`;

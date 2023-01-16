import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";

export const Container = styled.div`
    height: 100%;
    display: flex;
    background-color: #ee5252;
    flex-direction: column;
    justify-content: space-between;
    max-width: 768px;
    margin: 0 auto;
`;

export const LogoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;

    padding: 48px 0px;

    span {
        &:nth-child(1) {
            font-size: 48px;
            font-weight: 300;
            line-height: 58px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        &:nth-child(2) {
            font-size: 26px;
            font-weight: 400;
            line-height: 40px;
            text-transform: uppercase;
            letter-spacing: 0.18em;
        }
    }
`;

export const AuthContainer = styled.div`
    flex: 2;
    padding: 32px 16px;
    background-color: #ffffff;
    border-radius: 14px 14px 0px 0px;
`;

export const PageTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 26px;
    font-weight: 400;
    line-height: 32px;
    color: #2d373c;
`;

export const ForgoMyPasswordLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #5cb3ff;
`;

export const SplashScreen = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.gray5};
    width: 100%;
    height: 100%;
    background-color: #fff;
    flex-direction: column;
    transition: 0.5s opacity ease-in;
    opacity: ${props => props.visible ? '1' : '0'};
    display: ${props => props.display ? 'flex' : 'none'};

    div {
        display: flex;
        flex-direction: column;
        margin-top: auto;
        align-items: center;

        & > span {
            &:nth-child(1) {
                font-size: 56px;
                font-weight: 300;
                line-height: 48px;
                letter-spacing: 0.15em;
                text-transform: uppercase;
            }

            &:nth-child(2) {
                font-size: 24px;
                font-weight: 400;
                line-height: 48px;
                text-transform: uppercase;
                letter-spacing: 0.18em;
            }
        }
    }
`;

export const PoweredBy = styled.div`
    font-weight: 300;
    font-size: 10px;
    color: ${colors.gray9};
    margin-top: auto;
    margin-bottom: 24px;
    align-items: center;

    img {
        margin-top: 9px;
        width: 95px;
        height: 55px;
    }
`;

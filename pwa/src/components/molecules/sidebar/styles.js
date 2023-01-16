import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
    padding-left: 16px;
    padding-right: 16px;
    position: absolute;
    top: 0;
    left: ${(props) => (props?.open ? '0px' : '-256px')};
    transition: 0.5s left ease-in;
    width: 256px;
    height: 100vh;
    z-index: 100;
    background-color: #fff;
`;

export const Header = styled.div`
    padding-top: 36px;
    padding-bottom: 30px;

    svg {
        cursor: pointer;
    }
`;

export const UserSection = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    & > div {
        margin-right: 16px;
    }

    & > span {
        font-weight: 500;
        color: ${colors.gray4};
        font-size: 16px;
    }
`;

export const MenuItem = styled.div`
    padding-bottom: 16px;
    padding-top: 16px;
    border-bottom: 1px solid ${colors.grayBorder};
    color: ${colors.gray6};
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        color: ${colors.gray5};
        margin-right: 14px;
    }
`;

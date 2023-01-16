import styled, { css } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaBell } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import colors from '../../../styles/colors';

export const Container = styled.div`
    background-color: #fff;
    height: 76px;
    width: 100%;
    padding: 16px;
    z-index: 110;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;

    ${(props) =>
        props?.hiddenMobile &&
        css`
            @media (max-width: 768px) {
                display: none;
            }
        `}
`;

export const Content = styled.div`
    max-width: 768px;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const RightContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 25%;
`;

export const MenuIcon = styled(GiHamburgerMenu)`
    color: ${colors.gray4_2};
    cursor: pointer;
`;

export const Avatar = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${colors.gray5};
    margin-left: auto;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    span {
        font-size: 12px;
        color: #fff;
    }
`;

export const LeftHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
`;

export const Logo = styled(LazyLoadImage)`
    max-width: 130px;
    max-height: 32px;
    object-fit: contain;
`;

export const NotificationsIcon = styled(FaBell)`
    color: ${colors.client};
    font-size: 20px;
`;

export const NotificationsBadge = styled.div`
    position: relative;
    width: 12px;
    height: 12px;
    right: 14px;
    bottom: 6px;
    background: ${colors.redAux};
    border-radius: 12px;
`;

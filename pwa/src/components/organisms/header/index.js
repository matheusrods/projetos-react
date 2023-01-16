import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';

import {
    MenuIcon,
    Container,
    Content,
    LeftHeader,
    Logo,
    RightContent,
    NotificationsIcon,
    NotificationsBadge
} from './styles';
import { Avatar } from '../../atoms';
import { Sidebar } from '../../molecules';

const Header = ({
    UserStore: {
        user,
        userCompany: { logo }
    },
    hiddenMobile,
    notificationsAction = () => null,
    notificationsBadge = false
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { pathname } = useLocation();

    return (
        <Container hiddenMobile={hiddenMobile}>
            <Content>
                <LeftHeader>
                    <MenuIcon
                        size={25}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    />
                    {logo && <Logo src={logo} alt={'logo'} />}
                </LeftHeader>

                <RightContent>
                    {pathname.split('/')[1] === 'training' && (
                        <>
                            <NotificationsIcon onClick={notificationsAction} />

                            {notificationsBadge && <NotificationsBadge />}
                        </>
                    )}

                    <Avatar user={user} />
                </RightContent>
            </Content>
            <Sidebar
                user={user}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </Container>
    );
};

export default inject('UserStore')(observer(Header));

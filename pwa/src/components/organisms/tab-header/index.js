import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Sidebar } from '../../molecules';
import { Avatar } from '../../atoms';

import {
    MenuIcon,
    Container,
    Content,
    LeftHeader,
    TabContainer,
    TabOption,
    TabDescription,
    RightHeader,
    Logo
} from './styles';

const TabHeader = ({
    UserStore: { user, userCompany: { logo } },
    hiddenMobile,
    tabs,
    handleSelectTab
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Container hiddenMobile={hiddenMobile}>
            <Content>
                <LeftHeader>
                    <MenuIcon
                        size={25}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    />
                    {logo &&
                        <Logo
                            src={logo}
                            alt={'logo'}
                        />
                    }
                </LeftHeader>
                <RightHeader>
                    <Avatar user={user} width={32} height={32} />
                </RightHeader>
            </Content>
            <Sidebar
                user={user}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <TabContainer>
                {tabs.map((tab, index) => (
                    <TabOption
                        key={index}
                        selected={tab.selected}
                        onClick={() => {
                            if (typeof handleSelectTab !== 'function') {
                                return;
                            }

                            handleSelectTab(index);
                        }}
                    >
                        <TabDescription>{tab.name}</TabDescription>
                    </TabOption>
                ))}
            </TabContainer>
        </Container>
    );
};

export default inject('UserStore')(observer(TabHeader));

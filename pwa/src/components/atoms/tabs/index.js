import React from 'react';
import { Container, StyledTab, StyledTabList, TabHeader } from './styles';
import { Tabs as TabContainer, TabPanel } from 'react-tabs';

function Tabs({ tabs = [], defaultIndex = 0 }) {
    return (
        <Container>
            <TabContainer defaultIndex={defaultIndex}>
                <TabHeader>
                    <StyledTabList>
                        {tabs.map((tab, index) => (
                            <StyledTab key={index}>
                                {tab.icon !== undefined && tab.icon}
                                {tab.label}
                            </StyledTab>
                        ))}
                    </StyledTabList>
                </TabHeader>
                {tabs.map((tab, index) => (
                    <TabPanel key={index}>{tab.component}</TabPanel>
                ))}
            </TabContainer>
        </Container>
    );
}

export default Tabs;

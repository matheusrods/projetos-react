import React from 'react';
import { inject, observer } from 'mobx-react';
import { Container, TabContainer, TabOption, TabDescription } from './styles';

const TabWithoutHeader = ({ hiddenMobile, tabs, handleSelectTab, boxShadow, zIndex, position }) => {
    const numberOfTabs = tabs.length;
    return (
        <Container hiddenMobile={hiddenMobile} boxShadow={boxShadow} position={position} zIndex={zIndex}>
            <TabContainer>
                {tabs.map((tab, index) => (
                    <TabOption
                        numberOfTabs={numberOfTabs}
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

export default inject('UserStore')(observer(TabWithoutHeader));

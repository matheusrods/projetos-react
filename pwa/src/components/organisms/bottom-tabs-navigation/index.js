import React from 'react';
import { inject, observer } from "mobx-react";
import {
    Container,
    ItemContainer,
    ItemIcon,
    ItemLabel,
    ItemContent,
    ItemsContainer
} from "./styles";

import colors from "../../../styles/colors";
import { useHistory } from 'react-router-dom';

const BottomTabsNavigation = ({
        UserStore: { user },
        tabs
    }) => {
    const history = useHistory();

    const handleClick = (tab) => {
        if (tab.route) {
            history.push(tab.route);
            return;
        }
        if(tab.action){
            tab.action();
        }
    }

    return (
        <Container>
            <ItemsContainer>
                {tabs && tabs.map((tab, index) => (
                    <ItemContainer
                        key={index}
                        active={tab.active}
                        color={tab.active ? colors.client : colors.gray5}
                        onClick={() => handleClick(tab)}
                    >
                        <ItemContent>
                            <ItemIcon>
                                <tab.icon fontSize='1.125rem'/>
                            </ItemIcon>
                            <ItemLabel>
                                {tab.label}
                            </ItemLabel>
                        </ItemContent>
                    </ItemContainer>
                ))}

            </ItemsContainer>
        </Container>
    );
};

export default inject('UserStore')(observer(BottomTabsNavigation));

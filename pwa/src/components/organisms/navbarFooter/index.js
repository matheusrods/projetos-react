import React from "react";
import { inject, observer } from "mobx-react";
import { Container, ItemContainer, ItemIcon, ItemLabel, ItemContent, ItemsContainer } from "./styles";
import { FaCalendarAlt, FaHome, FaSearch } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import colors from "../../../styles/colors";

const NavbarFooter = ({ UserStore: { user }, active, onClickAudit }) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <Container>
            <ItemsContainer>
                <ItemContainer onClick={() => history.push(`/want-to-see`)}
                    color={active === 1 ? colors.client : colors.gray5}>
                    <ItemContent>
                        <ItemIcon>
                            <FaHome fontSize={'1.125rem'} />
                        </ItemIcon>
                        <ItemLabel>Início</ItemLabel>
                    </ItemContent>
                </ItemContainer>

                <ItemContainer onClick={() => history.push(`/audit/agenda`)}
                    color={active === 2 ? colors.client : colors.gray5} >
                    <ItemContent>
                        <ItemIcon>
                            <FaCalendarAlt fontSize={'1.125rem'} />
                        </ItemIcon>
                        <ItemLabel>Agenda</ItemLabel>
                    </ItemContent>
                </ItemContainer>
                <ItemContainer onClick={() => onClickAudit ? onClickAudit() : location.pathname}
                    color={active === 3 ? colors.client : colors.gray5} >
                    <ItemContent>
                        <ItemIcon>
                            <FaSearch fontSize={'1.125rem'} />
                        </ItemIcon>
                        <ItemLabel>Auditorias</ItemLabel>
                    </ItemContent>
                </ItemContainer>
            </ItemsContainer>
        </Container>
    );
};

export default inject('UserStore')(observer(NavbarFooter));

import React from "react";
import { Container, Header, MenuItem, UserSection } from "./styles";
import {
    FaAlignLeft,
    FaArrowAltCircleRight,
    FaHome,
    FaLock,
    FaTimes,
    FaUserEdit,
} from "react-icons/fa";
import colors from "../../../styles/colors";
import { Avatar } from "../../atoms";
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";

function Sidebar({ user, open, onClose, AuthStore: { logout }, ...rest }) {
    const history = useHistory();

    return (
        <Container open={open} {...rest}>
            <Header>
                <FaTimes size={20} color={colors.gray4_2} onClick={onClose} />
            </Header>
            <UserSection>
                <Avatar height={40} width={40} fontSize={16} user={user} />
                <span>{user.name}</span>
            </UserSection>
            <MenuItem onClick={() => history.push("/")}>
                <FaHome />
                Início
            </MenuItem>
            <MenuItem onClick={() => history.push("/edit-password")}>
                <FaUserEdit />
                Editar senha
            </MenuItem>
            <MenuItem onClick={() => history.push("/privacy-policies")}>
                <FaLock />
                Política de privacidade
            </MenuItem>
            <MenuItem onClick={() => history.push("/terms-of-use")}>
                <FaAlignLeft />
                Termos de uso
            </MenuItem>
            <MenuItem onClick={() => {
                logout();
                history.push("/");
            }}>
                <FaArrowAltCircleRight />
                Sair
            </MenuItem>
        </Container>
    );
}

export default inject("AuthStore")(observer(Sidebar));

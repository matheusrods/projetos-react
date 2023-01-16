import { inject, observer } from "mobx-react";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";
import { Redirect, useHistory } from "react-router";
import { Header as HeaderMain } from "../../../components/organisms";
import {
    Container,
    Header,
    CloseButton,
    Footer,
    BackButton,
} from "./styles";

const ViewPhoto = ({ PermissionStore: { hasPermission }}) => {
    const history = useHistory();

    const { photo = {} } = history.location.state ?? {};

    return hasPermission(15) ? (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            <Container imageURL={photo.url}>
                <Header>
                    <CloseButton onClick={() => history.goBack()}>
                        <FaTimes />
                    </CloseButton>
                </Header>
                <Footer>
                    <BackButton onClick={() => history.goBack()}>
                        Voltar
                    </BackButton>
                </Footer>
            </Container>
        </Fragment>
    ) : <Redirect to={"/action-plan"} />;
};

export default inject("PermissionStore")(observer(ViewPhoto));

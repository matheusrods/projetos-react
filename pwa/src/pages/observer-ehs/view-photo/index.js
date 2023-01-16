import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router";
import { Header as HeaderMain } from "../../../components/organisms";
import {
    Container,
    Header,
    CloseButton,
    Footer,
    BackButton,
} from "./styles";

const ViewPhoto = () => {
    const history = useHistory();

    const { photo = {} } = history.location.state ?? {};

    return (
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
    );
};

export default ViewPhoto;

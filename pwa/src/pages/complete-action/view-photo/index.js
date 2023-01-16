import { inject, observer } from "mobx-react";
import React, { Fragment, useState } from "react";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Redirect, useHistory } from "react-router";
import { ModalComplex } from "../../../components/molecules";
import { Header as HeaderMain } from "../../../components/organisms";
import { deleteFile } from "../../../services/endpoints/actions";
import {
    Container,
    Header,
    CloseButton,
    Footer,
    EditPhotoButton,
    RemovePhotoButton,
    BackButton,
} from "./styles";

const ViewPhoto = ({ PermissionStore: { hasPermission }}) => {
    const history = useHistory();

    const { photo = {} } = history.location.state ?? {};

    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeleteFile = async () => {
        setLoading(true);

        const deleted = await deleteFile(photo.id);

        if (deleted) {
            history.goBack();
        } else {
            setLoading(false);
        }
    };

    return hasPermission(5) ? (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            <Container imageURL={photo.url}>
                <Header>
                    <CloseButton onClick={() => history.goBack()}>
                        <FaTimes />
                    </CloseButton>
                </Header>
                <Footer>
                    <EditPhotoButton
                        onClick={() =>
                            history.push("edit-photo", {
                                photo: photo
                            })
                        }
                    >
                        <FaEdit />
                    </EditPhotoButton>
                    <RemovePhotoButton
                        onClick={() => setModalConfirmDeleteVisible(true)}
                    >
                        <FaTrashAlt />
                        Excluir
                    </RemovePhotoButton>
                    <BackButton onClick={() => history.goBack()}>
                        Voltar
                    </BackButton>
                </Footer>
            </Container>
            <ModalComplex
                title={"Excluir"}
                description={"Ao prosseguir, o item selecionado será excluído. Deseja excluir?"}
                nameModal={"delete"}
                visible={modalConfirmDeleteVisible}
                onCancel={() => setModalConfirmDeleteVisible(false)}
                onConfirm={() => handleDeleteFile()}
                icon={<FaTrashAlt size={32} />}
                confirmButtonLabel={"Sim, excluir"}
                confirmButtonLoading={loading}
                cancelButtonLabel={"Não, cancelar"}
            />
        </Fragment>
    ) : <Redirect to={"/action-plan"} />;
};

export default inject("PermissionStore")(observer(ViewPhoto));

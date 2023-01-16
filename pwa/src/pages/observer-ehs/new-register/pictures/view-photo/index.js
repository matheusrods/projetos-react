import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { ModalComplex } from '../../../../../components/molecules';
import { Header as HeaderMain } from '../../../../../components/organisms';
import {
    Container,
    Header,
    CloseButton,
    Footer,
    EditPhotoButton,
    RemovePhotoButton,
    BackButton
} from './styles';

const ViewPhoto = ({
    NewRegisterObserver: { pictures, setNewRegisterData }
}) => {
    const { id } = useParams();

    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(
        false
    );

    const history = useHistory();

    const handleDeleteFile = () => {
        let newPictures = [...pictures];
        newPictures.splice(id, 1);

        setNewRegisterData({
            pictures: newPictures
        });

        setModalConfirmDeleteVisible(false);

        history.goBack();
    };

    return (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            <Container imageURL={pictures[id]}>
                <Header>
                    <CloseButton onClick={() => history.goBack()}>
                        <FaTimes />
                    </CloseButton>
                </Header>
                <Footer>
                    <EditPhotoButton
                        onClick={() =>
                            history.push("edit-photo", {
                                photo: pictures[id]
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
                cancelButtonLabel={"Não, cancelar"}
            />
        </Fragment>
    );
};

export default inject('NewRegisterObserver')(observer(ViewPhoto));

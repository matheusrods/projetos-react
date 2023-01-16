import React, { Fragment } from 'react';
import { FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import {
    Container,
    Header,
    CloseButton,
    Footer,
    EditPhotoButton,
    RemovePhotoButton,
    BackButton
} from './styles';

const ViewPhoto = ({ onClose, fileBase64, setModalDeleteConfirm, setStep }) => {
    return (
        <Fragment>
            <Container imageURL={fileBase64}>
                <Header>
                    <CloseButton onClick={() => onClose()}>
                        <FaTimes />
                    </CloseButton>
                </Header>
                <Footer>
                    {setStep && (
                        <EditPhotoButton onClick={() => setStep('edit')}>
                            <FaEdit />
                        </EditPhotoButton>
                    )}

                    <RemovePhotoButton
                        onClick={() => setModalDeleteConfirm(true)}
                    >
                        <FaTrashAlt />
                        Excluir
                    </RemovePhotoButton>
                    <BackButton onClick={() => onClose()}>Voltar</BackButton>
                </Footer>
            </Container>
        </Fragment>
    );
};

export default ViewPhoto;

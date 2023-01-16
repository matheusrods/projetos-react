import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { Redirect, useHistory } from 'react-router-dom';
import { ModalComplex } from '../../../../../../../../components/molecules';
import { Header as HeaderMain } from '../../../../../../../../components/organisms';
import {
    Container,
    Header,
    CloseButton,
    Footer,
    EditPhotoButton,
    RemovePhotoButton,
    BackButton
} from './styles';

const AuditingViewPhoto = ({
    AuditProfileAuditorStore
}) => {
    const history = useHistory();

    const {
        programmingInEditing = null,
        themesInAuditing = [],
        stepThemeIndex = 0,
        titlePhotoInEditingIndex = 0,
        requirementPhotoInEditingIndex = 0,
        photoInEditingIndex = 0,
        removePhoto: handleRemovePhoto
    } = AuditProfileAuditorStore;

    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(false);

    const handleDeleteFile = () => {
        handleRemovePhoto(stepThemeIndex, titlePhotoInEditingIndex, requirementPhotoInEditingIndex, photoInEditingIndex);

        setModalConfirmDeleteVisible(false);

        history.goBack();
    };

    return programmingInEditing && themesInAuditing[stepThemeIndex]
        ?.titles[titlePhotoInEditingIndex]
        ?.requirements[requirementPhotoInEditingIndex]
        ?.photos[photoInEditingIndex] ? (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            <Container imageURL={
                themesInAuditing[stepThemeIndex]
                    .titles[titlePhotoInEditingIndex]
                    .requirements[requirementPhotoInEditingIndex]
                    .photos[photoInEditingIndex]
            }>
                <Header>
                    <CloseButton onClick={history.goBack}>
                        <FaTimes />
                    </CloseButton>
                </Header>
                <Footer>
                    <EditPhotoButton
                        onClick={() => history.push('edit-photo')}
                    >
                        <FaEdit />
                    </EditPhotoButton>
                    <RemovePhotoButton
                        onClick={() => setModalConfirmDeleteVisible(true)}
                    >
                        <FaTrashAlt />
                        Excluir
                    </RemovePhotoButton>
                    <BackButton onClick={history.goBack}>
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
                onConfirm={handleDeleteFile}
                icon={<FaTrashAlt size={32} />}
                confirmButtonLabel={"Sim, excluir"}
                cancelButtonLabel={"Não, cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/audit/profile-auditor'} />;
};

export default inject('AuditProfileAuditorStore')(observer(AuditingViewPhoto));

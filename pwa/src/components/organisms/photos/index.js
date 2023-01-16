import React, { useState } from 'react';

import { Container, Content } from './styles';

import { FaTrashAlt } from 'react-icons/fa';

import { ModalActions, ModalComplex } from '../../molecules';
import ListPhoto from './list-photo';
import ViewPhoto from './view-photo';
import Edit from '../../../pages/observer-ehs/risk-rating/edit';
import EditPhoto from './edit-photo';

const Photos = ({
    subHeaderLabel = '',
    title = '',
    description = '',
    pictures = [],
    setPictures = null,
    addPicture = null,
    removePicture = null,
    updatePicture = null,
    onClose = () => {},
    children
}) => {
    const [file, setFile] = useState(null);
    const [fileBase64, setFileBase64] = useState(null);
    const [modalActionVisible, setModalActionVisible] = useState(false);
    const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);
    const [step, setStep] = useState('index');

    const handleDeleteFile = () => {
        if (setPictures !== null) {
            setPictures(pictures.filter((item, index) => index !== file));
            setModalDeleteConfirm(false);
            setModalActionVisible(false);
            setStep('index');
        } else {
            setModalDeleteConfirm(false);
            setModalActionVisible(false);
            setStep('index');
            removePicture(file);
        }
    };
    const handleEditPicture = () => {
        setStep('view');
        setModalActionVisible(false);
    };

    const renderStep = () => {
        switch (step) {
            case 'index':
                return (
                    <ListPhoto
                        title={title}
                        description={description}
                        pictures={pictures}
                        setPictures={setPictures}
                        addPicture={addPicture}
                        setFile={setFile}
                        setModalActionVisible={setModalActionVisible}
                        subHeaderLabel={subHeaderLabel}
                        onClose={onClose}
                        setFileBase64={setFileBase64}
                        children={children}
                    />
                );
            case 'view':
                return (
                    <ViewPhoto
                        onClose={() => setStep('index')}
                        fileBase64={fileBase64}
                        setModalDeleteConfirm={setModalDeleteConfirm}
                        setStep={setStep}
                    />
                );
            case 'edit':
                return (
                    <EditPhoto
                        onClose={() => setStep('index')}
                        fileBase64={fileBase64}
                        file={file}
                        setStep={setStep}
                        setPictures={setPictures}
                        updatePicture={updatePicture}
                        pictures={pictures}
                    />
                );
            default:
                return null;
        }
    };
    return (
        <Container>
            <Content>{renderStep()}</Content>
            <ModalActions
                title={'Imagem'}
                nameModal={'modal-actions'}
                visible={modalActionVisible}
                onClose={() => setModalActionVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () => {
                            handleEditPicture();
                        }
                    },
                    {
                        label: 'Excluir item',
                        onPress: () => setModalDeleteConfirm(true),
                        icon: 'FaTrashAlt',
                        color: '#FF5C69'
                    }
                ]}
            />
            <ModalComplex
                title={'Excluir'}
                description={
                    'Ao prosseguir, o item selecionado será excluído. Deseja excluir?'
                }
                nameModal={'delete'}
                visible={modalDeleteConfirm}
                onCancel={() => setModalDeleteConfirm(false)}
                onConfirm={() => handleDeleteFile()}
                icon={<FaTrashAlt size={32} />}
                confirmButtonLabel={'Sim, excluir'}
                cancelButtonLabel={'Não, cancelar'}
            />
        </Container>
    );
};

export default Photos;

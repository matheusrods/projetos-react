import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import {
    FaCamera,
    FaCheck,
    FaExclamationTriangle,
    FaPlus,
    FaTrashAlt
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CompanyHeader, NextButton, Photo } from '../../../../components/atoms';
import { ModalActions, ModalComplex } from '../../../../components/molecules';
import { Header } from '../../../../components/organisms';
import colors from '../../../../styles/colors';
import { getBase64 } from '../../../../utils/base64';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    Wrapper,
    PageDescription,
    WrapperDescription,
    Label,
    InputFile,
    ContainerPhotos,
    LabelListPhotos,
    ListPhotos,
    AddPhotoButton,
    WrapperContainer
} from './styles';

const NewRegisterPictures = ({
    NewRegisterObserver: { pictures, setNewRegisterData }
}) => {
    const history = useHistory();
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(
        false
    );
    const [
        modalConfirmConcludeVisible,
        setModalConfirmConcludeVisible
    ] = useState(false);
    const [modalExitPage, setModalExitPage] = useState(false);

    const { isEditingFromCheckObservation = false } =
        history.location.state ?? {};

    const renderPhotos = () => {
        return pictures?.map((item, index) => (
            <Photo
                src={item}
                key={index}
                showOptions={true}
                onClickOptions={() => {
                    setSelectedPicture(index);
                    setModalActionsVisible(true);
                }}
            />
        ));
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                toast.error('O arquivo selecionado não é uma imagem válida!');
                return;
            }

            await getBase64(file).then((result) => {
                const fileBase64 = result;
                setNewRegisterData({
                    pictures: [...pictures, fileBase64]
                });
            });
        }
    };

    const handleDeleteFile = () => {
        let newPictures = [...pictures];
        newPictures.splice(selectedPicture, 1);

        setNewRegisterData({
            pictures: newPictures
        });

        setModalActionsVisible(false);
        setModalConfirmDeleteVisible(false);
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Observador EHS'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Fotos da observação</PageTitle>
                    </PageInfo>
                    <PageDescription>
                        Para finalizar, adicione fotos que ilustrem a observação
                    </PageDescription>
                    <Wrapper>
                        {pictures?.length === 0 ? (
                            <>
                                <WrapperContainer>
                                    <FaCamera
                                        color={colors.grayBorder}
                                        size={56}
                                    />
                                    <WrapperDescription>
                                        Para melhor ilustrar a observação, por
                                        favor, adicione fotos
                                    </WrapperDescription>
                                </WrapperContainer>
                                <Label htmlFor={'upload-photo'}>
                                    <FaCamera />
                                    Adicionar fotos
                                </Label>
                            </>
                        ) : (
                            <>
                                <ContainerPhotos>
                                    <LabelListPhotos>
                                        Fotos adicionadas
                                    </LabelListPhotos>
                                    <ListPhotos>
                                        {renderPhotos()}
                                        <AddPhotoButton
                                            htmlFor={'upload-photo'}
                                        >
                                            <FaPlus />
                                        </AddPhotoButton>
                                    </ListPhotos>
                                </ContainerPhotos>
                            </>
                        )}
                        <InputFile
                            id={'upload-photo'}
                            type={'file'}
                            onChange={handleFileInputChange}
                            accept={'image/*'}
                        />
                    </Wrapper>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        if (isEditingFromCheckObservation) {
                            history.goBack()
                        } else {
                            setNewRegisterData({
                                currentStep: '/observer-ehs/new-register/description',
                            });

                            history.push("description");
                        }
                    }}
                    onNext={() =>{
                        if (isEditingFromCheckObservation) {
                            history.goBack();
                        } else {
                            setNewRegisterData({
                                currentStep: '/observer-ehs/new-register/risk-impact',
                            });

                            history.push('risk-impact');
                        }
                    }}
                    nextLabel={
                        isEditingFromCheckObservation ? 'Concluir' : pictures?.length === 0 ? 'Pular' : 'Avançar'
                    }
                    icon={
                        isEditingFromCheckObservation ? <FaCheck /> : undefined
                    }
                />
            </Container>
            <ModalActions
                title={'Imagem'}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () => history.push(`pictures/${selectedPicture}/view-photo`)
                    },
                    {
                        label: 'Excluir item',
                        onPress: () => setModalConfirmDeleteVisible(true),
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
                visible={modalConfirmDeleteVisible}
                onCancel={() => setModalConfirmDeleteVisible(false)}
                onConfirm={() => handleDeleteFile()}
                icon={<FaTrashAlt size={32} />}
                confirmButtonLabel={'Sim, excluir'}
                cancelButtonLabel={'Não, cancelar'}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao prosseguir, a ação será concluída. Este ato não pode ser revertido. Tem certeza que deseja dar esta ação como concluída?'
                }
                nameModal={'conclude'}
                visible={modalConfirmConcludeVisible}
                onCancel={() => setModalConfirmConcludeVisible(false)}
                onConfirm={() => history.goBack()}
                icon={<FaExclamationTriangle size={40} color={'#5CB3FF'} />}
                confirmButtonLabel={'Sim, concluir'}
                cancelButtonLabel={'Não, cancelar'}
            />
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, você perdera os dados dessa tela. Tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/observer-ehs/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject('NewRegisterObserver')(observer(NewRegisterPictures));

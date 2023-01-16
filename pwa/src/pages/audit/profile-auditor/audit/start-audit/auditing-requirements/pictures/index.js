import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import {
    FaCamera,
    FaExclamationTriangle,
    FaPlus,
    FaTrashAlt
} from 'react-icons/fa';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    CompanyHeader,
    NextButton,
    Photo
} from '../../../../../../../components/atoms';
import { ModalActions, ModalComplex } from '../../../../../../../components/molecules';
import { Header } from '../../../../../../../components/organisms';
import colors from '../../../../../../../styles/colors';
import { getBase64 } from '../../../../../../../utils/base64';
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

const AuditingPictures = ({ AuditProfileAuditorStore }) => {
    const history = useHistory();

    const {
        programmingInEditing = null,
        themesInAuditing = [],
        stepThemeIndex = 0,
        titlePhotoInEditingIndex = 0,
        requirementPhotoInEditingIndex = 0,
        addOrUpdatePhoto: handleAddOrUpdatePhoto,
        removePhoto: handleRemovePhoto,
        setPhotoInEditingIndex: onChangePhotoInEditingIndex
    } = AuditProfileAuditorStore;

    const [selectedPicture, setSelectedPicture] = useState(null);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(false);
    const [modalConfirmConcludeVisible, setModalConfirmConcludeVisible] = useState(false);

    const renderPhotos = () => {
        return themesInAuditing[stepThemeIndex]
            ?.titles[titlePhotoInEditingIndex]
            ?.requirements[requirementPhotoInEditingIndex]
            ?.photos?.map((photo, index) => (
                <Photo
                    src={photo}
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
            if (file.size > 5000000) {
                toast.error("O limite máximo para envio de arquivos é de 5 MB!");
                return;
            }

            if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                toast.error('O arquivo selecionado não é uma imagem válida!');
                return;
            }

            await getBase64(file).then((result) => {
                const fileBase64 = result;

                handleAddOrUpdatePhoto(stepThemeIndex, fileBase64, titlePhotoInEditingIndex, requirementPhotoInEditingIndex);
            });

            document.getElementById('upload-photo').value = '';
        }
    };

    const handleDeleteFile = () => {
        handleRemovePhoto(stepThemeIndex, titlePhotoInEditingIndex, requirementPhotoInEditingIndex, selectedPicture);

        setModalActionsVisible(false);
        setModalConfirmDeleteVisible(false);
    };

    return programmingInEditing ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Auditoria em andamento'}
                    onClose={history.goBack}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Fotos da auditoria</PageTitle>
                    </PageInfo>
                    <PageDescription>
                        Adicione fotos que ilustrem as conformidades ou não
                        conformidades.
                    </PageDescription>
                    <Wrapper>
                        {themesInAuditing[stepThemeIndex]
                            ?.titles[titlePhotoInEditingIndex]
                            ?.requirements[requirementPhotoInEditingIndex]
                            ?.photos
                            ?.length === 0 ? (
                            <Fragment>
                                <WrapperContainer>
                                    <FaCamera
                                        color={colors.grayBorder}
                                        size={56}
                                    />
                                    <WrapperDescription>
                                        Para melhor ilustrar o requisito, por
                                        favor, adicione fotos
                                    </WrapperDescription>
                                </WrapperContainer>
                                <Label htmlFor={'upload-photo'}>
                                    <FaCamera />
                                    Adicionar fotos
                                </Label>
                            </Fragment>
                        ) : (
                            <Fragment>
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
                            </Fragment>
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
                    onBack={history.goBack}
                    onNext={history.goBack}
                    nextLabel={'Voltar para o tema'}
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
                        onPress: () => {
                            onChangePhotoInEditingIndex(selectedPicture);
                            history.push('pictures/view-photo');
                        }
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
                description={'Ao prosseguir, o item selecionado será excluído. Deseja excluir?'}
                nameModal={'delete'}
                visible={modalConfirmDeleteVisible}
                onCancel={() => setModalConfirmDeleteVisible(false)}
                onConfirm={handleDeleteFile}
                icon={<FaTrashAlt size={32} />}
                confirmButtonLabel={'Sim, excluir'}
                cancelButtonLabel={'Não, cancelar'}
            />
            <ModalComplex
                title={'Atenção'}
                description={'Ao prosseguir, a ação será concluída. Este ato não pode ser revertido. Tem certeza que deseja dar esta ação como concluída?'}
                nameModal={'conclude'}
                visible={modalConfirmConcludeVisible}
                onCancel={() => setModalConfirmConcludeVisible(false)}
                onConfirm={history.goBack}
                icon={<FaExclamationTriangle size={40} color={'#5CB3FF'} />}
                confirmButtonLabel={'Sim, concluir'}
                cancelButtonLabel={'Não, cancelar'}
            />
        </Fragment>
    ) : <Redirect to={'/audit/profile-auditor'} />;
};

export default inject('AuditProfileAuditorStore')(observer(AuditingPictures));

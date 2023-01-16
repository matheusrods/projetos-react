import React, { Fragment } from 'react';
import { FaCamera, FaPlus } from 'react-icons/fa';
import { Body, PageDescription, PageInfo, PageTitle, Wrapper } from '../styles';
import {
    AddPhotoButton,
    ContainerPhotos,
    InputFile,
    Label,
    LabelListPhotos,
    ListPhotos,
    WrapperContainer,
    WrapperDescription
} from './styles';
import colors from '../../../../styles/colors';
import { CompanyHeader, Photo } from '../../../atoms';
import { toast } from 'react-toastify';
import { getBase64 } from '../../../../utils/base64';

const ListPhoto = ({
    title = '',
    description = '',
    pictures,
    setPictures = null,
    addPicture = null,
    setFile,
    setModalActionVisible,
    subHeaderLabel,
    setFileBase64,
    onClose,
    children
}) => {
    const renderPhotos = () => {
        return pictures.map((item, index) => (
            <Photo
                src={item}
                key={index}
                showOptions={true}
                onClickOptions={() => {
                    setFile(index);
                    setFileBase64(item);
                    setModalActionVisible(true);
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
                if (setPictures !== null) {
                    setPictures([...pictures, fileBase64]);
                } else {
                    addPicture(fileBase64);
                }
            });
        }
    };

    return (
        <Fragment>
            <CompanyHeader
                positionRelative={true}
                typeAction={subHeaderLabel}
                onClose={() => onClose()}
            />
            <Body>
                <PageInfo>
                    <PageTitle>{title}</PageTitle>
                </PageInfo>
                <PageDescription>{description}</PageDescription>

                <Wrapper>
                    {pictures.length === 0 ? (
                        <>
                            <WrapperContainer>
                                <FaCamera color={colors.grayBorder} size={56} />
                                <WrapperDescription>
                                    {description}
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
                                    <AddPhotoButton htmlFor={'upload-photo'}>
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
            </Body>

            {children && !!pictures.length && children}
        </Fragment>
    );
};

export default ListPhoto;

import React from 'react';
import close from '../../../assets/images/icons/close.svg';
import file from '../../../assets/images/icons/file.svg';

import {
    Container,
    ContainerIcon,
    ContainerContent,
    ContainerClose,
    ContainerText,
    Name,
    Size
} from './styles';

const CardFileUploading = ({
    onDelete,
    nameFile,
    sizeFile
}) => {
    return (
        <Container>
            <ContainerIcon>
                <img src={file} alt={''} />
            </ContainerIcon>
            <ContainerContent>
                <ContainerText>
                    <Name>{nameFile ?? 'Nenhum arquivo'}</Name>
                    <Size>
                        {typeof sizeFile === 'undefined'
                            ? '0 MB'
                            : sizeFile
                        }
                    </Size>
                </ContainerText>
            </ContainerContent>
            <ContainerClose onClick={onDelete}>
                <img src={close} alt={''} />
            </ContainerClose>
        </Container>
    );
};

export default CardFileUploading;

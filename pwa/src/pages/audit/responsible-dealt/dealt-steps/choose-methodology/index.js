import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import {
    Backdrop,
    NextButton,
    WhiteHeaderBack,
    Modal,
    CardFileUploading
} from '../../../../../components/atoms';

import {
    Container,
    Content,
    Label,
    Select,
    ContainerDivisor,
    Span,
    ContainerUpload,
    Option,
    ContainerInput,
    InputFile,
    ContainerUploaded,
    LabelFile,
    ButtonFile,
    ModalContainer,
    ModalHeader,
    ModalContent,
    ModalText,
    ModalFooter,
    ModalButton
} from './styles';

import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getBase64 } from '../../../../../utils/base64';
import { formatBytes } from '../../../../../services/endpoints/actions';

const methodologyOptions = [
    {
        id: 1,
        name: '5W2H'
    },
    {
        id: 2,
        name: 'Ishikawa'
    },
    {
        id: 3,
        name: '5PQs'
    },
    {
        id: 4,
        name: 'Outra'
    }
];

const AuditResponsibleDealtChooseMethodology = ({ Auditing }) => {
    const history = useHistory();

    const { unConformityRequirement = null, dealInEditing, setDealInEditing } = Auditing;

    const [modalInfoVisible, setModalInfoVisible] = useState(false);

    const hiddenFileInput = React.useRef(null);

    const handleSubmit = () => {
        switch (dealInEditing?.methodology) {
            case 1:
                history.push('5W2H');
                break;
            case 2:
                history.push('ishikawa');
                break;
            case 3:
                history.push('5PQs');
                break;
            case 4:
                history.push('investigation-cause');
                break;
            default:
                toast.error('Nenhum opção selecionada!');
                break;
        }
    };

    const handleChangeInputFile = async (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 5000000) {
                toast.error("O limite máximo para envio de arquivos é de 5 MB!");
                return;
            }

            if (!file.name.match(/.(pdf)$/i)) {
                toast.error("O arquivo selecionado precisa ser um PDF!");
                return;
            }

            await getBase64(file).then((result) => {
                const fileBase64 = result;

                setDealInEditing({
                    fileMethodology: {
                        name: file.name,
                        base64: fileBase64,
                        size: formatBytes(file.size)
                    }
                });
            });
        }
    };

    const handleChangeSelectMethodology = (event) => {
        const data = {
            methodology: parseInt(event.target.value),
            ...((event.target.value !== 4) ? { fileMethodology: null } : {})
        };

        setDealInEditing(data);
    };

    const handleClickInputFile = () => {
        hiddenFileInput.current.click();
    };

    const handleOnDeleteArchive = () => {
        setDealInEditing({
            fileMethodology: null
        });
    };

    return unConformityRequirement ? (
        <>
            <WhiteHeaderBack
                title={'Tratativa de NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                <Content>
                    <ContainerInput>
                        <Label htmlFor={'select-methodology'}>
                            METODOLOGIA UTILIZADA
                        </Label>
                        <Select
                            id={'select-methodology'}
                            name={'select-methodology'}
                            value={dealInEditing?.methodology || 0}
                            onChange={handleChangeSelectMethodology}
                        >
                            <Option value={0} disabled>
                                Escolha a metodologia
                            </Option>
                            {methodologyOptions.map((option) => {
                                return (
                                    <Option
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </ContainerInput>
                    {(dealInEditing?.methodology === 4 && !dealInEditing?.fileMethodology) && (
                        <>
                            <ContainerDivisor>
                                <Span>ou</Span>
                            </ContainerDivisor>
                            <ContainerUpload>
                                <InputFile
                                    id={'methodology-upload'}
                                    type={'file'}
                                    name={'methodology-upload'}
                                    accept={'application/pdf'}
                                    onChange={handleChangeInputFile}
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput}
                                />
                                <ButtonFile onClick={handleClickInputFile}>
                                    <FaUpload fontSize={'16px'} />
                                </ButtonFile>
                                <LabelFile htmlFor={'methodology-upload'}>
                                    Faça upload de um arquivo
                                </LabelFile>
                                <LabelFile htmlFor={'methodology-upload'}>
                                    PDF e máx. 5MB
                                </LabelFile>
                            </ContainerUpload>
                        </>
                    )}
                    {dealInEditing?.fileMethodology ? (
                        <ContainerUploaded>
                            <CardFileUploading
                                nameFile={dealInEditing?.fileMethodology?.name}
                                sizeFile={dealInEditing?.fileMethodology?.size}
                                onDelete={handleOnDeleteArchive}
                            />
                        </ContainerUploaded>
                    ) : null}
                </Content>
                <NextButton
                    positionRelative={true}
                    nextDisabled={
                        !dealInEditing?.methodology
                        || dealInEditing?.methodology === 0
                        || (dealInEditing?.methodology === 4 && !dealInEditing?.fileMethodology)
                    }
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
            <Backdrop
                visible={modalInfoVisible}
                nameModal={'modal-info'}
                onClose={() => setModalInfoVisible(false)}
            >
                <Modal visible={modalInfoVisible}>
                    <ModalContainer>
                        <ModalHeader>Ops...</ModalHeader>
                        <ModalContent>
                            <ModalText>
                                O arquivo deve ser um PDF e ter o tamanho máximo
                                de 5MB.
                            </ModalText>
                        </ModalContent>
                    </ModalContainer>
                    <ModalFooter>
                        <ModalButton onClick={() => setModalInfoVisible(false)}>
                            Ok
                        </ModalButton>
                    </ModalFooter>
                </Modal>
            </Backdrop>
        </>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
};

export default inject('Auditing')(
    observer(AuditResponsibleDealtChooseMethodology)
);

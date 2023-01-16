import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

import {
    Body,
    Container,
    Content,
    PageDescription,
    PageTitle,
    ContainerCanvas,
    ContainerNameInput,
    ClearButton,
    ContainerButtons,
    UndoButton,
    Date,
    ContainerIconNotFound,
    ContainerNotFound,
    ContainerSignature,
    Image,
    Name,
    TextNotFound, AlignRight
} from './styles';
import { AddButton, CompanyHeader, InputDefault } from '../../atoms';

import { FiAlertCircle, FiCornerUpLeft, FiXSquare } from 'react-icons/fi';
import { ModalComplex, ModalComplexPage } from '../../molecules';
import BottomNavigationButton from '../../atoms/bottom-navigation-button';
import moment from 'moment';

import { FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signatures = ({
    subHeaderLabel = '',
    title = 'Assinatura Digital',
    confirmTitle = 'Assinatura Digital dos auditados',
    signatures = [],
    setSignatures = null,
    addSignature = null,
    onClose = () => {},
    backAction = () => {},
    onSignature = () => {},
    placeHolder = 'Nome do auditado',
    minSignatures = 1,
}) => {
    const [name, setName] = useState('');
    const refCanvas = useRef(null);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [modalSignatures, setModalSignatures] = useState(false);

    const addSignatureLocal = () => {
        const currentSignature = isCanvasEmpty();
        if (!name || currentSignature === null) {
            setAlertModalVisible(true);
            return;
        }
        if(setSignatures !== null){
            setSignatures([...signatures, { name: name, signature: currentSignature }]);
        }else{
            addSignature(name, currentSignature);
        }
        setName('');
        refCanvas.current.clear();
        toast.success('Assinatura adicionada com sucesso!');
    }

    const isCanvasEmpty = () => {
        const canvas = refCanvas?.current?.getSaveData();
        const objCanvas = JSON.parse(canvas);

        if (objCanvas.lines.length) {
            return refCanvas.current.canvas.drawing.toDataURL();
        }

        return null;
    };

    const showModalSignatures = () => {
        const currentSignature = isCanvasEmpty();
        if (name && currentSignature !== null) {
            if(setSignatures !== null){
                setSignatures([...signatures, { name: name, signature: currentSignature }]);
            }else{
                addSignature(name, currentSignature);
            }
            setName('');
            refCanvas.current.clear();
        }

        setModalSignatures(true);
    }

    return (
        <Container>
            <Content>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={subHeaderLabel}
                    onClose={() => onClose()}
                />
                <Body>
                    <PageTitle>{title}</PageTitle>
                    <ContainerNameInput>
                        <InputDefault
                            type={'text'}
                            name={'name'}
                            placeholder={placeHolder}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                            flexDirection={'column'}
                        />
                    </ContainerNameInput>
                    <PageDescription>Faça a sua assinatura como em seu documento.</PageDescription>
                    <ContainerCanvas>
                        <CanvasDraw
                            hideGrid
                            ref={refCanvas}
                            canvasHeight={'100%'}
                            canvasWidth={'100%'}
                            brushColor={'#000000'}
                            lazyRadius={10}
                            brushRadius={1}
                            hideInterface={true}
                            loadTimeOffset={0}
                        />
                    </ContainerCanvas>
                    <PageDescription>Quantidade de assinaturas: {signatures.length}</PageDescription>
                    <ContainerButtons>
                        <UndoButton
                            onClick={() => refCanvas.current.undo()}
                        >
                            <FiCornerUpLeft fontSize={16} /> Limpar último{' '}
                        </UndoButton>
                        <ClearButton
                            onClick={() => refCanvas.current.clear()}
                        >
                            Limpar tudo <FiXSquare fontSize={16} />
                        </ClearButton>
                    </ContainerButtons>
                </Body>
                <AlignRight>
                    <AddButton
                        onClick={() => addSignatureLocal()}
                        position={'relative'}
                    />
                </AlignRight>

                <BottomNavigationButton
                    onNext={() => showModalSignatures()}
                    nextLabel={'Estou ciente da auditoria'}
                    positionRelative={true}
                    onBack={() => backAction()}
                />
            </Content>
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onConfirm={() => setAlertModalVisible(false)}
                title={'Preencha os campos!'}
                description={`Os campos Nome e Assinatura são obrigatórios, para prosseguir é necessário preenche-los.`}
                confirmButtonLabel={'Ok !'}
                icon={<FiAlertCircle />}
                uniqueFooterButton={true}
                onCancel={() => setAlertModalVisible(false)}
            />
            <ModalComplexPage
                visible={modalSignatures}
                onCancel={() => setModalSignatures(false)}
                nameModal={'signatures-modal'}
                onConfirm={() => onSignature()}
                cancelButtonLabel={'Cancelar'}
                confirmButtonLabel={'Finalizar'}
                disableConfirmButton={signatures.length < minSignatures}
            >
                <PageTitle>{confirmTitle}</PageTitle>
                {!signatures.length ?
                    <ContainerNotFound>
                        <ContainerIconNotFound>
                            <FaExclamationCircle></FaExclamationCircle>
                        </ContainerIconNotFound>
                        <TextNotFound>
                            Nenhuma assinatura coletada.
                        </TextNotFound>
                    </ContainerNotFound>
                    :
                    signatures.map((signature, index) => {
                        return (
                            <ContainerSignature key={index}>
                                <Image src={signature.signature} />
                                <Name>{signature.name}</Name>
                            </ContainerSignature>
                        );
                    })
                }
                <Date>Data: {moment().format('DD/MM/YYYY')}</Date>
            </ModalComplexPage>

        </Container>
    );
};

export default Signatures;

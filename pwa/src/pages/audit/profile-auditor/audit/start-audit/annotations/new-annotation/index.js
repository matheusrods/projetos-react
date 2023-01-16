import React, { Fragment, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import CanvasDraw from 'react-canvas-draw';
import { FaPen } from 'react-icons/fa';
import { FiAlertCircle, FiCornerUpLeft, FiXSquare } from 'react-icons/fi';
import { Redirect, useHistory } from 'react-router-dom';
import {
    CompanyHeader,
    NextButton
} from '../../../../../../../components/atoms';
import { ModalComplex } from '../../../../../../../components/molecules';
import {
    Container,
    Content,
    Title,
    ContainerTextArea,
    Description,
    TextArea,
    ContainerSaveModal,
    TextSaveModal,
    InputTitle,
    ContainerCanvas,
    ContainerButtons,
    ClearButton,
    UndoButton
} from './styles';
import { Header } from '../../../../../../../components/organisms';

function AuditPendingViewAnnotations({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInEditing = null, addAnnotation } = AuditProfileAuditorStore;

    const refCanvas = useRef(null);
    const refInputTitle = useRef(null);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [titleAnnotation, setTitleAnnotation] = useState('');
    const [descriptionAnnotation, setDescriptionAnnotation] = useState('');

    const verifyData = () => {
        const canvas = getCanvas();

        if (canvas === null || descriptionAnnotation.length === 0) {
            setAlertModalVisible(true);
            return;
        }

        setSaveModalVisible(true);
    }

    const handleSubmit = async () => {
        setSaveModalVisible(false);
        setLoadingSubmit(true);

        const annotation = {
            title: titleAnnotation,
            description: descriptionAnnotation,
            image: getCanvas()
        };

        const response = await addAnnotation(annotation);

        if (response) {
            history.goBack();
        }

        setLoadingSubmit(false);
    }

    const getCanvas = () => {
        const canvas = refCanvas.current.getSaveData();
        const objCanvas = JSON.parse(canvas);

        if (objCanvas.lines.length) {
            return refCanvas.current.canvas.drawing.toDataURL();
        }

        return null;
    }

    return programmingInEditing ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    onClose={history.goBack}
                    typeAction={'Auditoria em andamento'}
                />
                <Content>
                    <Title>Anotações</Title>
                    <ContainerTextArea>
                        <Description>
                            Faça a suas anotações no espaço abaixo.
                        </Description>
                        <TextArea
                            placeholder={'Digite aqui as anotações...'}
                            id={'annotations-text'}
                            onChange={({ target: { value } }) => setDescriptionAnnotation(value)}
                            value={descriptionAnnotation}
                        ></TextArea>
                    </ContainerTextArea>
                    <ContainerTextArea>
                        <Description>
                            <FaPen /> Escreva a suas anotações no espaço abaixo.
                        </Description>
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
                        <ContainerButtons>
                            <UndoButton
                                onClick={() => refCanvas.current.undo()}
                            >
                                <FiCornerUpLeft fontSize={16} /> Limpar último
                            </UndoButton>
                            <ClearButton
                                onClick={() => refCanvas.current.clear()}
                            >
                                Limpar tudo <FiXSquare fontSize={16} />
                            </ClearButton>
                        </ContainerButtons>
                    </ContainerTextArea>
                </Content>
                <NextButton
                    positionRelative={true}
                    nextLabel="Salvar"
                    onBack={history.goBack}
                    onNext={verifyData}
                    nextDisabled={loadingSubmit}
                    loading={loadingSubmit}
                />
            </Container>
            <ModalComplex
                nameModal={'save-modal'}
                visible={saveModalVisible}
                onCancel={() => setSaveModalVisible(false)}
                onConfirm={() => {
                    if (titleAnnotation.toString().length) {
                        handleSubmit();
                        return;
                    }

                    refInputTitle.current.focus();
                }}
                confirmButtonLabel={'Salvar'}
                cancelButtonLabel={'Cancelar'}
            >
                <ContainerSaveModal>
                    <TextSaveModal>
                        Dê um título à sua anotação antes de prosseguir.
                    </TextSaveModal>
                    <InputTitle
                        ref={refInputTitle}
                        type={'text'}
                        name={'title-annotation'}
                        defaultValue={titleAnnotation}
                        onChange={({ target: { value } }) => setTitleAnnotation(value)}
                        placeholder={'Escreva o título aqui'}
                    />
                </ContainerSaveModal>
            </ModalComplex>
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => setAlertModalVisible(false)}
                title={'OPS!'}
                description={'Não é possível adicionar uma anotação vazia, por favor preencha e tente novamente.'}
                confirmButtonLabel={'Voltar'}
                uniqueFooterButton={true}
                icon={<FiAlertCircle />}
            />
        </Fragment>
    ) : <Redirect to={'/audit/profile-auditor'} />;
}

export default inject('AuditProfileAuditorStore')(observer(AuditPendingViewAnnotations));

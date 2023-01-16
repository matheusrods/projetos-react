import { inject, observer } from 'mobx-react';
import React, { Fragment, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiCornerUpLeft,
    FiXSquare
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {
    CompanyHeader,
    InputDefault,
    NextButton
} from '../../../../../../components/atoms';
import { ModalComplex } from '../../../../../../components/molecules';
import { Header } from '../../../../../../components/organisms';
import {
    Container,
    Content,
    Title,
    ContainerTextArea,
    Description,
    ContainerCanvas,
    ContainerButtons,
    ClearButton,
    UndoButton,
    ContainerNameInput
} from './styles';

function AuditSignatures({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const refCanvas = useRef(null);

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [numberOfSignatures] = useState(parseInt(history.location.state?.numberOfSignatures) ?? 0);

    const { setSignature, signaturesAudit } = AuditProfileAuditorStore;

    const handleSubmit = () => {
        try {
            if (!name || isCanvasEmpty() === null) {
                setAlertModalVisible(true);
                return;
            }

            setSignature({
                nome: name,
                assinatura: isCanvasEmpty()
            });

            setSuccessModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextSignature = () => {
        setName('');
        refCanvas.current.clear();

        if (signaturesAudit.length === numberOfSignatures) {
            history.goBack();
        }
    };

    const isCanvasEmpty = () => {
        const canvas = refCanvas?.current?.getSaveData();
        const objCanvas = JSON.parse(canvas);

        if (objCanvas.lines.length) {
            return refCanvas.current.canvas.drawing.toDataURL();
        }

        return null;
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    onClose={history.goBack}
                    typeAction={'Auditoria em andamento'}
                />
                <Content>
                    <Title>Assinatura Digital</Title>
                    <ContainerNameInput>
                        <InputDefault
                            type={'text'}
                            name={'name'}
                            placeholder={'Nome do auditado'}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                            flexDirection={'column'}
                        />
                    </ContainerNameInput>
                    <ContainerTextArea>
                        <Description>
                            Faça a sua assinatura como em seu documento.
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
                                <FiCornerUpLeft fontSize={16} /> Limpar último{' '}
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
                    nextLabel="Estou ciente da auditoria"
                    onBack={history.goBack}
                    onNext={handleSubmit}
                />
            </Container>
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
            ></ModalComplex>
            <ModalComplex
                nameModal={'success-modal'}
                visible={successModalVisible}
                onConfirm={() => {
                    handleNextSignature();
                    setSuccessModalVisible(false);
                }}
                onCancel={() => {
                    handleNextSignature();
                    setSuccessModalVisible(false);
                }}
                title={'Ótimo!'}
                description={`Sua assinatura está salva até que todos assinem e assim possa ser concluída a auditoria`}
                confirmButtonLabel={'Próximo'}
                icon={<FiCheckCircle color={'#00B247'} />}
                uniqueFooterButton={true}
            ></ModalComplex>
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore')(observer(AuditSignatures));

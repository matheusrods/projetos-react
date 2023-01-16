import React, { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
    Paragraph,
    QrCodeWrapper,
    Wrapper,
    InfoParagraph,
    InfoTitle,
    Line,
    WrapperInfo
} from './styles';
import { useLocation } from 'react-router-dom';
import { Input } from '../../../../../components/atoms';
import { Form } from '@unform/web';
import qrcodeicon from '../../../../../assets/images/icons/qr-code.svg';
import { QrCodeReader } from '../../../../../components/organisms';

const IndexQuestionInspection = ({ InspectionQuestionsStore }) => {
    const location = useLocation();
    const formRef = useRef(null);
    const [openQrCode, setOpenQrCode] = useState(false);

    const {
        equipmentCode,
        setEquipmentCode,
        setNextAction,
        setBackStep,
        setLabelNextStep,
        inspection,
        setSelectedForm,
        setTitle,
        updateInspection,
        setNextDisabled,
    } = InspectionQuestionsStore;

    const handleOpenQrCode = () => {
        setOpenQrCode(true);
    }
    const setNextActionInspection = () => {
        if(inspection.forms.length === 1){
            setLabelNextStep('Iniciar Inspeção');
            setSelectedForm(inspection.forms[0].id);
            setNextAction(() => {
                updateInspection({
                    codigo: inspection.id,
                    codigo_equipamentos_inspecao: equipmentCode,
                    codigo_status_inspecao: 2,
                }, 'question', 'Inspeção iniciada!');
            });
        }else{
            setLabelNextStep('Selecionar Formulário');
            setNextAction(() => {
                updateInspection({
                    codigo: inspection.id,
                    codigo_equipamentos_inspecao: equipmentCode,
                    codigo_status_inspecao: 2,
                }, 'form', 'Inspeção iniciada!');
            });
        }
    }

    useEffect(() => {
        setNextDisabled(false);
        setBackStep(null);
        setTitle(inspection.typeName);
        setNextActionInspection();

        return () => {
            setBackStep('index');
        }
    }, [
        setNextAction,
        setBackStep,
        inspection,
        setTitle,
        setNextDisabled,
        setNextActionInspection
    ]);

    return (
        <Container key={location.key}>
            <Paragraph>Coloque as informações solicitadas abaixo para iniciar a inspeção</Paragraph>
            <Form
                id={"form"}
                ref={formRef}
                initialData={[]}
            >
                <Wrapper>
                    <Input
                        name="code"
                        label="CÓDIGO DO EQUIPAMENTO"
                        placeholder="Digite o código do equipamento"
                        value={equipmentCode}
                        onChange={(e) => setEquipmentCode(e.target.value)}
                    />
                </Wrapper>
            </Form>
            <QrCodeWrapper>
                <div onClick={() => handleOpenQrCode()}>
                    <img src={qrcodeicon} alt={''}/>
                    <p>Ler QR-Code</p>
                </div>
            </QrCodeWrapper>

            {(inspection.equipmentCode || equipmentCode) &&
                <>
                    <WrapperInfo>
                        <InfoTitle>CÓDIGO DO EQUIPAMENTO</InfoTitle>
                        <InfoParagraph>{inspection.equipmentCode || equipmentCode}</InfoParagraph>
                    </WrapperInfo>
                    <Line />
                </>
            }

            <WrapperInfo>
                <InfoTitle>TIPO DE INSPEÇÃO</InfoTitle>
                <InfoParagraph>{inspection.typeName}</InfoParagraph>
            </WrapperInfo>
            <Line />

            <WrapperInfo>
                <InfoTitle>NOME DA INSPEÇÃO</InfoTitle>
                <InfoParagraph>{inspection.name}</InfoParagraph>
            </WrapperInfo>
            <Line />

            <WrapperInfo>
                <InfoTitle>FOMULÁRIO</InfoTitle>
                {inspection.forms.map((form, index) => (
                    <InfoParagraph key={index}>{form.name} - Periodicidade: {form.frequency}</InfoParagraph>
                ))}
            </WrapperInfo>
            <Line />

            <WrapperInfo>
                <InfoTitle>TIPO/ÁREA DE INSPEÇÃO</InfoTitle>
                {inspection.process.map((process, index) => (
                    <InfoParagraph key={index}>{process.name}</InfoParagraph>
                ))}
            </WrapperInfo>
            <Line />

            <WrapperInfo>
                <InfoTitle>RESPONSÁVEl</InfoTitle>
                <InfoParagraph>{inspection.responsibleName}</InfoParagraph>
            </WrapperInfo>


            {openQrCode &&
                <QrCodeReader
                    onClose={() => setOpenQrCode(false)}
                    onRead={(code) => {
                        setEquipmentCode(code);
                        setOpenQrCode(false);
                    }}
                />
            }

        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(IndexQuestionInspection));

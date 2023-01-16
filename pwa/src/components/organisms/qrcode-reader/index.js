import React from 'react';
import QrReader from 'react-qr-scanner'

import {
    Container,
    Content,
    Info,
    QrWrapper
} from './styles';
import { WhiteHeader } from '../../atoms';

const QrCodeReader = ({
    width = 320,
    height = 320,
    text,
    delay = 1000,
    onError,
    onRead,
    onClose = () => {},
    title = 'Leitor de QrCode'
}) => {
    const previewStyle = {
        height: height,
        width: width,
    }
    const onErrorLocal = (err) => {
        console.error(err)
    }
    const onScanLocal = (data) => {
        if (data !== null) {
            console.log(data);
            if(onRead) {
                onRead(data.text);
            }
        }
    }
    return (
        <Container>
            <WhiteHeader
                title={title}
                onClose={onClose}
            />
            <Content>

                <QrWrapper>
                    <QrReader
                        delay={delay}
                        style={previewStyle}
                        onError={onError ?? onErrorLocal}
                        onScan={onScanLocal}
                    />
                </QrWrapper>
                <Info>{text ?? 'Aponte a câmera do celular para o QR Code para efetuar a leitura.'}</Info>
            </Content>
        </Container>
    );
};

export default QrCodeReader;

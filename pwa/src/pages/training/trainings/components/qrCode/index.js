import React from 'react';

import { Column } from '../../../common';
import { QrCodeCaption, QrCodeContainer } from './styles';

const TrainingQrCode = ({ qrCodeBase64Image }) => {
    return (
        <QrCodeContainer>
            <Column>
                <img
                    src={qrCodeBase64Image}
                    width={140}
                    height={140}
                    alt="qrCode"
                />

                <QrCodeCaption>Meus treinamentos</QrCodeCaption>
            </Column>
        </QrCodeContainer>
    );
};

export default TrainingQrCode;

import React, { useMemo } from 'react';

import useTrainings from './useTrainings';
import styles from './styles';
import { Title, Container, TrainingModal } from '../common';
import { FloatingActionButton, Loading } from '../../../components/atoms';

import {
    TrainingQrCode,
    TrainingTabs,
    TrainingDetailsPage
} from './components';

const Trainings = () => {
    const {
        visible,
        treinamentos,
        qrCodeBase64Image,
        modalView,
        setmodalView,
        details,
        setdetails,
        getTreinamentosRequest: { success }
    } = useTrainings();

    const views = useMemo(
        () => ({
            qrCode: <TrainingQrCode qrCodeBase64Image={qrCodeBase64Image} />,
            details: (
                <TrainingDetailsPage
                    details={details}
                    onClose={() => setdetails(undefined)}
                />
            )
        }),
        [details, qrCodeBase64Image, setdetails]
    );

    if (!success) return <Loading label="Carregando treinamentos" />;

    return (
        <>
            <Container>
                <Title>Treinamentos</Title>
            </Container>

            <TrainingTabs treinamentos={treinamentos} onClick={setdetails} />

            <Container>
                <FloatingActionButton
                    onClick={() => setmodalView('qrCode')}
                    size={21}
                    {...styles.qrcodeIcon}
                />
            </Container>

            <TrainingModal
                visible={visible}
                title={`Siemens`}
                subtitle={`Treinamentos`}
                onClick={() => setmodalView('')}
            >
                {views[modalView]}
            </TrainingModal>
        </>
    );
};

export default Trainings;

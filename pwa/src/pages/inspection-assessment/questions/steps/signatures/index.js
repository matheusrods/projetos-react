import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container
} from './styles';
import { useLocation } from 'react-router-dom';
import {Signatures} from "../../../../../components/organisms";


const SignaturesInspection = ({ InspectionQuestionsStore }) => {
    const location = useLocation();
    const [signatures, setSignatures] = useState([]);
    const {
        setLabelNextStep,
        backAction,
        setStep,
        uploadSignature,
        inspection,
    } = InspectionQuestionsStore;

    const sendSignatures = async () => {
        for (const signature of signatures) {
            const dataSignature = {
                "codigo_inspecao": inspection.id,
                "responsavel": signature.name,
                "foto": signature.signature
            };
            await uploadSignature(dataSignature);
        }

        setStep('actions');
    };

    useEffect(() => {
        setLabelNextStep('Salvar assinaturas');
    }, [setLabelNextStep]);

    return (
        <Container key={location.key}>
            <Signatures
                signatures={signatures}
                setSignatures={setSignatures}
                subHeaderLabel="Inspeção em andamento"
                onClose={() => backAction()}
                backAction={() => backAction()}
                onSignature={() => sendSignatures()}
            />
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(SignaturesInspection));

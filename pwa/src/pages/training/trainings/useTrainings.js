import { useContext, useEffect, useState } from 'react';

import { TrainingContext } from '../context';
import { getTrainings } from './actions';

const useTrainings = () => {
    const { trainings, fetch } = useContext(TrainingContext);

    const [visible, setvisible] = useState(false);
    const [modalView, setmodalView] = useState('');
    const [details, setdetails] = useState(undefined);

    useEffect(() => {
        fetch(getTrainings());
    }, [fetch]);

    useEffect(() => {
        setvisible(!!modalView);
    }, [modalView]);

    useEffect(() => {
        setmodalView(details ? 'details' : '');
    }, [details]);

    const qrCodeBase64Image = String(
        `data:image/png;base64,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`
    );

    return {
        visible,
        modalView,
        setmodalView,
        setdetails,
        details,
        qrCodeBase64Image,
        ...trainings
    };
};

export default useTrainings;

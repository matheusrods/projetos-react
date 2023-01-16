import { useCallback, useContext, useState } from 'react';

import { TrainingContext } from '../../../../../context';
import { patchTraining } from '../../../../actions';

const useProof = (treinamento) => {
    const { fetch } = useContext(TrainingContext);

    const [pictures, setPictures] = useState([]);
    const [openModalPhotos, setOpenModalPhotos] = useState(false);

    const onSubmit = useCallback(() => {
        fetch(patchTraining({ ...treinamento, comprovantes: pictures }));
    }, [fetch, treinamento, pictures]);

    return {
        onSubmit,
        pictures,
        setPictures,
        openModalPhotos,
        setOpenModalPhotos
    };
};

export default useProof;

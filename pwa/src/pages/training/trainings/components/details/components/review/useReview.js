import { useCallback, useContext, useState } from 'react';

import { TrainingContext } from '../../../../../context';
import { patchTraining } from '../../../../actions';

const useReview = (treinamento) => {
    const [rating, setrating] = useState(undefined);

    const { fetch } = useContext(TrainingContext);

    const onSubmit = useCallback(() => {
        fetch(
            patchTraining({
                ...treinamento,
                avaliacao: rating,
                status: 3
            })
        );
    }, [fetch, treinamento, rating]);

    return { rating, setrating, onSubmit };
};

export default useReview;

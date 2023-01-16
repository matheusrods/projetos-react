import React from 'react';

import { Loading } from '../../../../../components/atoms';
import { MainContainer, TrainingProofs } from './components';
import useDetails from './useDetails';
import {
    TrainingDetailsWarning,
    TrainingList,
    TrainingReview
} from './components';

const TrainingDetailsPage = ({ details, onClose }) => {
    const {
        data,
        showQuestions,
        setshowQuestions,
        showProofs,
        setshowProofs,
        pending,
        modal,
        setmodal
    } = useDetails(details, onClose);

    if (pending)
        return (
            <Loading
                label="Realizando Inscrição"
                caption="Por favor, aguarde."
            />
        );

    return (
        <>
            {details?.turma?.treinamento && (
                <MainContainer paddingBottom={details.status === 3 && '186px'}>
                    {showQuestions && (
                        <TrainingReview
                            details={details}
                            onBack={() => setshowQuestions(false)}
                        />
                    )}

                    {showProofs && (
                        <TrainingProofs
                            details={details}
                            onBack={() => setshowProofs(false)}
                        />
                    )}

                    {!showQuestions && !showProofs && (
                        <TrainingList details={details} {...data} />
                    )}
                </MainContainer>
            )}

            <TrainingDetailsWarning
                handleModal={setmodal}
                onModalConfirm={data.onModalConfirm}
                {...modal}
            />
        </>
    );
};

export default TrainingDetailsPage;

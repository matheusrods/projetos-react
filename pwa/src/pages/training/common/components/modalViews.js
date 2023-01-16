import React, { useMemo } from 'react';

import { TrainingResults, WizardForm } from '..';

const ModalViews = ({
    selected,
    onSubmit,
    patchProvaRequest,
    result,
    onClose,
    reset,
    setreset,
    modalView,
    ...rest
}) => {
    const views = useMemo(
        () => ({
            questions: (
                <WizardForm
                    questionario={selected}
                    onSubmit={onSubmit}
                    pending={patchProvaRequest.pending}
                    success={patchProvaRequest.success}
                    reset={reset}
                />
            ),
            results: (
                <TrainingResults
                    result={result}
                    onClose={onClose}
                    onReset={() => setreset(true)}
                />
            ),
            ...rest
        }),
        [
            selected,
            onSubmit,
            patchProvaRequest,
            result,
            onClose,
            reset,
            setreset,
            rest
        ]
    );

    return views[modalView] || <></>;
};

export default ModalViews;

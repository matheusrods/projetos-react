import { useCallback, useEffect, useState } from 'react';

const useWizard = (questoes, reset) => {
    const [step, setstep] = useState(0);
    const [finish, setfinish] = useState(false);
    const [edit, setedit] = useState(false);
    const [answers, setanswers] = useState();
    const [nextLabel, setnextLabel] = useState('Avançar');

    const handleEdit = useCallback((value) => {
        setstep(value);
        setedit(true);
    }, []);

    const handleBack = useCallback(() => {
        if (step && !edit) setstep(step - 1);
    }, [step, edit]);

    const handleNext = useCallback(() => {
        if (edit) setedit(false);

        if (step === 3) setfinish(true);
        else setstep(step + 1);
    }, [step, edit]);

    const handleFormData = useCallback((questoes) => {
        setanswers(
            questoes?.reduce((acc, b, c) => {
                acc[c + 1] = { radioButton: undefined };

                return acc;
            }, {})
        );
    }, []);

    const onReset = useCallback(() => {
        handleFormData(questoes);
        setedit(false);
        setfinish(false);
        setstep(0);
    }, [handleFormData, questoes]);

    useEffect(() => {
        const handleLabel = () => {
            if (edit) return 'Salvar';

            return step === 3 ? 'Concluir' : 'Avançar';
        };

        setnextLabel(handleLabel());
    }, [step, edit]);

    useEffect(() => {
        if (questoes) handleFormData(questoes);
    }, [questoes, handleFormData]);

    useEffect(() => {
        if (reset) onReset();
    }, [reset, onReset]);

    return {
        step,
        handleNext,
        answers,
        setanswers,
        finish,
        handleEdit,
        edit,
        handleBack,
        nextLabel,
        setstep,
        onReset
    };
};

export default useWizard;

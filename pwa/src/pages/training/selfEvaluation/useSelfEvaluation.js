import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import { toast } from 'react-toastify';

import { stores } from '../../../mobx';
import { TrainingContext } from '..';
import { getEvaluations, getFilters, patchEvaluation } from './actions';
import { handleDate } from '../common';

const useSelfEvaluation = () => {
    const {
        fetch,
        resume: {
            filtros,
            getAvaliacoesRequest,
            avaliacoes,
            patchAvaliacoesRequest
        }
    } = useContext(TrainingContext);

    const {
        TrainingResumeStore: { resetPatchAvaliacoesRequest }
    } = useObserver(() => stores);

    const formRef = useRef();

    const [visible, setvisible] = useState(false);
    const [formData, setformData] = useState();
    const [selected, setselected] = useState(undefined);
    const [modalView, setmodalView] = useState('');

    const handleFormData = useCallback(() => {
        setformData({
            ...filtros,
            initialDate: [{ name: 'initialDate', id: 'initialDate' }],
            endDate: [{ name: 'endDate', id: 'endDate' }]
        });
    }, [filtros]);

    const onGetEvaluations = useCallback(
        (competencias = '[]', status = '[]', periodo = '[]') => {
            fetch(getEvaluations(competencias, status, periodo));
        },
        [fetch]
    );

    const onFilterSubmit = useCallback(
        ({ competencias, status, initialDate, endDate }) => {
            onGetEvaluations(
                competencias || '[]',
                status || '[]',
                `[${handleDate(initialDate)}, ${handleDate(endDate)}]`
            );
        },
        [onGetEvaluations]
    );

    const onTrainingSubmit = useCallback(
        async (values) => {
            await fetch(patchEvaluation(values, selected.codigo));
        },
        [selected, fetch]
    );

    const onReset = useCallback(() => {
        handleFormData();
    }, [handleFormData]);

    useEffect(() => {
        if (!filtros) fetch(getFilters());
    }, [filtros, fetch]);

    useEffect(() => {
        if (filtros) handleFormData();
    }, [filtros, handleFormData]);

    useEffect(() => {
        if (formData && formRef.current)
            Object.keys(formData).map((key) =>
                formRef.current.setData({
                    [key]: JSON.stringify(
                        formData[key]
                            .filter(({ selected }) => selected)
                            .map(({ id }) => id)
                    )
                })
            );

        if (!formData && filtros && !avaliacoes.length) onGetEvaluations();
    }, [formData, filtros, onGetEvaluations, avaliacoes]);

    useEffect(() => {
        if (getAvaliacoesRequest.success) setvisible(false);
    }, [getAvaliacoesRequest]);

    useEffect(() => {
        if (patchAvaliacoesRequest.success) {
            toast.success('Avaliaçāo realizada com sucesso!');
            setvisible(false);
        }
    }, [patchAvaliacoesRequest]);

    useEffect(() => {
        if (selected) setmodalView('questions');
    }, [selected]);

    useEffect(() => {
        setvisible(!!modalView);
    }, [modalView]);

    useEffect(() => {
        if (!visible) {
            setselected(undefined);
            setmodalView('');
            resetPatchAvaliacoesRequest();
        }
    }, [visible, resetPatchAvaliacoesRequest]);

    return {
        visible,
        formData,
        setformData,
        formRef,
        onFilterSubmit,
        onTrainingSubmit,
        onReset,
        avaliacoes,
        pending: !getAvaliacoesRequest.success,
        selected,
        setselected,
        modalView,
        setmodalView,
        patchAvaliacoesRequest
    };
};

export default useSelfEvaluation;

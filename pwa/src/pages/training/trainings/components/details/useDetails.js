import { useObserver } from 'mobx-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import { TrainingContext } from '../../../context';
import { stores } from '../../../../../mobx';
import { initalData, initialModal, labels } from './services';
import { patchTraining, postTraining } from '../../actions';

const useDetails = (details, onClose) => {
    const {
        TrainingsStore: { resetRequests }
    } = useObserver(() => stores);
    const {
        trainings: { patchTreinamentoRequest, postTreinamentoRequest },
        fetch
    } = useContext(TrainingContext);

    const [pending, setpending] = useState(false);
    const [showQuestions, setshowQuestions] = useState(false);
    const [showProofs, setshowProofs] = useState(false);
    const [modal, setmodal] = useState(initialModal);
    const [data, setdata] = useState(initalData);

    const onCancel = useCallback(() => {
        onClose();
        setshowQuestions(false);
        resetRequests();
    }, [onClose, resetRequests]);

    const handleData = useCallback(() => {
        if (details?.status === 1)
            return setdata({
                ...labels.page.subscription,
                onConfirm: () => fetch(postTraining({ ...details, status: 2 })),
                onCancel
            });

        if ([3, 4].indexOf(details?.status) >= 0)
            return setdata({
                ...labels.page.close,
                onConfirm: () => onCancel(),
                onCancel
            });

        if (details?.status === 2) {
            // AGUARDANDO
            if (details?.confirmado === 1)
                return setdata({
                    ...labels.page.confirm,
                    onConfirm: () =>
                        fetch(patchTraining({ ...details, confirmado: 2 })),
                    onCancel: () =>
                        setmodal({
                            description: labels.modal.confirm,
                            children: false
                        }),
                    onModalConfirm: () =>
                        fetch(
                            patchTraining({
                                ...details,
                                confirmado: 3,
                                status: 4,
                                motivo: modal.motivo
                            })
                        )
                });

            if (details?.confirmado === 2) {
                const date = moment(details.turma.data.valor);

                // Cancela a inscricao
                if (date.diff(moment(), 'minutes') > 0)
                    return setdata({
                        ...labels.page.cancel,
                        onConfirm: () =>
                            setmodal({
                                description: labels.modal.cancel,
                                children: false
                            }),
                        onModalConfirm: (motivo) =>
                            fetch(
                                patchTraining({
                                    ...details,
                                    confirmado: 3,
                                    status: 4,
                                    motivo
                                })
                            )
                    });

                if (details.comprovar && !details.comprovantes.length)
                    setdata({
                        ...labels.page.proof,
                        onConfirm: () => setshowProofs(true)
                    });
                else
                    setdata({
                        ...labels.page.perform,
                        onConfirm: () => setshowQuestions(true)
                    });
            }
        }
    }, [details, fetch, modal.motivo, onCancel]);

    useEffect(() => {
        handleData();
    }, [handleData]);

    useEffect(() => {
        setpending(
            postTreinamentoRequest.pending || patchTreinamentoRequest.pending
        );
    }, [postTreinamentoRequest, patchTreinamentoRequest]);

    useEffect(() => {
        if (postTreinamentoRequest.success || patchTreinamentoRequest.success) {
            toast.success(data.successMessage);

            onCancel();
        }
    }, [postTreinamentoRequest, patchTreinamentoRequest, onCancel, data]);

    return {
        patchTreinamentoRequest,
        data,
        pending,
        onCancel,
        modal,
        setmodal,
        showQuestions,
        setshowQuestions,
        showProofs,
        setshowProofs
    };
};

export default useDetails;

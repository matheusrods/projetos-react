import React, { useRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { TextAreaDefault } from '../../../../../../components/atoms';
import { ModalComplex } from '../../../../../../components/molecules';
import { DivisorBottomSheet } from '../../../../common';

const TrainingDetailsWarning = ({
    description,
    motivo,
    children,
    handleModal,
    onModalConfirm
}) => {
    const inputRef = useRef(null);

    return (
        <ModalComplex
            nameModal={'alert-modal-exit'}
            visible={!!description}
            onConfirm={() =>
                !children
                    ? handleModal((curModal) => ({
                          ...curModal,
                          children: true
                      }))
                    : motivo
                    ? onModalConfirm(motivo)
                    : inputRef.current?.focus()
            }
            onCancel={() =>
                handleModal({ description: '', motivo: '', children: false })
            }
            title={'Atenção'}
            description={description}
            confirmButtonLabel="SIM"
            cancelButtonLabel="Nāo"
            icon={<FiAlertCircle />}
            uniqueFooterButton={!!children}
            children={
                !!children && (
                    <DivisorBottomSheet
                        title="Motivo do cancelamento"
                        children={
                            <TextAreaDefault
                                ref={inputRef}
                                name={'justification'}
                                placeholder="Descreva aqui o motivo da recusa ou aceite"
                                value={motivo}
                                onChange={({ target }) =>
                                    handleModal((curModal) => ({
                                        ...curModal,
                                        motivo: target.value
                                    }))
                                }
                            />
                        }
                    />
                )
            }
        />
    );
};

export default TrainingDetailsWarning;

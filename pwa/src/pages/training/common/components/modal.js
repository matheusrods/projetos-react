import React from 'react';

import { Modal } from '../../selfEvaluation/styles';
import Header from './header';

const TrainingModal = ({
    visible,
    title,
    subtitle,
    onClick,
    children,
    withHeader = true
}) => {
    return (
        <Modal visible={visible}>
            {withHeader && (
                <Header title={title} subtitle={subtitle} onClick={onClick} />
            )}

            {children}
        </Modal>
    );
};

export default TrainingModal;

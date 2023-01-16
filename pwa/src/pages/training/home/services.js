import { TRAINING_STATUS } from '../../../mobx/stores/training/model';

export const handleSelfEvaluationLabels = (status) => {
    switch (status) {
        case TRAINING_STATUS.PENDING:
            return 'Auto-avaliação pendente';
        case TRAINING_STATUS.TOEXPIRE:
            return 'Auto-avaliação pendente';
        case TRAINING_STATUS.CONCLUDED:
            return 'Auto-avaliação ok';
        default:
            return 'Turmas abertas para inscrição';
    }
};

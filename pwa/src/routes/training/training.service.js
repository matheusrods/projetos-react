import {
    FaHome,
    FaUserCheck,
    FaRegIdCard,
    FaClipboardCheck
} from 'react-icons/fa';

import {
    TrainingHomePage,
    TrainingEvaluationPage,
    TrainingsPage,
    TrainingEvaluation
} from '../../pages/training';

export const trainingBaseUrl = '/training';

const bottomBarRoutes = {
    home: {
        path: '',
        component: TrainingHomePage,
        icon: <FaHome />,
        label: 'Home'
    },
    selfEvaluation: {
        path: 'auto-avaliacao',
        component: TrainingEvaluationPage,
        icon: <FaUserCheck />,
        label: 'Auto-avaliaçāo'
    },
    trainings: {
        path: 'treinamentos',
        component: TrainingsPage,
        icon: <FaRegIdCard />,
        label: 'Treinamentos'
    },
    tests: {
        path: 'provas',
        component: TrainingEvaluation,
        icon: <FaClipboardCheck />,
        label: 'Provas'
    }
};

const trainingRoutes = {
    ...bottomBarRoutes
};

export default trainingRoutes;

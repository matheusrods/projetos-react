import { useHistory, useLocation } from 'react-router-dom';

import routes, {
    trainingBaseUrl
} from '../../../routes/training/training.service';

const useTrainingLayout = () => {
    const { pathname } = useLocation();
    const { push } = useHistory();

    const items = Object.values(routes)
        .filter(({ icon }) => icon)
        .map((route) => ({
            ...route,
            onClick: () => push(`${trainingBaseUrl}/${route.path}`),
            active: !route.path
                ? pathname === `${trainingBaseUrl}`
                : pathname
                      .split(trainingBaseUrl)[1]
                      .startsWith(`/${route.path}`)
        }));

    return { items };
};

export default useTrainingLayout;

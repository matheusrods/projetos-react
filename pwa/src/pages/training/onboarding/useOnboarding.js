import { useState } from 'react';
import SwiperCore, { EffectCards, Pagination } from 'swiper';
import {
    FaBell,
    FaUserCheck,
    FaRegIdCard,
    FaClipboardCheck
} from 'react-icons/fa';

import colors from '../../../styles/colors';

const useTrainingOnboarding = () => {
    const [curSlider, setcurSlider] = useState(0);

    SwiperCore.use([EffectCards, Pagination]);

    const sliders = [
        {
            title: 'Auto-avaliação',
            icon: <FaUserCheck />,
            color: colors.blueAux,
            content:
                'Nesta área você lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum erat cursus dui feugiat accumsan. Phasellus eu magna in mi feugiat sollicitudin non et dolor. ',
            caption: 'Saiba como realizar os treinamentos e capacitações'
        },
        {
            title: 'Treinamentos',
            icon: <FaRegIdCard />,
            color: colors.environmentDangerGreen,
            content:
                'Nesta área você lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum erat cursus dui feugiat accumsan. Phasellus eu magna in mi feugiat sollicitudin non et dolor. ',
            caption: 'Saiba como realizar os treinamentos e capacitações'
        },
        {
            title: 'Provas',
            icon: <FaClipboardCheck />,
            color: colors.purpleAux,
            content:
                'Nesta área você lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum erat cursus dui feugiat accumsan. Phasellus eu magna in mi feugiat sollicitudin non et dolor. ',
            caption: 'Saiba como realizar os treinamentos e capacitações'
        },
        {
            title: 'Notificações',
            icon: <FaBell />,
            color: colors.client,
            content:
                'Nesta área você lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum erat cursus dui feugiat accumsan. Phasellus eu magna in mi feugiat sollicitudin non et dolor. ',
            caption: 'Saiba como realizar os treinamentos e capacitações'
        }
    ];

    return {
        sliders,
        curSlider,
        setcurSlider
    };
};

export default useTrainingOnboarding;

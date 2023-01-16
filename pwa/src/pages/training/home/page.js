import React, { useContext } from 'react';
import {
    FaUserCheck,
    FaRegIdCard,
    FaClipboardCheck,
    FaInfo
} from 'react-icons/fa';

import { SmallCard } from '../../../components/atoms';
import colors from '../../../styles/colors';
// import { handleSelfEvaluationLabels } from './home.services';
import routes, {
    trainingBaseUrl
} from '../../../routes/training/training.service';
import { Container, Title } from '../common/styles';
import { InfoContainer } from '../../../components/molecules';
import { TrainingContext } from '..';

const Home = () => {
    const {
        home: {
            resumo,
            getResumoRequest: { pending }
        }
    } = useContext(TrainingContext);

    const cards = {
        avaliacoes: {
            icon: <FaUserCheck size={24} />,
            strongLabel: 'Auto-avaliação pendente',
            seeNowLabel: 'Ver agora',
            color: colors.blueAux,
            link: `${trainingBaseUrl}/${routes.selfEvaluation.path}`
        },
        treinamentos: {
            icon: <FaRegIdCard size={24} />,
            strongLabel: 'Auto-avaliação pendente',
            seeNowLabel: 'Ver agora',
            color: colors.environmentDangerGreen,
            link: `${trainingBaseUrl}/trainings`
        },
        testes: {
            icon: <FaClipboardCheck size={24} />,
            strongLabel: 'Treinamentos pendentes',
            seeNowLabel: 'Ver agora',
            color: colors.purpleAux,
            link: `${trainingBaseUrl}/tests`
        }
    };

    return (
        <Container>
            {pending && <p>Loading</p>}

            <Title>Treinamentos e Competências</Title>

            {Object.keys(resumo).map((key) => (
                <SmallCard
                    key={key}
                    color={cards[key].color}
                    link={cards[key].link}
                    strongLabel={cards[key].strongLabel}
                    seeNowLabel={cards[key].seeNowLabel}
                    icon={() => cards[key].icon}
                />
            ))}

            <InfoContainer
                icon={<FaInfo size={30} />}
                text="Não há pendências. Aproveite para navegar pelos treinamentos
                    disponíveis e aumentar ainda mais os seus conhecimentos."
            />
        </Container>
    );
};

export default Home;

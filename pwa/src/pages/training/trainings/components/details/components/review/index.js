import React from 'react';
import { FaCheck } from 'react-icons/fa';

import { Divisor, NextButton } from '../../../../../../../components/atoms';
import TrainingRating from '../rating';
import { Caption, Subtitle, Title } from '../styles';
import useRatingQuestions from './useReview';

const TrainingReview = ({ details, onBack }) => {
    const { rating, setrating, onSubmit } = useRatingQuestions(details);

    return (
        <>
            <Subtitle>Avaliação de reação</Subtitle>

            <Caption>Treinamento</Caption>
            <Title>{details.turma.treinamento.nome.valor}</Title>

            <Divisor margin={`16px 0`} />

            {details.turma.treinamento.perguntas.map((pergunta) => (
                <TrainingRating
                    key={pergunta.codigo}
                    {...pergunta}
                    value={rating?.[pergunta.codigo] ?? ''}
                    onChange={setrating}
                />
            ))}

            <NextButton
                style={{ left: 0 }}
                icon={<FaCheck />}
                positionRelative={false}
                nextDisabled={false}
                onBack={onBack}
                onNext={onSubmit}
                nextLabel={'Concluir'}
            />
        </>
    );
};

export default TrainingReview;

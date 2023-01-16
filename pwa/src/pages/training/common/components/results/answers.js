import React from 'react';

import { Divisor } from '../../../../../components/atoms';
import { Row } from '../../styles';
import {
    IconCheck,
    IconTimes,
    Question,
    Answer,
    RowContainer,
    AnswersContainer,
    Title
} from './styles';

const ResultAnswers = ({ pr }) => {
    return (
        <AnswersContainer>
            <Title>Respostas</Title>

            {pr.map(({ pergunta, resposta, isCorrect, rightAnswer }) => (
                <RowContainer key={pergunta}>
                    <Row>
                        <div>
                            <Question>{pergunta}</Question>
                            <Answer correct={isCorrect}>{resposta}</Answer>
                            {!isCorrect && (
                                <Answer correct={true}>
                                    {`${rightAnswer} - Resposta correta`}
                                </Answer>
                            )}
                        </div>

                        {isCorrect ? (
                            <IconCheck size={26} />
                        ) : (
                            <IconTimes size={26} />
                        )}
                    </Row>

                    <Divisor />
                </RowContainer>
            ))}
        </AnswersContainer>
    );
};

export default ResultAnswers;

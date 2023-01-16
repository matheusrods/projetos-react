import React from 'react';
import { FaCheck } from 'react-icons/fa';

import { Content } from '../../../../styles';
import questionRender from '../../../../services/questionRender';
import style, { Bold, Caption, ViewContainer } from './styles';
import { NextButton } from '../../../../../../../components/atoms';

const WizardQuestions = ({
    questionario,
    step,
    handleNext,
    answers,
    setanswers,
    handleBack,
    nextLabel
}) => {
    return (
        <>
            <Content>
                <Bold>{questionario.nome}</Bold>

                <Caption>{`PASSO ${step} DE ${questionario.questoes.length}`}</Caption>

                <ViewContainer>
                    {questionRender(
                        step,
                        answers,
                        setanswers,
                        questionario,
                        () => null
                    )}
                </ViewContainer>
            </Content>

            <NextButton
                style={style.next}
                icon={step === 3 && <FaCheck />}
                positionRelative={false}
                nextDisabled={
                    !!(
                        step &&
                        answers[step]?.radioButton !== 0 &&
                        !answers[step]?.radioButton
                    )
                }
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={nextLabel}
            />
        </>
    );
};

export default WizardQuestions;

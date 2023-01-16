import React from 'react';
import _ from 'lodash';
import { FaInfo } from 'react-icons/fa';

import { QuestionDynamicForm } from '../../../../components/organisms';
import { InputRangeCriticism } from '../../../../components/atoms';
import {
    InfoContainer,
    RadioButtonGroup
} from '../../../../components/molecules';
import { Label } from '../../../../components/organisms/question-dynamic-form/styles';
import { ViewContainer } from '../styles';

const questionRender = (
    step,
    answers,
    setanswers,
    questionario,
    displayTip
) => {
    if (questionario?.questoes[step - 1]?.tipo === 'PICK')
        return (
            <QuestionDynamicForm
                title={questionario?.questoes[step - 1].pergunta}
                answer={answers[step]}
                criticalityLevels={[]}
                notSlider={true}
                withReason={false}
                openInfo={displayTip}
                hasKnowMore={true}
                onChange={(newValues) =>
                    setanswers((curAnswers) => ({
                        ...curAnswers,
                        [step]: { ...newValues }
                    }))
                }
            />
        );

    if (questionario?.questoes[step - 1]?.tipo === 'RADIO')
        return (
            <>
                <Label>{questionario?.questoes[step - 1].pergunta}</Label>

                <ViewContainer>
                    <RadioButtonGroup
                        options={questionario?.questoes[step - 1].respostas.map(
                            ({ codigo, nome }) => ({ label: nome, id: codigo })
                        )}
                        selected={answers[step].radioButton}
                        onSelect={(value) =>
                            setanswers((curAnswers) => ({
                                ...curAnswers,
                                [step]: { radioButton: value }
                            }))
                        }
                    />
                </ViewContainer>
            </>
        );

    if (questionario?.questoes[step - 1]?.tipo === 'SLIDER')
        return (
            <>
                <Label>{questionario?.questoes[step - 1].pergunta}</Label>

                <ViewContainer>
                    <InputRangeCriticism
                        backgroundColor={'#FFF'}
                        boxShadow={'none'}
                        margin={'0px 0px 15px 0px'}
                        onChange={({ criticality }) =>
                            setanswers((curAnswers) => ({
                                ...curAnswers,
                                [step]: { radioButton: criticality }
                            }))
                        }
                        criticalityLevels={[
                            {
                                id: 1,
                                name: 'Menor',
                                active: 0,
                                startValue: 0,
                                endValue:
                                    questionario?.questoes[step - 1].respostas
                                        .length - 1,
                                values: _.range(
                                    0,
                                    questionario?.questoes[step - 1].respostas
                                        .length
                                )
                            }
                        ]}
                        criticality={answers[step].radioButton || 0}
                    />
                </ViewContainer>
            </>
        );

    return (
        <InfoContainer
            icon={<FaInfo size={30} />}
            text='Você irá se auto-avaliar na categoria de Atendimento como é a sua Comunicação e lorem ipsum dolor amet. <br /><br /> Clique no botão "Avançar" para iniciar.'
        />
    );
};

export default questionRender;

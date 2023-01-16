import React, { Fragment, useEffect, useState } from 'react';
import { FaCheck, FaInfoCircle } from 'react-icons/fa';
import { RadioButton } from '../../atoms';
import {
    Container,
    Header,
    Label,
    RadioGroup,
    NotApplicable,
    Checkbox,
    TextArea,
    FieldName,
    SliderContainer,
    Slider,
    LabelCriticism,
    LevelCriticism,
    SliderHeader,
    Values,
    Value
} from './styles';

const QuestionDynamicForm = ({
    title,
    answer: { radioButton, reason, criticality },
    onChange,
    criticalityLevels,
    notSlider,
    openInfo = () => {},
    hasKnowMore = false,
    withReason = true
}) => {
    const [slider, setSlider] = useState({
        min: 1,
        max: 2,
        levels: []
    });

    useEffect(() => {
        if (!notSlider) {
            const newSlider = {
                min: 1,
                max: 2,
                levels: []
            };

            criticalityLevels.forEach((item) => {
                item.values.forEach((value) => {
                    if (value > newSlider.max) {
                        newSlider.max = value;
                    } else if (value < newSlider.min) {
                        newSlider.min = value;
                    }

                    newSlider.levels.push({
                        level: value,
                        description: item.description
                    });
                });
            });

            setSlider({ ...newSlider });
        }
    }, [criticalityLevels, notSlider]);

    const calculateFilledPercentage = () => {
        const { max, min } = slider;

        return ((criticality - min) / (max - min)) * 100;
    };

    const calculatePosition = (value) => {
        const newValue =
            ((value - slider.min) / (slider.max - slider.min)) * 100;
        const newPosition = 10 - newValue * 0.2;

        return `calc(${newValue}% + (${newPosition}px))`;
    };

    const levelCriticism = () => {
        const level = slider.levels.find((item) => item.level === criticality);

        return level?.description ?? '-';
    };

    const renderLevels = () => {
        return slider.levels.map((item, index) => {
            return (
                <Value
                    key={index.toString()}
                    active={criticality === item.level}
                    position={calculatePosition(item.level)}
                    hiddenDefault={
                        !(index === slider.levels.length - 1 || index === 0)
                    }
                >
                    {item.level.toString()}
                </Value>
            );
        });
    };

    return (
        <Container>
            <Header>
                <Label>{title}</Label>
                {hasKnowMore && <FaInfoCircle onClick={() => openInfo()} />}
            </Header>
            <RadioGroup>
                <RadioButton
                    label={'Sim'}
                    onSelect={() => onChange({ radioButton: 1 })}
                    selected={radioButton === 1}
                />
                <RadioButton
                    label={'Não'}
                    onSelect={() => onChange({ radioButton: 0 })}
                    selected={radioButton === 0}
                />
            </RadioGroup>
            <NotApplicable
                onClick={() =>
                    onChange({
                        radioButton: 3,
                        criticality: slider.min,
                        reason: ''
                    })
                }
            >
                <Checkbox active={radioButton === 3}>
                    <FaCheck />
                </Checkbox>
                Não se aplica
            </NotApplicable>
            {radioButton === 0 && !notSlider && (
                <SliderContainer>
                    <SliderHeader>
                        <LabelCriticism>Nível de criticidade:</LabelCriticism>
                        <LevelCriticism>{levelCriticism()}</LevelCriticism>
                    </SliderHeader>
                    <Values>{renderLevels()}</Values>
                    <Slider
                        value={criticality}
                        type={'range'}
                        max={slider.max}
                        min={slider.min}
                        step={1}
                        filledPercentage={calculateFilledPercentage()}
                        onChange={(e) =>
                            onChange({ criticality: parseInt(e.target.value) })
                        }
                    />
                </SliderContainer>
            )}

            {(radioButton === 1 || radioButton === 0) && withReason && (
                <Fragment>
                    <FieldName>Motivo / Descrição</FieldName>
                    <TextArea
                        placeholder={'Descreva aqui o motivo ou descrição'}
                        onChange={(e) => onChange({ reason: e.target.value })}
                        value={reason}
                    />
                </Fragment>
            )}
        </Container>
    );
};

export default QuestionDynamicForm;

import React, { useEffect, useState } from 'react';
import {
    LabelCriticism,
    LevelCriticism,
    Slider,
    Container,
    Header,
    Value,
    Values
} from './styles';

function InputRangeCriticism({
    criticality,
    onChange,
    criticalityLevels,
    backgroundColor = ' #FFFFFF',
    boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)',
    margin = '0px'
}) {
    const [sliderValues, setSliderValues] = useState([]);
    const min = criticalityLevels[0]?.startValue;
    const max = criticalityLevels[criticalityLevels?.length - 1]?.endValue;

    const calculateFilledPercentage = () => {
        return ((criticality - min) / (max - min)) * 100;
    };

    const calculatePosition = (value) => {
        const newValue = ((value - min) / (max - min)) * 100;
        const newPosition = 10 - newValue * 0.2;

        return `calc(${newValue}% + (${newPosition}px))`;
    };

    const levelCriticism = () => {
        const level = criticalityLevels.find((item) =>
            item.values.includes(criticality)
        );

        return level?.name ?? '-';
    };

    useEffect(() => {
        const mutedCriticality = criticalityLevels?.reduce((acc, current) => {
            current?.values?.forEach((element) =>
                acc.push({
                    level: element,
                    description: current?.name
                })
            );

            return acc;
        }, []);

        setSliderValues(mutedCriticality);
    }, [criticalityLevels]);

    return (
        <Container
            backgroundColor={backgroundColor}
            boxShadow={boxShadow}
            margin={margin}
        >
            <Header>
                <LabelCriticism>Nível de criticidade:</LabelCriticism>
                <LevelCriticism>{levelCriticism()}</LevelCriticism>
            </Header>
            <Values>
                {sliderValues.map((item, index) => (
                    <Value
                        key={index}
                        active={criticality === item.level}
                        hiddenDefault={
                            !(index === sliderValues.length - 1 || index === 0)
                        }
                        position={calculatePosition(item.level)}
                    >
                        {item.level.toString()}
                    </Value>
                ))}
            </Values>
            <Slider
                value={criticality}
                type={'range'}
                max={max}
                min={min}
                step={1}
                filledPercentage={calculateFilledPercentage()}
                onChange={(e) =>
                    onChange({ criticality: parseInt(e.target.value) })
                }
            />
        </Container>
    );
}

export default InputRangeCriticism;

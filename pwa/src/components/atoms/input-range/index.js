import React, { useEffect, useState } from 'react';
import {
    LabelCriticism,
    Slider,
    Container,
    Header,
    Value,
    Values
} from './styles';

function InputRange({
    description,
    start,
    end,
    currentValue,
    onChange = (value) => {},
    backgroundColor = ' #FFFFFF',
    boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)',
    margin = '0px'
}) {
    const [values, setValues] = useState([]);
    const min = start;
    const max = end;

    const calculateFilledPercentage = () => {
        return ((currentValue - min) / (max - min)) * 100;
    };

    const calculatePosition = (value) => {
        const newValue = ((value - min) / (max - min)) * 100;
        const newPosition = 10 - newValue * 0.2;

        return `calc(${newValue}% + (${newPosition}px))`;
    };

    useEffect(() => {
        const range = [];
        for (let i = min; i <= max; i++) {
            range.push(i);
        }
        setValues(range);
    }, [min, max]);

    return (
        <Container
            backgroundColor={backgroundColor}
            boxShadow={boxShadow}
            margin={margin}
        >
            <Header>
                <LabelCriticism>{description}</LabelCriticism>
            </Header>
            <Values>
                {values.map((value) => {
                    return (
                        <Value
                            key={value}
                            active={parseInt(currentValue) === parseInt(value)}
                            position={calculatePosition(value)}
                        >
                            {value}
                        </Value>
                    )
                })}
            </Values>
            <Slider
                value={currentValue}
                type={'range'}
                max={max}
                min={min}
                step={1}
                filledPercentage={calculateFilledPercentage()}
                onChange={(e) => onChange(e.target.value)}
            />
        </Container>
    );
}

export default InputRange;

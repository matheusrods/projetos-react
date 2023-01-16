import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { FaCalendarAlt } from 'react-icons/fa';
import colors from '../../../styles/colors';
import { Error, Label, StyledInputDatePicker, Wrapper } from './styles';
import moment from '../../../config/moment';

const InputDatePickerUnForm = ({ name, label, ...rest }) => {
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [value, setValue] = useState(
        defaultValue ? moment(defaultValue)._d : null
    );

    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current.value) {
            inputRef.current.value = defaultValue
                ? moment(defaultValue).format('YYYY-MM-DD')
                : '';
        }
    }, [defaultValue]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    const handleChange = (valueSelected) => {
        inputRef.current.value = _.isDate(valueSelected)
            ? moment(valueSelected).format('YYYY-MM-DD')
            : '';
        setValue(valueSelected);
    };

    return (
        <Wrapper>
            {label && <Label>{label}</Label>}
            <input ref={inputRef} name={name} type={'hidden'} />
            <StyledInputDatePicker
                onChange={handleChange}
                name={name}
                value={value}
                locale={'pt-BR'}
                format={'dd/MM/yyyy'}
                dayPlaceholder={'dd'}
                monthPlaceholder={'mm'}
                yearPlaceholder={'aaaa'}
                calendarIcon={
                    <FaCalendarAlt color={colors.gray4_2} size={16} />
                }
                clearIcon={null}
                {...rest}
            />
            {error && <Error>{error}</Error>}
        </Wrapper>
    );
};

export default InputDatePickerUnForm;

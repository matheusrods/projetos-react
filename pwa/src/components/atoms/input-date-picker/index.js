import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import moment from '../../../config/moment';
import colors from '../../../styles/colors';
import { Label, StyledInputDatePicker, Wrapper, Error } from './styles';

const InputDatePicker = ({
    initialValue,
    onChange,
    label,
    className,
    maxDate,
    error,
    ...rest
}) => {
    const [value, setValue] = useState();

    const handleChange = (valueSelected) => {
        if (valueSelected) {
            const formattedDate = moment(valueSelected).format('YYYY-MM-DD');
            onChange && onChange(formattedDate);
        } else {
            onChange && onChange(valueSelected);
        }
        setValue(valueSelected);
    };

    useEffect(() => {
        try {
            if (initialValue) {
                setValue(moment(initialValue ?? new Date())._d);
            } else {
                setValue(initialValue);
            }
        } catch (error) {
            console.log(error);
        }
    }, [initialValue]);

    return (
        <Wrapper className={className}>
            {label && <Label>{label}</Label>}
            <StyledInputDatePicker
                onChange={handleChange}
                maxDate={maxDate}
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

export default InputDatePicker;

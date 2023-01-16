import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { FaTimes, FaRegCalendarAlt } from 'react-icons/fa';
import colors from '../../../styles/colors';

import {
    ContainerCalendarPicker,
    TextCalendarPicker,
    DropdownIcon,
    StyledCalendarPicker,
    CalendarOverlay
} from './styles';

function InputCalendarPicker({ date, dispatchDate }) {
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <ContainerCalendarPicker selected={showCalendar}>
            {showCalendar ? (
                <Fragment>
                    <StyledCalendarPicker
                        value={date}
                        onChange={dispatchDate}
                        onCalendarClose={() => setShowCalendar(false)}
                        clearIcon={<FaTimes color={colors.gray4_2} />}
                        calendarIcon={
                            <FaRegCalendarAlt color={colors.gray4_2} />
                        }
                    />
                    <CalendarOverlay
                        onClick={() => setShowCalendar(!showCalendar)}
                    />
                </Fragment>
            ) : (
                <TextCalendarPicker onClick={() => setShowCalendar(true)}>
                    {moment(date).format('MMMM')}
                    <DropdownIcon />
                </TextCalendarPicker>
            )}
        </ContainerCalendarPicker>
    );
}

export default InputCalendarPicker;

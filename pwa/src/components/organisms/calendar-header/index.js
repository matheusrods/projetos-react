import React, { useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import {
    MenuIcon,
    Container,
    Content,
    LeftHeader,
    WeekContainer,
    DaysContainer,
    WeekDaysHolder,
    DaysHolder,
    Days
} from './styles';
import { Sidebar } from '../../molecules';
import InputCalendarPicker from '../../atoms/input-calendar-picker';

const CalendarHeader = ({
    UserStore: { user },
    hiddenMobile,
    date,
    dispatchDate
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [weekDays, setWeekDays] = useState([]);
    const [weekDaysLabel, setWeekDaysLabel] = useState([]);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientY);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleSelectDay = (dayValue) => {
        if (typeof dispatchDate !== 'function') {
            return;
        }

        dispatchDate(dayValue.date.toDate());
    };

    const handleTouchEnd = () => {
        if (!date) {
            return;
        }

        if (touchStart + touchEnd > 150) {
            const weekEnd = moment(date).endOf('week');
            const newWeekBeginning = moment(weekEnd).add(1, 'day');
            dispatchDate(newWeekBeginning.toDate());
        }

        if (touchStart - touchEnd < -150) {
            const weekStart = moment(date).startOf('week');
            const newWeekEnding = moment(weekStart).subtract(1, 'day');
            dispatchDate(newWeekEnding.toDate());
        }
    };

    const handleRenderLabelAndDate = useCallback(() => {
        if (!date) {
            return;
        }

        const weekStart = moment(date).startOf('week');
        const tempWeekDays = [];
        const tempWeekDaysLabel = [];

        for (let index = 0; index <= 6; index++) {
            const mutedDay = moment(weekStart).add(index, 'days');
            const isSelectedDay = mutedDay.isSame(
                moment(date).format('YYYY-MM-DD')
            );

            const dateValue = {
                date: mutedDay,
                selected: isSelectedDay
            };

            const labelValue = {
                label: mutedDay.format('ddd')[0].toUpperCase(),
                selected: isSelectedDay
            };

            tempWeekDays.push(dateValue);
            tempWeekDaysLabel.push(labelValue);
        }

        setWeekDays(tempWeekDays);
        setWeekDaysLabel(tempWeekDaysLabel);
        setTouchStart(0);
        setTouchEnd(0);
    }, [date]);

    useEffect(() => handleRenderLabelAndDate(), [handleRenderLabelAndDate]);

    return (
        <Container hiddenMobile={hiddenMobile}>
            <Content>
                <LeftHeader>
                    <MenuIcon
                        size={25}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    />
                </LeftHeader>
                <InputCalendarPicker date={date} dispatchDate={dispatchDate} />
            </Content>
            <Sidebar
                user={user}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <WeekContainer>
                {weekDaysLabel?.map((dayLabel, index) => (
                    <WeekDaysHolder key={index} selected={dayLabel?.selected}>
                        {dayLabel?.label}
                    </WeekDaysHolder>
                ))}
            </WeekContainer>
            <DaysContainer>
                {weekDays?.map((dayValue, index) => (
                    <DaysHolder
                        key={index}
                        selected={dayValue.selected}
                        onClick={() => handleSelectDay(dayValue)}
                        onTouchStartCapture={(e) => handleTouchStart(e)}
                        onTouchEndCapture={() => handleTouchEnd()}
                        onTouchMove={(e) => handleTouchMove(e)}
                    >
                        <Days selected={dayValue.selected}>
                            {dayValue.date.format('D')}
                        </Days>
                    </DaysHolder>
                ))}
            </DaysContainer>
        </Container>
    );
};

export default inject('UserStore')(observer(CalendarHeader));

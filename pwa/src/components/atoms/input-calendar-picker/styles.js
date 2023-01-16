import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';
import DatePicker from 'react-date-picker';
import { FaCaretDown } from 'react-icons/fa';

export const ContainerCalendarPicker = styled.div`
    flex: 1;
    margin-left: 22px;

    ${(props) => {
        const { selected } = props;

        return selected
            ? css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
              `
            : null;
    }}
`;

export const CalendarOverlay = styled.div`
    width: 200px;
    height: 50px;
`;

export const StyledCalendarPicker = styled(DatePicker)`
    width: 50%;
    font-size: 14px;
    font-weight: 500;
    line-height: 32px;
    margin: 0px auto;
    * {
        outline: none;
    }
    .react-calendar {
        position: absolute;
        left: 45%;
        transform: translate(-50%, 0);
        &__tile {
            &--active {
                background: ${colors.client};
            }
            &--now {
                background: ${colors.orange2};
            }
        }
    }

    .react-date-picker {
        &__wrapper {
            padding: 10px 10px 12px 12px;
            border-radius: 3px;
            border: 1px solid ${colors.gray4_2};
        }
    }
`;

export const TextCalendarPicker = styled.p`
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    text-transform: capitalize;
    padding: 12px 6px 12px 12px;
    color: ${colors.gray4};
    cursor: pointer;
`;

export const DropdownIcon = styled(FaCaretDown)`
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 18px;
    color: ${colors.gray6};
`;

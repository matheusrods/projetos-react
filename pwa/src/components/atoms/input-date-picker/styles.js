import styled from "styled-components";
import DatePicker from "react-date-picker";
import colors from "../../../styles/colors";

export const Wrapper = styled.div`
    width: 100%;
`;

export const StyledInputDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 14px;

  * {
    outline: none;
  }
  .react-calendar {
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
      padding: 12px 6px 12px 12px;
      border-radius: 3px;
      border: 1px solid ${colors.gray4_2};
    }
  }
`;

export const Label = styled.span`
    color: ${colors.gray5};
    font-weight: 500;
    font-size: 10px;
    margin-bottom: 8px;
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const Error = styled.span`
    color: red;
    font-size: 13px;
`;

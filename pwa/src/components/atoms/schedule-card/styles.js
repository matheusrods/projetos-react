import styled from 'styled-components';
import { FaCheckCircle, FaAngleRight, FaRegClock } from 'react-icons/fa';
import colors from '../../../styles/colors';

export const Container = styled.div`
    background-color: ${(props) => props.backgroundColor ?? colors.greenLight};
    display: flex;
    padding: 16px;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
    border-left: 5px ${(props) => props.borderColor ?? colors.blue2} solid;
`;

export const FlexColumn = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`;

export const ScheduleCardText = styled.p`
    font-weight: 400;
    color: ${colors.gray6};
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 113%;
`;

export const ScheduleCardIconHolder = styled.span`
    font-size: 12px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color ?? 'grey'};
`;

export const AreaType = styled.p`
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    line-height: 96%;
    margin-bottom: 8px;
    color: ${colors.text};
`;

export const DetailsButton = styled.div`
    color: ${colors.text};
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    align-self: flex-end;
    cursor: pointer;
`;

export const CheckIcon = styled(FaCheckCircle)`
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    line-height: 32px;
    width: 20px;
    height: 20px;
    color: ${colors.blue2};
`;

export const AngleRightIcon = styled(FaAngleRight)`
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    line-height: 32px;
    width: 16px;
    height: 16px;
    color: ${colors.text};
`;

export const ClockIcon = styled(FaRegClock)`
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    line-height: 32px;
    width: 20px;
    height: 20px;
    color: ${colors.auditOrange};
`;

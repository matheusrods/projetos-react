import { rgba } from 'polished';
import styled, { css } from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.button`
    position: relative;
    width: 100%;
    background-color: #F2F6FA;
    padding: 16px;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &:before {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 3px;
        height: 64px;
        background-color: #F3818A;
        content: '';
    }

    .safety-walk-talk {
        &__id {
            font-size: 13px;
            font-weight: 500;
            line-height: 16px;
            color: #2D373C;
        }

        &__title {
            font-size: 11px;
            font-weight: 500;
            line-height: 16px;
            color: #9FA8B3;
            margin-bottom: 2px;
        }

        &__label {
            font-size: 13px;
            font-weight: 500;
            line-height: 16px;
            color: #9FA8B3;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                font-size: 16px;
                margin-right: 10px;
            }
        }

        &__status {
            ${props => props?.statusColor
            ? css`
                border: 1px solid ${props.statusColor};
                background-color: ${rgba(props.statusColor, 0.1)};
                color: ${props.statusColor};
            `
            : css`
                border: 1px solid #97DC52;
                background-color: ${rgba('#97DC52', 0.1)};
                color: #97DC52;
            `}

            border-radius: 3px;
            padding: 4px 6px;
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
        }

        &__risk-level {
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            color: #5E687D;

            display: flex;
            justify-content: center;
            align-items: center;

            &:after {
                content: '';
                margin-left: 4px;
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background-color: #FF5C69;
                display: inline-block;
            }
        }

        &__location {
            font-size: 13px;
            font-weight: 400;
            line-height: 16px;
            color: #9FA8B3;
        }

        &__location-title {
            font-size: 14px;
            font-weight: 500;
            line-height: 16px;
            color: #2D373C;
            margin-bottom: 4px;
        }

        &__avatar {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background-color: #9FA8B3;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            font-weight: 400;
            line-height: 20px;
            color: #FFFFFF;
            margin-right: 8px;

            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }

        &__user {
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            color: #5E687D;
        }

        &__date {
            font-size: 11px;
            font-weight: 400;
            line-height: 16px;
            color: #9FA8B3;
        }
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props?.justifyContent ? props.justifyContent : 'space-between'};;
    align-items: ${props => props?.alignItems ? props.alignItems : 'center'};
    text-align: left;
    width: 100%;
    padding: ${props => props?.padding ? props.padding : '0px'};
    border-bottom: ${props => props?.borderBottom ? `1px solid ${rgba('#2D373C', 0.12)}` : 'none'};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Check = styled.div`
    border-radius: 50%;
    height: 24px;
    width: 24px;
    background-color: ${(props) => props?.selected ? colors.greenAux : colors.gray2};
    border: 1px solid ${(props) => props?.selected ? colors.greenAux : '#CCD4DB'};
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        color: #FFF;
        font-size: 12px;
    }
`;

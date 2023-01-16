import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div``;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    svg {
        height: 20px;
        width: 20px;
        min-height: 20px;
        min-width: 20px;
        margin-left: 8px;
        cursor: pointer;
        color: ${colors.blueAux};
    }
`;

export const Label = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #5E687D;
    display: block;
`;

export const RadioGroup = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
`;

export const NotApplicable = styled.button`
    height: 44px;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #5E687D;
`;

export const Checkbox = styled.div`
    height: 16px;
    width: 16px;
    background: #E9EDF2;
    border: 1px solid #CCD4DB;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 10px;
        color: #FFFFFF;
        display: none;
    }

    ${props => props.active && css`
        background-color: #009999;
        border-color: #009999;

        svg {
            display: block;
        }
    `}
`;

export const FieldName = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9FA8B3;
    display: block;
    margin-bottom: 8px;
    margin-top: 16px;
`;

export const TextArea = styled.textarea`
    background: #FFFFFF;
    border: 1px solid #CCD4DB;
    border-radius: 3px;
    outline: none;
    width: 100%;
    resize: none;
    height: 88px;
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2D373C;

    &::placeholder {
        color: #CCD4DB;
    }
`;

export const SliderContainer = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 16px;
    margin-top: 8px;
`;

export const Slider = styled.input`
    height: 34px;
    width: 100%;
    appearance: none;
    overflow: hidden;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        animate: 0.2s;
        background: ${props => props?.filledPercentage ? `linear-gradient(to right, #2387AA 0%, #2387AA ${props.filledPercentage}%, #E9EDF2 ${props.filledPercentage}%, #E9EDF2 100%)` : '#E9EDF2'};
        border-radius: 3px;
    }

    &::-webkit-slider-thumb {
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        border: 5px solid #FFFFFF;
        height: 24px;
        width: 24px;
        border-radius: 24px;
        background: #2387AA;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10.5px;
    }

    &::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        animate: 0.2s;
        background: ${props => props?.filledPercentage ? `linear-gradient(to right, #2387AA 0%, #2387AA ${props.filledPercentage}%, #E9EDF2 ${props.filledPercentage}%, #E9EDF2 100%)` : '#E9EDF2'};
        border-radius: 3px;
    }

    &::-moz-range-thumb {
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        border: 5px solid #FFFFFF;
        height: 24px;
        width: 24px;
        border-radius: 24px;
        background: #2387AA;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10.5px;
    }

    &::-ms-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        animate: 0.2s;
        background: ${props => props?.filledPercentage ? `linear-gradient(to right, #2387AA 0%, #2387AA ${props.filledPercentage}%, #E9EDF2 ${props.filledPercentage}%, #E9EDF2 100%)` : '#E9EDF2'};
        border-radius: 3px;
    }

    &::-ms-thumb {
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        border: 5px solid #FFFFFF;
        height: 24px;
        width: 24px;
        border-radius: 24px;
        background: #2387AA;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10.5px;
    }
`;

export const LabelCriticism = styled.span`
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #9FA8B3;
`;

export const LevelCriticism = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2387AA;
`;

export const SliderHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    margin-bottom: 14px;
`;

export const Values = styled.div`
    display: flex;
    height: 15px;
    position: relative;
`;

export const Value = styled.span`
    position: absolute;
    bottom: -5px;
    left: ${props => props.position ?? '0%'};
    font-size: 10px;
    font-weight: 400;
    line-height: 20px;
    color: #9FA8B3;
    transform: translateX(-50%);

    ${(props) => {
        const { hiddenDefault, active } = props;

        return css`
            display: ${hiddenDefault && !active ? 'none' : 'inline'};

            ${active && css`
                color: #2387AA;
                font-weight: 500;
                font-size: 14px;
            `}
        `;
    }}
`;

import styled, { css } from "styled-components";

export const Container = styled.div`
    padding: 16px;
    margin: ${props => props.margin};
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


export const Header = styled.div`
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

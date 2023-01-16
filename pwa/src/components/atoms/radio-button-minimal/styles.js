import styled, {css} from "styled-components";
import colors from "../../../styles/colors";

export const Button = styled.button`
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 10px 12px;
    border: 0px;
    outline: none;
    background-color: transparent;
    width: 100%;
`;

export const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    height: 24px;
    width: 24px;
    min-width: 24px;
    border-radius: 24px;
    color: ${colors.white};
    margin-right: 12px;

    ${props => props?.selected
        ? css`
            background-color: ${props.colorActive ?? colors.client};

            svg {
                display: block;
            }
        `
        : css`
            background-color: ${props.colorDefault ?? '#CCD4DB'};
            border: 1px solid #CCD4DB;
            svg {
                display: none;
            }
        `
    }
`;

export const Label = styled.span`
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    color: #4F4F4F;
    @media (max-width: 400px) {
            text-align: left;
            flex: 1;
        }
`;

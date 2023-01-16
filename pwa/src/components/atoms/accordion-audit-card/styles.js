import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import colors from '../../../styles/colors';

export const Container = styled.div`
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    padding: 0 16px 16px 16px;
    line-height: 18px;
    flex-direction: column;
    margin-bottom: 8px;
    max-height: 209px;
`;

export const Title = styled.h3`
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: ${colors.textDarker};
`;

export const Text = styled.h4`
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: ${colors.gray5};
`;

export const Value = styled.h5`
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;
    color: ${colors.gray3};
`;

export const AuditLabel = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    padding-top: 9px;
    padding-bottom: 9px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const AuditHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    padding: 24px 0;
    padding-bottom: ${(props) => (props.subStatus ? '16px' : null)};
    &:before {
        content: '';
        width: 3px;
        height: 64px;
        background-color: ${(props) => {
        const { color } = props;

        if (color) {
            return color;
        }

        return colors.gray1;
    }};
        position: absolute;
        left: -16px;
        top: 0px;
    }
`;

export const AuditSubStatus = styled.div`
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    padding: 4px 6px;
    max-height: 24px;
    ${(props) => {
        const { subStatus } = props;
        if (subStatus === 'done') {
            return css`
                border: 1px solid ${colors.greenAux};
                color: ${colors.greenAux};
                background-color: ${rgba(colors.greenAux, 0.12)};
            `;
        }
        if (subStatus === 'pending') {
            return css`
                border: 1px solid ${colors.pendingOrange};
                color: ${colors.pendingOrange};
                background-color: ${rgba(colors.pendingOrange, 0.12)};
            `;
        }
    }}
`;

export const DetailsContainer = styled.div`
    color: ${colors.orange2};
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    align-self: flex-end;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DetailsLink = styled.button`
    color: inherit;
    display: block;
    margin-right: 6px;
    font-weight: inherit;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
`;

export const Footer = styled.div`
    border-top: 1px solid ${colors.grayBorder};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 0;
`;

import styled, { css } from 'styled-components';
import { rgba } from 'polished';

export const Container = styled.div`
    background-color: #F2F6FA;
    border-radius: 3px;
    padding: 16px;
`;

export const Info = styled.div`
    padding: 8px 0px;
    ${props => !(props?.noBorderBottom) && css`
        border-bottom: 1px solid ${rgba('#2D373C', 0.12)};
    `}
    display: flex;

    ${props => {
        switch (props.flexDirection) {
            case 'column':
                return css`
                    flex-direction: column;
                    padding: 0px 0px 8px;
                `;
            case 'column-padding':
                return css`
                    flex-direction: column;
                `;
            default:
                return css`
                    align-items: center;
                    justify-content: space-between;
                `;
        }
    }}
`;

export const ContainerActions = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 8px;
`;

export const Button = styled.button`
    background-color: #FAA50A;
    border-radius: 3px;
    height: 44px;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #FFFFFF;
    border: none;
    outline: none;
`;

export const IdLabel = styled.span`
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    color: #9FA8B3;
`;

export const IdValue = styled.span`
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #2D373C;
`;

export const Label = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #5E687D;
`;

export const Description = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #5E687D;
`;

export const Footer = styled.div`
    padding-top: 8px;
`;

export const User = styled.div`
    display: flex;
    gap: 8px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UserName = styled.span`
    font-size: 12px;
    font-weight: normal;
    line-height: 20px;
    color: #5E687D;
`;

export const Date = styled.span`
    font-size: 11px;
    font-weight: normal;
    line-height: 16px;
    color: #9FA8B3;
`;

export const Avatar = styled.div`
    background-color: #9FA8B3;
    color: #FFFFFF;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    line-height: 20px;
`;

export const LinkDetails = styled.button`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #FAA50A;
    background-color: transparent;
    border: none;
    outline: none;
    align-self: flex-end;
    display: flex;
    align-items: center;

    svg {
        margin-left: 4px;
    }
`;

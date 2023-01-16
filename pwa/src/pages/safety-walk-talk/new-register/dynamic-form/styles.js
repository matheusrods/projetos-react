import { rgba } from 'polished';
import styled, { css } from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100% - 76px);
    max-width: 768px;
    margin: 76px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    }
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px 16px 16px;
    overflow-y: auto;
`;

export const PageInfo = styled.div`
    margin-bottom: 24px;
`;

export const TopicTitle = styled.h1`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    color: #2D373C;
    margin-bottom: 4px;
`;

export const Steps = styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    text-transform: uppercase;
    color: #9FA8B3;
    display: block;
    margin-bottom: 2px;
`;

export const Questions =styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const NotApplicableAllQuestions = styled.button`
    cursor: pointer;
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${colors.white};
    outline: none;
    border: none;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    color: #5E687D;
    padding: 0px 16px;
    border-top: 1px solid ${rgba(colors.gray5, 0.12)};
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

export const ContainerModal = styled.div`
    width: 100%;
`;

export const TitleModal = styled.h3`
    padding: 0px 16px 16px;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid ${colors.grayBorder};
    color: ${colors.gray4};
`;

export const DescriptionModal = styled.p`
    padding: 16px 16px 0px;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.gray5};
`;

import styled from 'styled-components';
import colors from '../../../../../styles/colors';

export const Container = styled.div`
    background-color: ${colors.white};
    height: calc(100%);
    max-width: 768px;
    margin: 0px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0px 16px 40px 16px;
    overflow-y: auto;
    gap: 4px;
`;

export const Title = styled.h1`
    padding-top: 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.gray4};
`;

export const Subtitle = styled.h3`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.subText};
`;

export const BodyTitle = styled.h1`
    padding-top: 12px;
    margin-bottom: 23px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: ${colors.orange2};
    align-self: flex-end;
    border-bottom: 1px solid ${colors.orange2};
    cursor: pointer;
`;

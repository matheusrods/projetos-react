import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
    overflow-y: auto;
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 20px 16px;
    padding-top: 96px;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
`;

export const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 16px;
`;

export const Card = styled.div`
    background-color: #fff;
    border-radius: 3px;
    margin-bottom: 8px;
    border-left: 3px solid ${(props) => props.borderColor ?? 'gray'};
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 16px;
`;

export const CardTitle = styled.h2`
    font-weight: 500;
    font-size: 14px;
    color: ${colors.gray4};
`;

export const CardIcon = styled.div`
    background-color: ${colors.gray1};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-size: 20px;

    ${(props) =>
        props.rotate &&
        css`
            svg {
                transform: rotate(${props.rotate}deg);
            }
        `}
`;

export const CardContent = styled.div`
    border-bottom: 1px solid ${colors.grayBorder};
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 12px;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${colors.orange2};
    font-size: 12px;
    font-weight: 500;
    padding: 16px;

    svg {
        margin-left: 5px;
    }
`;

export const Counter = styled.div`
    background-color: ${colors.client};
    width: 25px;
    height: 22px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    margin-left: auto;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 500;
    color: inherit;
`;

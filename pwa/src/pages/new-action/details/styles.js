import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    /* height: ${props => props.type === 1 ?     window.innerHeight - 142 : window.innerHeight - 62}px; */

    background-color: ${colors.gray1};
    height: ${props => props.type === 1 ? 'calc(100% - 82px)' : '100%'};
    max-width: 768px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        height: ${props => props.type === 1 ? 'calc(100% - 82px - 76px)' : 'calc(100% - 76px)'};
        margin-top: 76px;
    }
`;

export const Content = styled.div`
    padding: 20px 16px;
    overflow-y: auto;
    align-content: baseline;
    background-color: ${colors.white};
    flex: 1;
`;

export const Description = styled.p`
    margin-bottom: 24px;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
`;

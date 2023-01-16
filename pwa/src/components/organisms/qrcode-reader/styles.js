import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: ${colors.shape};
`;

export const Content = styled.div`
    width: 100%;
    max-width: 768px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
`;
export const QrWrapper = styled.div`
    padding: 10px 30px;
    border-radius: 5px;
    background:
        linear-gradient(to right, #7BE26A 8px, transparent 5px) 0 0,
        linear-gradient(to right, #7BE26A 8px, transparent 5px) 0 100%,
        linear-gradient(to left, #7BE26A 8px, transparent 5px) 100% 0,
        linear-gradient(to left, #7BE26A 8px, transparent 5px) 100% 100%,
        linear-gradient(to bottom, #7BE26A 8px, transparent 5px) 0 0,
        linear-gradient(to bottom, #7BE26A 8px, transparent 5px) 100% 0,
        linear-gradient(to top, #7BE26A 8px, transparent 5px) 0 100%,
        linear-gradient(to top, #7BE26A 8px, transparent 5px) 100% 100%;
    background-repeat: no-repeat;
    background-size: 20px 20px;
`;

export const Info = styled.p`
    font-size: 14px;
    margin-top: 30px;
`;


import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    height: calc(100% - 132px);
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 20px 16px 20px;
    max-width: 768px;
    margin: 80px auto 0px;
    overflow-y: auto;
    gap: 24px;

    @media (min-width: 768px) {
        padding: 20px 16px;
    }
`;

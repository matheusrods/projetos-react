import styled from 'styled-components';
import colors from '../../../../styles/colors';

export const Container = styled.div`
    height: calc(100% - 222px);
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 20px 16px 20px;
    max-width: 768px;
    margin: 165px auto 0px;
    overflow-y: auto;

    @media (min-width: 768px) {
        padding: 20px 16px;
    }
`;

export const FilterActionsButton = styled.button`
    height: 48px;
    width: 48px;
    background-color: ${colors.orange2};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 60px;
    right: 15px;
    outline: none;
    border: none;
`;

export const ModalContent = styled.div`
    display: flex;
    align-self: flex-start;
    width: 100%;
    min-height: 50vh;
    flex-direction: column;
    gap: 16px;
    padding: 20px 16px 16px;
`;

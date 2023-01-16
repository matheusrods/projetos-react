import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    position: fixed;
    bottom: ${props => props?.visible ? '0px' : props?.modalHeight ? `-${props.modalHeight}px` : '-300px'};
    transition: 0.5s bottom ease-in;
    background-color: #FFFFFF;
    box-shadow: 0px -8px 24px rgba(0, 0, 0, 0.08);
    border-radius: 16px 16px 0px 0px;
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%)
`;

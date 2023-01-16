import styled from 'styled-components';

export const Container = styled.div`
    display: block;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    transition: 0.5s opacity ease-in, 0.5s visibility linear;
    visibility: ${props => props?.visible ? 'visible' : 'hidden'};
    opacity: ${props => props?.visible ? 1 : 0};
    z-index: 120;
`;

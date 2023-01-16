import styled, { css } from 'styled-components';

export const Container = styled.div`
    ${(props) =>
        props.height
            ? css`
                  height: ${props.height};
              `
            : css`
                  height: calc(100% - ${props.top ?? '76'}px);
              `}
    width: 100%;
    position: ${(props) => props.position};
    top: ${(props) => props.top ?? '76'}px;
    left: ${(props) => (props?.visible ? '0px' : '-100vw')};
    transition: 0.5s left ease-in;
    display: flex;
    flex-direction: column;
    z-index: 100;

    @media (max-width: 768px) {
        top: 0px;
        height: 100%;

        z-index: ${props => props.zIndex || 100};
    }
`;

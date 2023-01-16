import styled from 'styled-components';

import { AddPhotoButton } from '../../../../../../../components/organisms/photos/list-photo/styles';
import colors from '../../../../../../../styles/colors';
import { Font } from '../../../../../common';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: calc(100% - 86px);
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 15%;
`;

export const PhotoButton = styled(AddPhotoButton)`
    width: auto;
    padding: 26px;
`;

export const TextButton = styled(Font)`
    font-size: 14px;
    line-height: 20px;

    color: ${colors.orange2};
    flex: 1;
`;

export const CancelButton = styled.button`
    background: transparent;
    border: none;
`;

export const PhotoContainer = styled.div`
    background: url(${(props) => props.imageURL ?? ''}) black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* height: 100%; */
    /* width: 100vw; */
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: space-between; */

    /* max-width: 768px;
    margin: 0px auto; */

    /* @media (min-width: 768px) {} */
`;

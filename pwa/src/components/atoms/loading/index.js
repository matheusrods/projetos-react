import React from 'react';

import {
    LoadingContainer,
    LoadingIcon,
    LoadingTitle,
    LoadingCaption
} from './styles';

const Loading = ({ label = '', caption = '', size = 48, color }) => {
    return (
        <LoadingContainer>
            <LoadingIcon size={size} color={color} />

            <LoadingTitle>{label || 'Carregando...'}</LoadingTitle>

            <LoadingCaption>{caption}</LoadingCaption>
        </LoadingContainer>
    );
};

export default Loading;

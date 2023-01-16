import React from 'react';
import { TagContainer, Label } from './styles';

const TagStatus = ({ label, color }) => {

    return (
        <TagContainer color={color}>
            <Label>{label}</Label>
        </TagContainer>
    );
}

export default TagStatus;

import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import {
    Container,
    IconWrapper,
    Text
} from './styles';
import colors from '../../../styles/colors';

const IconMessageFull = ({
    icon,
    label,
    multiline = false,
}) => {
    return (
        <Container >
            <IconWrapper>
                {icon ?? <FaRegCheckCircle color={colors.greenAux} size={80}/>}
            </IconWrapper>
            {!multiline && <Text>{label}</Text>}
            {multiline && (
                label.map((item, index) => (
                    <Text key={index}>{item}</Text>
                ))
            )}
        </Container>
    );
};

export default IconMessageFull;

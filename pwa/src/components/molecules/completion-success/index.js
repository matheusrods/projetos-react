import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import colors from '../../../styles/colors';
import {
    Container,
    Content,
    Title,
    Subtitle,
    Description,
    IconContainer
} from './styles';

/**
 * @param {string} title
 * @param {string} description
 * @param {number} redirectTime espera um valor em milisegundos
 * @param {function} redirectTo espera uma funcao
 */

const CompletionSuccess = ({
    title,
    subtitle,
    description,
    redirectTime,
    redirectTo,
    fullscreen = false
}) => {
    useEffect(() => {
        if (typeof redirectTo !== 'function') {
            return;
        }
        const timer = setTimeout(redirectTo, redirectTime);

        return () => clearTimeout(timer);
    }, [redirectTo, redirectTime]);

    return (
        <Container fullscreen={fullscreen}>
            <Content>
                <IconContainer>
                    <FaCheck size={32} color={colors.greenAux} />
                </IconContainer>
                <Title>{title}</Title>
                {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
                <Description>{description}</Description>
            </Content>
        </Container>
    );
};

CompletionSuccess.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    redirectTime: PropTypes.number,
    redirectTo: PropTypes.func
};

export default CompletionSuccess;

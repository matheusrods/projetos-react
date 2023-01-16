import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Container, Back, Next, LoadingIcon } from './styles';

const NextButton = ({
    nextLabel,
    onNext,
    onBack,
    positionRelative,
    icon,
    nextDisabled = false,
    loading = false,
    ...rest
}) => {
    return (
        <Container positionRelative={positionRelative} {...rest}>
            <Back
                aria-label={'Voltar'}
                onClick={
                    typeof onBack === 'function'
                        ? onBack
                        : () => alert('Sem funcionalidade')
                }
            >
                <FaArrowLeft />
            </Back>
            <Next
                disabled={nextDisabled}
                onClick={
                    typeof onNext === 'function'
                        ? onNext
                        : () => alert('Sem funcionalidade')
                }
            >
                {nextLabel}
                {loading ? <LoadingIcon /> : icon ?? <FaArrowRight />}
            </Next>
        </Container>
    );
};

export default NextButton;

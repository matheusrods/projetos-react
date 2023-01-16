import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Container, Back, Next, LoadingIcon } from './styles';

const BottomNavigationButton = ({
    nextLabel,
    onNext,
    onBack,
    positionRelative,
    icon,
    nextDisabled = false,
    loading = false,
    backIcon,
    showBack = true,
}) => {
    return (
        <Container positionRelative={positionRelative}>
            {showBack && (
                <Back
                    aria-label={"Voltar"}
                    onClick={
                        typeof onBack === "function"
                            ? onBack
                            : () => alert("Sem funcionalidade")
                    }
                >
                    {backIcon ?? <FaArrowLeft />}
                </Back>
            )}

            <Next
                disabled={nextDisabled}
                onClick={
                    typeof onNext === "function"
                        ? onNext
                        : () => alert("Sem funcionalidade")
                }
            >
                {nextLabel}
                {loading ? <LoadingIcon /> : icon ?? <FaArrowRight />}
            </Next>
        </Container>
    );
};

export default BottomNavigationButton;

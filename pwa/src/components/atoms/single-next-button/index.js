import React from 'react';
import { Container, Next, LoadingIcon } from './styles';

const SingleNextButton = ({ nextLabel, onNext, icon, disabled, positionRelative, loading, ...props }) => {
    return (
        <Container positionRelative={positionRelative}>
            <Next
                disabled={disabled}
                onClick={typeof onNext === 'function'
                    ? onNext
                    : () => {}
                }
                {...props}
            >
                {nextLabel}
                {loading ? <LoadingIcon /> : icon}
            </Next>
        </Container>
    );
}

export default SingleNextButton;

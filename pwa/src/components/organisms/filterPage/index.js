import React from 'react';
import { ConfirmCancelFooter } from '..';

import { Container, CloseIcon, Header, Title, CheckIcon } from './styles';

const FilterPage = ({
    onClose,
    onSubmit,
    onReset,
    children,
    pending,
    confirmButtonType = 'button'
}) => {
    return (
        <Container>
            <Header>
                <Title>Filtrar</Title>

                <CloseIcon onClick={onClose} />
            </Header>

            {children}

            <ConfirmCancelFooter
                fixed={true}
                confirmButtonLabel={'Aplicar'}
                confirmButtonIcon={<CheckIcon />}
                cancelButtonLabel={'Limpar'}
                onConfirm={onSubmit}
                onCancel={onReset}
                confirmButtonLoading={pending}
                confirmButtonType={confirmButtonType}
            />
        </Container>
    );
};

export default FilterPage;

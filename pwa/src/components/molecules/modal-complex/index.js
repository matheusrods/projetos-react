import React, { Fragment } from 'react';
import { Backdrop, Modal } from '../../atoms';
import {
    AcceptButton,
    CancelButton,
    FooterModal,
    ModalContent,
    ModalDescription,
    ModalIconContainer,
    ModalLine,
    ModalTitle,
    LoadingIcon
} from './styles';

function ModalComplex({
    title,
    description,
    nameModal,
    visible,
    onCancel,
    onConfirm,
    icon,
    confirmButtonLabel,
    confirmButtonColor,
    confirmButtonLoading,
    cancelButtonLabel,
    uniqueFooterButton,
    children
}) {
    return (
        <Backdrop visible={visible} nameModal={nameModal} onClose={onCancel}>
            <Modal visible={visible}>
                {children
                    ?
                    <ModalContent>
                        <ModalLine />
                        {children}
                    </ModalContent>
                    :
                    <ModalContent>
                        <ModalLine />
                        <ModalIconContainer>{icon}</ModalIconContainer>
                        <ModalTitle>{title}</ModalTitle>
                        <ModalDescription>{description}</ModalDescription>
                    </ModalContent>
                }
                <FooterModal uniqueFooterButton={uniqueFooterButton}>
                    {uniqueFooterButton
                        ?
                        <AcceptButton onClick={() => onConfirm()} color={confirmButtonColor}>
                            {confirmButtonLabel}
                        </AcceptButton>
                        :
                        <Fragment>
                            <CancelButton disabled={confirmButtonLoading} onClick={() => onCancel()}>
                                {cancelButtonLabel}
                            </CancelButton>
                            <AcceptButton disabled={confirmButtonLoading} onClick={() => onConfirm()} color={confirmButtonColor}>
                                {confirmButtonLabel}
                                {confirmButtonLoading && <LoadingIcon />}
                            </AcceptButton>
                        </Fragment>
                    }
                </FooterModal>
            </Modal>
        </Backdrop>
    );
}

export default ModalComplex;

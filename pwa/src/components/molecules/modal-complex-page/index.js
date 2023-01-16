import React, { Fragment, useRef } from 'react';
import { Backdrop } from '../../atoms';
import {
    Modal,
    AcceptButton,
    CancelButton,
    FooterModal,
    ModalContent,
    ModalDescription,
    ModalIconContainer,
    ModalLine,
    ModalTitle,
    LoadingIcon,
    WrapperAlign,
    Container
} from './styles';

function ModalComplexPage({
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
    disableConfirmButton,
    cancelButtonLabel,
    uniqueFooterButton,
    children
}) {
    const modalRef = useRef(null);

    return (
        <Backdrop visible={visible} nameModal={nameModal} onClose={onCancel}>
            <Modal ref={modalRef}
                   visible={visible}
                   modalHeight={modalRef?.current ? modalRef.current.getBoundingClientRect().height : 300 }
            >
                <Container>
                    {children
                        ?
                        <ModalContent>
                            <WrapperAlign>
                                <ModalLine />
                            </WrapperAlign>
                            {children}
                        </ModalContent>
                        :
                        <ModalContent>
                            <WrapperAlign>
                                <ModalLine />
                                <ModalIconContainer>{icon}</ModalIconContainer>
                                <ModalTitle>{title}</ModalTitle>
                                <ModalDescription>{description}</ModalDescription>
                            </WrapperAlign>
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
                                <AcceptButton disabled={confirmButtonLoading || disableConfirmButton} onClick={() => onConfirm()} color={confirmButtonColor}>
                                    {confirmButtonLabel}
                                    {confirmButtonLoading && <LoadingIcon />}
                                </AcceptButton>
                            </Fragment>
                        }
                    </FooterModal>
                </Container>

            </Modal>
        </Backdrop>
    );
}

export default ModalComplexPage;

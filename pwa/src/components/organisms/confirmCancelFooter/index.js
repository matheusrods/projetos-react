import React from 'react';
import {
    ButtonsWrapper,
    CancelButton,
    ConfirmButton,
    LoadingIcon
} from './styles';

const ConfirmCancelFooter = ({
    confirmButtonLabel,
    confirmButtonIcon,
    confirmButtonType,
    confirmButtonForm,
    confirmButtonColor,
    confirmButtonDisabled,
    confirmButtonLoading,
    cancelButtonLabel,
    cancelButtonLabelColor,
    hideCancelButton,
    onCancel,
    onConfirm,
    fixed,
    inline = true
}) => {
    return (
        <ButtonsWrapper fixed={fixed} inline={inline}>
            {!hideCancelButton && (
                <CancelButton
                    disabled={confirmButtonLoading}
                    type={'button'}
                    onClick={typeof onCancel === 'function' && onCancel}
                    color={cancelButtonLabelColor}
                >
                    {cancelButtonLabel}
                </CancelButton>
            )}
            <ConfirmButton
                backgroundColor={confirmButtonColor}
                form={confirmButtonForm}
                type={confirmButtonType}
                disabled={confirmButtonDisabled || confirmButtonLoading}
                onClick={
                    typeof onConfirm === 'function' &&
                    confirmButtonType !== 'submit'
                        ? onConfirm
                        : () => {}
                }
            >
                {confirmButtonLabel}
                {confirmButtonLoading ? <LoadingIcon /> : confirmButtonIcon}
            </ConfirmButton>
        </ButtonsWrapper>
    );
};

export default ConfirmCancelFooter;

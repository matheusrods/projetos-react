import { React, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Yup from '../../../config/yup';
import { ButtonDefault, Input } from '../../../components/atoms';
import {
    Container,
    NewPasswordContainer,
    PageDescription,
    CustomForm,
    PageTitle,
} from './styles';
import AlertModal from '../alert-modal';

const NewPassword = ({ AuthStore }) => {
    const { forgotMyPassword, updatePassword, isLoading, clearForgotMyPassword } = AuthStore;

    const history = useHistory();

    const [alertModal, setAlertModal] = useState({
        visible: false,
        isError: false,
        title: '',
        message: ''
    });

    const formRef = useRef(null);

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                newPassword: Yup.string()
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'Deve conter no mínimo 8 carácteres, com pelo menos uma letra maiúscula, um número e um caractere especial.'
                    )
                    .required('O campo nova senha é obrigatório.'),
                newPasswordConfirmation: Yup.string()
                    .oneOf(
                        [Yup.ref('newPassword')],
                        'As senhas devem ser iguais.'
                    )
                    .required('O campo confirmar senha é obrigatório.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            updatePassword(data).finally(() => {
                const { messageSuccess, messageError } = AuthStore.forgotMyPassword;

                if (messageError) {
                    setAlertModal({ ...alertModal, visible: true, title: 'Erro', message: messageError, isError: true });
                } else {
                    setAlertModal({ ...alertModal, visible: true, title: 'Senha alterada', message: messageSuccess, isError: false });
                }
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }
    };

    return (
        (forgotMyPassword.userId && forgotMyPassword.valid)
            ?
            <Container>
                <NewPasswordContainer>
                    <PageTitle>Nova senha</PageTitle>
                    <PageDescription>
                        A senha deve conter no mínimo 6 carácteres, com pelo menos
                        uma letra maiúscula, um número e um caractere especial
                    </PageDescription>
                    <CustomForm ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name={'newPassword'}
                            placeholder={'Digite a senha'}
                            label={'Nova senha'}
                            type={'password'}
                            maxLength={16}
                        />
                        <Input
                            name={'newPasswordConfirmation'}
                            placeholder={'Digite a senha'}
                            label={'Confirmar senha'}
                            type={'password'}
                            maxLength={16}
                        />
                        <ButtonDefault
                            isLoading={isLoading}
                            type={'submit'}
                            label={'Avançar'}
                        />
                    </CustomForm>
                    <ButtonDefault
                        type={'button'}
                        label={'Cancelar'}
                        theme={'secondary'}
                        onClick={() => history.push('/', { showSplash: false })}
                    />
                </NewPasswordContainer>
                <AlertModal
                    visible={alertModal.visible}
                    title={alertModal.title}
                    message={alertModal.message}
                    error={alertModal.isError}
                    icon={alertModal.isError ? <FaTimes /> : <FaCheck />}
                    buttonLabel={alertModal.isError ? 'Voltar' : 'OK, voltar ao início'}
                    onPress={() => {
                        if (alertModal.isError) {
                            setAlertModal({ ...alertModal, visible: false });
                        } else {
                            clearForgotMyPassword();
                            history.push('/', { showSplash: false });
                        }
                    }}
                />
            </Container>
            :
            <Redirect to={'/forgot-my-password'} />
    );
};

export default inject('AuthStore')(observer(NewPassword));

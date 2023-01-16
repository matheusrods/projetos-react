import { React, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import Yup from '../../config/yup';
import { ButtonDefault, Input } from '../../components/atoms';
import {
    Container,
    AuthContainer,
    LogoContainer,
    PageDescription,
    CustomForm,
} from './styles';

const ForgotMyPassword = ({ AuthStore }) => {
    const { isLoading, forgotMyPasswordSendEmail, clearForgotMyPassword } = AuthStore;

    const history = useHistory();

    const formRef = useRef(null);

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                user: Yup.string()
                    .required('O campo CPF é obrigatório.')
                    .isCpf('Digite um CPF válido.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            forgotMyPasswordSendEmail(data).finally(() => {
                const { messageError } = AuthStore.forgotMyPassword;

                if (messageError) {
                    formRef.current.setErrors({
                        user: messageError
                    });
                } else {
                    history.push('/forgot-my-password/send-code');
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
        <Container>
            <LogoContainer>
                <span>EHS</span>
                <span>Solutions</span>
            </LogoContainer>
            <AuthContainer>
                <PageDescription>
                    Para reiniciar sua senha, preencha seu CPF abaixo, e clique em avançar.
                </PageDescription>
                <CustomForm ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        name={'user'}
                        mask={'999.999.999-99'}
                        placeholder={'Digite seu CPF'}
                        label={'CPF'}
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
                    onClick={() => {
                        clearForgotMyPassword();
                        history.push('/', { showSplash: false });
                    }}
                />
            </AuthContainer>
        </Container>
    );
};

export default inject('AuthStore')(observer(ForgotMyPassword));

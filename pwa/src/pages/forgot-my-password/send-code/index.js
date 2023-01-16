import { React, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, useHistory } from 'react-router-dom';
import Yup from '../../../config/yup';
import { ButtonDefault, Input } from '../../../components/atoms';
import {
    Container,
    CodeContainer,
    PageDescription,
    CustomForm,
    PageTitle,
    PageMessage,
    ClickHere,
} from './styles';


const SendCode = ({ AuthStore }) => {
    const { forgotMyPassword, forgotMyPasswordValidateToken, isLoading, clearForgotMyPassword } = AuthStore;

    const history = useHistory();

    const formRef = useRef(null);

    const handleSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                code: Yup.string().required(
                    'O campo código de verificação é obrigatório.'
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            forgotMyPasswordValidateToken(data).finally(() => {
                const { messageError } = AuthStore.forgotMyPassword;

                if (messageError) {
                    formRef.current.setErrors({
                        code: messageError
                    });
                } else {
                    history.push('/forgot-my-password/new-password');
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
        forgotMyPassword.user
            ?
            <Container>
                <CodeContainer>
                    <PageTitle>Digite o código</PageTitle>
                    <PageDescription>{forgotMyPassword.message}</PageDescription>
                    <CustomForm ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name={'code'}
                            placeholder={'Digite o código'}
                            label={'Código de verificação'}
                        />
                        <PageMessage>
                            Não recebeu o código ainda? &nbsp;
                        <ClickHere onClick={() => history.goBack()}>Clique aqui</ClickHere>
                        </PageMessage>
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
                </CodeContainer>
            </Container>
            :
            <Redirect to={'/forgot-my-password'} />
    );
};

export default inject('AuthStore')(observer(SendCode));

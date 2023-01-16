import { React, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Yup from '../../config/yup';
import { Form } from '@unform/web';
import { ButtonDefault, Input } from '../../components/atoms';
import {
    Container,
    AuthContainer,
    PageTitle,
    ForgoMyPasswordLink,
    LogoContainer,
    SplashScreen,
    PoweredBy,
} from './styles';

const Login = ({ AuthStore }) => {
    const history = useHistory();

    const { showSplash = true } = history.location.state ?? {};

    const { isLoading, login, clearError, error } = AuthStore;
    const [showSplashScreen, setShowSplashScreen] = useState(showSplash);
    const [displaySplashScreen, setDisplaySplashScreen] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShowSplashScreen(false), 1500);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!showSplashScreen) {
            const timeout = setTimeout(() => setDisplaySplashScreen(false), 500);

            return () => clearTimeout(timeout);
        }
    }, [showSplashScreen]);

    const formRef = useRef(null);

    const handleSubmit = async (data, { reset }) => {
        try {
            const schema = Yup.object().shape({
                user: Yup.string()
                    .required('O campo CPF é obrigatório.')
                    .isCpf('Digite um CPF válido.'),
                password: Yup.string().required('O campo senha é obrigatório.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            login(data).finally(() => {
                const { error } = AuthStore;

                if (error) {
                    formRef.current.setErrors({
                        password: error,
                    });
                } else {
                    history.push('/want-to-see');
                }
            });
        } catch (error) {
            // Clear API errors
            clearError();

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
        <>
            <SplashScreen
                visible={showSplashScreen}
                display={displaySplashScreen ? 'true' : undefined}
            >
                <div>
                    <span>EHS</span>
                    <span>Solutions</span>
                </div>

                <PoweredBy>
                    Powered by
                    <img src={'/images/it-health.png'} alt={'ehs solutions logo'} />
                </PoweredBy>
            </SplashScreen>
            <Container>
                <LogoContainer>
                    <span>EHS</span>
                    <span>Solutions</span>
                </LogoContainer>
                <AuthContainer>
                    <PageTitle>Login</PageTitle>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name={'user'}
                            mask={'999.999.999-99'}
                            placeholder={'Digite seu CPF'}
                            label={'CPF'}
                            hasErrorExtern={error ? true : false}
                        />
                        <Input
                            name={'password'}
                            type={'password'}
                            placeholder={'Digite sua senha'}
                            label={'Senha'}
                            autoComplete={'off'}
                        />
                        <ButtonDefault
                            type={'submit'}
                            label={'Entrar'}
                            isLoading={isLoading}
                        />
                    </Form>
                    <ForgoMyPasswordLink to={'/forgot-my-password'}>
                        Esqueci minha senha
                    </ForgoMyPasswordLink>
                </AuthContainer>
            </Container>
        </>
    );
};

export default inject('AuthStore')(observer(Login));

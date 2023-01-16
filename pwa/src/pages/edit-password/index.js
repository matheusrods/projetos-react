import React, { Fragment, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';
import Yup from '../../config/yup';
import { Input, WhiteHeaderBack, SingleNextButton } from '../../components/atoms';

import { Container, Content } from './styles';
import { FaPencilAlt } from 'react-icons/fa';
import { inject, observer } from 'mobx-react';

const EditPassword = ({ AuthStore: { updateOldPassword } }) => {
    const history = useHistory();

    const formRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data, { reset }) => {
        setIsLoading(true);

        try {
            const schema = Yup.object().shape({
                currentPassword: Yup.string().required('O campo senha atual é obrigatório.'),
                newPassword: Yup.string()
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'Deve conter no mínimo 8 carácteres, com pelo menos uma letra maiúscula, um número e um caractere especial.'
                    )
                    .required('O campo nova senha é obrigatório.'),
                confirmNewPassword: Yup.string()
                    .oneOf(
                        [
                            Yup.ref('newPassword')
                        ],
                        'As senhas devem ser iguais.'
                    )
                    .required('O campo confirmar senha é obrigatório.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            formRef.current.setErrors({});

            const response = await updateOldPassword(data);

            if (response) {
                reset();
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }

        setIsLoading(false);
    }

    return (
        <Fragment>
            <WhiteHeaderBack
                title={'Editar senha'}
                onBack={() => history.goBack()}
            />
            <Container>
                <Content>
                    <Form
                        id={'form-password'}
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            name={'currentPassword'}
                            label={'Digite sua senha atual'}
                            placeholder={'******'}
                            type={'password'}
                            maxLength={16}
                        />
                        <Input
                            name={'newPassword'}
                            label={'Nova senha'}
                            placeholder={'******'}
                            type={'password'}
                            maxLength={16}
                        />
                        <Input
                            name={'confirmNewPassword'}
                            label={'Confirmar senha'}
                            placeholder={'******'}
                            type={'password'}
                            maxLength={16}
                        />
                    </Form>
                </Content>
                <SingleNextButton
                    icon={<FaPencilAlt />}
                    nextLabel={'Salvar'}
                    form={'form-password'}
                    disabled={isLoading}
                    loading={isLoading}
                    positionRelative
                />
            </Container>
        </Fragment>
    );
};

export default inject('AuthStore')(observer(EditPassword));

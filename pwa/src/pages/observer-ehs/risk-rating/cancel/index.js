import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { ConfirmCancelFooter, Header } from '../../../../components/organisms';
import { TextArea, WhiteHeader } from '../../../../components/atoms';
import { Form } from '@unform/web';
import { Container, Content } from './styles';
import { ModalComplex } from '../../../../components/molecules';
import colors from '../../../../styles/colors';
import * as Yup from 'yup';
import { deleteObservation } from '../../../../services/endpoints/observer/observations';

const RiskRatingCancel = () => {
    const history = useHistory();
    const formRef = useRef(null);
    const idObservation = history.location.state;
    const [loading, setLoading] = useState(false);
    const [
        modalConfirmCancellationVisible,
        setModalConfirmCancellationVisible
    ] = useState(false);

    const handleSubmitCancel = async () => {
        setModalConfirmCancellationVisible(false);
        setLoading(true);
        try {
            const data = formRef.current.getData();
            const schema = Yup.object().shape({
                justificativa: Yup.string().min(6).required()
            });

            await schema.validate(data, { abortEarly: false });
            await deleteObservation(idObservation, data);

            return history.push('/observer-ehs');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formRef.current.setErrors(errorMessages);
            }

            setModalConfirmCancellationVisible(false);
            setLoading(false);
        }
    };

    return (
        <>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Cancelar ação'}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <Form
                        ref={formRef}
                        id={'form'}
                        onSubmit={(data) => handleSubmitCancel(data)}
                    >
                        <TextArea
                            label={'Por que você deseja cancelar esta ação?'}
                            placeholder={'Escreva sua justificativa aqui'}
                            name={'justificativa'}
                        />
                    </Form>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={'Avançar'}
                    confirmButtonIcon={<FaCheck />}
                    cancelButtonLabel={'Voltar'}
                    cancelButtonLabelColor={colors.gray6}
                    onConfirm={() => setModalConfirmCancellationVisible(true)}
                    onCancel={() => history.goBack()}
                    confirmButtonLoading={loading}
                />
            </Container>
            <ModalComplex
                title={'Cancelamento'}
                description={
                    'Ao prosseguir, o autor da ação será notificado e poderá ou não seguir com o cancelamento. Você deseja prosseguir?'
                }
                nameModal={'confirm-cancellation '}
                visible={modalConfirmCancellationVisible}
                onCancel={() => setModalConfirmCancellationVisible(false)}
                onConfirm={() => handleSubmitCancel()}
                icon={<FaTrashAlt size={40} color={colors.redAux} />}
                confirmButtonLabel={'Sim, prosseguir'}
                confirmButtonColor={colors.redAux}
                cancelButtonLabel={'Não, voltar'}
            />
        </>
    );
};

export default RiskRatingCancel;

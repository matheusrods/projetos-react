import React from 'react';
import {
    FaRegEnvelopeOpen,
    FaRegEnvelope,
    FaTimesCircle
} from 'react-icons/fa';

import { Container, Title } from '../common/styles';
import { CardIcon, CardText, Loading } from './styles';
import { Card } from '../common/styles';
import useNotifications from './useNotifications';

const TrainingNotifications = () => {
    const {
        setselected,
        selected,
        notificacoes,
        patchNotificacoesRequest: { pending }
    } = useNotifications();

    return (
        <Container>
            <Title>Notificações</Title>

            {notificacoes
                .filter(({ persistir }) => persistir)
                .map(({ codigo, lida, descricao }) => (
                    <Card key={codigo}>
                        <CardIcon>
                            {lida ? (
                                <FaRegEnvelopeOpen size={16} />
                            ) : (
                                <FaRegEnvelope size={16} />
                            )}
                        </CardIcon>

                        <CardText
                            dangerouslySetInnerHTML={{ __html: descricao }}
                        />

                        <CardIcon onClick={() => setselected(codigo)}>
                            {pending && selected === codigo ? (
                                <Loading />
                            ) : (
                                <FaTimesCircle size={16} />
                            )}
                        </CardIcon>
                    </Card>
                ))}
        </Container>
    );
};

export default TrainingNotifications;

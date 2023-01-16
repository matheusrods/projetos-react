import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { flowResult } from 'mobx';
import { useHistory } from 'react-router';
import { AddButton } from '../../../components/atoms';
import { toast } from 'react-toastify';
import { LoadingContainer, ModalComplex } from '../../../components/molecules';
import AuditMiniCard from '../../../components/atoms/audit-mini-card';
import RadioMinimalGroup from '../../../components/molecules/radio-minimal-group';
import Header from '../../../components/organisms/header';
import NavbarFooter from '../../../components/organisms/navbarFooter';
import colors from '../../../styles/colors';

import { Container, ModalTitle, Title, ContainerModalIntern } from './styles';

const Ses = ({ UserStore, Auditing }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [modalNewAuditVisible, setModalNewAuditVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [finalValidationAudits, setFinalValidationAudits] = useState([]);
    const [inicialAudits, setInicialAudits] = useState([]);
    const [confirmedAudits, setConfirmedAudits] = useState([]);

    const { user } = UserStore || {};

    if (!user.clientId) {
        setLoading(false);
        toast.error('Código do cliente inválido');
    }

    const fetchAuditData = useCallback(async () => {
        await flowResult(
            Auditing.fetch({ codigo_unidade: user.clientId }, 'ses')
        );

        if (Auditing.state === 'done') {
            const programmings = JSON.parse(
                JSON.stringify(Auditing.programmings)
            );

            const { initial = [], final = [], confirmed = [] } = programmings;

            setInicialAudits(initial);
            setFinalValidationAudits(final);
            setConfirmedAudits(confirmed);
        }

        setLoading(false);

        if (Auditing.state === 'error') {
            toast.error(
                'Algo inesperado aconteceu, tente novamente mais tarde'
            );
        }
    }, [Auditing, user]);

    useEffect(() => fetchAuditData(), [fetchAuditData]);

    return (
        <>
            <Header />
            <Container>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <>
                        {finalValidationAudits.length > 0 ? (
                            <AuditMiniCard
                                backgroundColor={colors.white}
                                title={
                                    'Programação de Auditoria para validação final'
                                }
                                numberPendent={finalValidationAudits.length}
                                borderColor={colors.auditOrange}
                                onClick={() =>
                                    history.push(
                                        '/audit/ses/final',
                                        finalValidationAudits
                                    )
                                }
                            />
                        ) : null}
                        {inicialAudits.length > 0 ? (
                            <AuditMiniCard
                                backgroundColor={colors.white}
                                title={'Programação de Auditoria iniciada'}
                                numberPendent={inicialAudits.length}
                                borderColor={colors.auditGreen}
                                onClick={() =>
                                    history.push(
                                        '/audit/ses/started',
                                        inicialAudits
                                    )
                                }
                            />
                        ) : null}
                        {confirmedAudits.length > 0 ? (
                            <AuditMiniCard
                                backgroundColor={colors.white}
                                title={'Programação de Auditoria confirmada'}
                                numberPendent={confirmedAudits.length}
                                borderColor={colors.auditBlue}
                                onClick={() =>
                                    history.push(
                                        '/audit/ses/confirmed',
                                        confirmedAudits
                                    )
                                }
                            />
                        ) : null}
                        <AddButton
                            bottom={68}
                            position={'absolute'}
                            onClick={() => {
                                setModalNewAuditVisible(true);
                            }}
                        />
                    </>
                )}
            </Container>
            <ModalComplex
                visible={modalNewAuditVisible}
                confirmButtonLabel={'Iniciar'}
                cancelButtonLabel={'Cancelar'}
                onConfirm={() =>
                    history.push({
                        pathname: '/audit/new-audit',
                        state: { originalPage: 'ses' }
                    })
                }
                onCancel={() => setModalNewAuditVisible(false)}
            >
                <ContainerModalIntern>
                    <ModalTitle>Nova Programação de Auditoria</ModalTitle>
                    <Title>Escolha o tipo de Auditoria</Title>
                    <RadioMinimalGroup
                        options={[
                            {
                                id: 1,
                                label: 'Interna'
                            },
                            {
                                id: 2,
                                label: 'Pontual'
                            }
                        ]}
                        selected={selectedOption}
                        onSelect={(value) => setSelectedOption(() => value)}
                        flexDirection={'row'}
                        colorActive={colors.greenAux}
                        colorDefault={colors.gray2}
                    />
                </ContainerModalIntern>
            </ModalComplex>
            <NavbarFooter active={3} onClickAudit={() => history.push(`ses`)} />
        </>
    );
};

export default inject('UserStore', 'Auditing')(observer(Ses));

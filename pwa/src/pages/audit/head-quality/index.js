import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { flowResult } from 'mobx';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router';

import { AddButton } from '../../../components/atoms';
import { LoadingContainer, ModalComplex } from '../../../components/molecules';
import AuditMiniCard from '../../../components/atoms/audit-mini-card';
import RadioMinimalGroup from '../../../components/molecules/radio-minimal-group';
import Header from '../../../components/organisms/header';
import NavbarFooter from '../../../components/organisms/navbarFooter';
import colors from '../../../styles/colors';

import { Container, ModalTitle, Title, ContainerModalIntern } from './styles';

const AuditHeadQuality = ({ Auditing, UserStore }) => {
    const history = useHistory();

    const [pendingAnalysisAudits, setPendingAnalysisAudits] = useState([]);
    const [confirmedAudits, setConfirmedAudits] = useState([]);
    const [unConformitiesAudits, setUnConformitiesAudits] = useState([]);

    const [loading, setLoading] = useState(true);
    const [modalNewAuditVisible, setModalNewAuditVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);

    const { user } = UserStore || {};

    if (!user.clientId) {
        setLoading(false);
        toast.error('Código do cliente inválido');
    }

    const fetchAuditData = useCallback(async () => {
        await flowResult(
            Auditing.fetch(
                { codigo_unidade: user.clientId },
                'head-quality'
            )
        );

        if (Auditing.state === 'done') {
            const programmings = JSON.parse(JSON.stringify(Auditing.programmings));

            const { pendingAnalysis = [], confirmed = [], unConformities = [] } = programmings;

            setPendingAnalysisAudits(pendingAnalysis);
            setConfirmedAudits(confirmed);
            setUnConformitiesAudits(unConformities);
        }

        setLoading(false);

        if (Auditing.state === 'error') {
            toast.error('Algo inesperado aconteceu, tente novamente mais tarde');
        }
    }, [Auditing, user]);

    useEffect(() => fetchAuditData(), [fetchAuditData]);

    return (
        <Fragment>
            <Header />
            <Container>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Fragment>
                        {pendingAnalysisAudits.length > 0 &&
                            <AuditMiniCard
                                backgroundColor={colors.white}
                                title={'Programação de Auditoria para análise pendente'}
                                numberPendent={pendingAnalysisAudits.length}
                                borderColor={colors.auditOrange}
                                onClick={() =>
                                    history.push(
                                        '/audit/head-quality/pending-review',
                                        { pendingAnalysisAudits }
                                    )
                                }
                            />
                        }
                        {confirmedAudits.length > 0 &&
                            <AuditMiniCard
                                backgroundColor={colors.white}
                                title={'Programação de Auditoria confirmada'}
                                numberPendent={confirmedAudits.length}
                                borderColor={colors.auditBlue}
                                onClick={() =>
                                    history.push(
                                        '/audit/head-quality/confirmed',
                                        { confirmedAudits }
                                    )
                                }
                            />
                        }
                        {unConformitiesAudits.length > 0 &&
                            <AuditMiniCard
                                backgroundColor={colors.white}
                                title={'Auditorias com NC/OM'}
                                numberPendent={unConformitiesAudits.length}
                                borderColor={colors.redNC}
                                onClick={() => history.push(
                                    '/audit/head-quality/nc-om',
                                    { unConformitiesAudits }
                                )}
                            />
                        }
                        <AddButton
                            bottom={68}
                            position={'absolute'}
                            onClick={() => setModalNewAuditVisible(true)}
                        />
                    </Fragment>
                )}
            </Container>
            <ModalComplex
                nameModal={'new-audit'}
                visible={modalNewAuditVisible}
                confirmButtonLabel={'Iniciar'}
                cancelButtonLabel={'Cancelar'}
                onConfirm={() =>
                    history.push({
                        pathname: '/audit/new-audit',
                        state: { originalPage: 'hq' }
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
            <NavbarFooter
                active={3}
                onClickAudit={() => history.push('head-quality')}
            />
        </Fragment>
    );
};

export default inject('Auditing', 'UserStore')(observer(AuditHeadQuality));

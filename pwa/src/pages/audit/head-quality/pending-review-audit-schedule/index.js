import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AddButton, WhiteHeaderBack } from '../../../../components/atoms';
import AuditCard from '../../../../components/atoms/audit-card';
import { ModalComplex } from '../../../../components/molecules';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
import colors from '../../../../styles/colors';
import { FaAngleRight } from 'react-icons/fa';

import RadioMinimalGroup from '../../../../components/molecules/radio-minimal-group';
import { Container, PageTitle } from './styles';
import { ContainerModalIntern, ModalTitle, Title } from '../styles';

const AuditHeadQualityPendingReview = () => {
    const history = useHistory();

    const [modalNewAuditVisible, setModalNewAuditVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);

    const { pendingAnalysisAudits = [] } = history.location.state ?? {};

    return (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={() => history.push('/audit/head-quality')}
            />
            <Container>
                <PageTitle>
                    Programação de Auditoria aguardando análise (
                    {pendingAnalysisAudits.length})
                </PageTitle>
                {pendingAnalysisAudits.map((item) => {
                    return (
                        <AuditCard
                            key={item.id}
                            backgroundColor={colors.white}
                            title={`Área de atuação: ${item.areaDescription}`}
                            borderColor={item.statusHeadQuality.color}
                            type={item.auditableProcessesLabel}
                            textButton={'Programar'}
                            iconButton={<FaAngleRight />}
                            onClick={() =>
                                history.push(
                                    'pending-review/schedule',
                                    { auditPendingReview: item }
                                )
                            }
                        />
                    );
                })}
                <AddButton
                    bottom={68}
                    position={'absolute'}
                    onClick={() => {
                        setModalNewAuditVisible(true);
                    }}
                />
            </Container>
            <ModalComplex
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
                onClickAudit={() => history.push('/audit/head-quality')}
            />
        </>
    );
};

export default AuditHeadQualityPendingReview;

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AddButton, WhiteHeaderBack } from '../../../../components/atoms';
import AuditCard from '../../../../components/atoms/audit-card';
import { ModalComplex } from '../../../../components/molecules';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
import colors from '../../../../styles/colors';
import { FaAngleRight } from 'react-icons/fa';
import { ContainerModalIntern, ModalTitle, Title } from '../styles';
import { Container, PageTitle } from './styles';
import RadioMinimalGroup from '../../../../components/molecules/radio-minimal-group';

const AuditSesStarted = () => {
    const history = useHistory();

    const [initialAudits] = useState(history.location.state || []);
    const [modalNewAuditVisible, setModalNewAuditVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);

    return (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={() => history.push('/audit/ses')}
            />
            <Container>
                <PageTitle>
                    Programação de Auditoria iniciada ({initialAudits?.length})
                </PageTitle>
                {initialAudits.map((item) => {
                    return (
                        <AuditCard
                            key={item.id}
                            backgroundColor={colors.white}
                            title={`Área de atuação: ${item?.areaDescription}`}
                            borderColor={item?.statusSes?.color}
                            type={item?.auditableProcessesLabel}
                            textButton={'Ver Detalhes'}
                            iconButton={<FaAngleRight />}
                            onClick={() =>
                                history.push(
                                    'started/details',
                                    { startedAudit: item }
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
                onConfirm={() => history.push('/audit/new-audit')}
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
                onClickAudit={() => history.push('/audit/ses')}
            />
        </>
    );
};

export default AuditSesStarted;

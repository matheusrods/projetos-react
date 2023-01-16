import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AddButton, WhiteHeaderBack } from '../../../../components/atoms';
import AuditCard from '../../../../components/atoms/audit-card';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
import colors from '../../../../styles/colors';
import { FaAngleRight } from 'react-icons/fa';

import { Container, PageTitle } from './styles';
import { ContainerModalIntern, ModalTitle, Title } from '../styles';
import RadioMinimalGroup from '../../../../components/molecules/radio-minimal-group';

const AuditSesConfirmed = ({ AuditSesStore }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [modalNewAuditVisible, setModalNewAuditVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [confirmedAudits] = useState(history.location.state || []);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={() => history.push('/audit/ses')}
            />
            <Container>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <>
                        <PageTitle>
                            Programação de Auditoria confirmada ({confirmedAudits.length})
                        </PageTitle>
                        {confirmedAudits.map((item) => {
                            return (
                                <AuditCard
                                    key={item.id}
                                    backgroundColor={colors.white}
                                    title={`Área de atuação: ${item.areaDescription}`}
                                    borderColor={item.statusSes.color}
                                    type={item.auditableProcessesLabel}
                                    textButton={'Ver Detalhes'}
                                    iconButton={<FaAngleRight />}
                                    onClick={() =>
                                        history.push(
                                            'confirmed/details',
                                            item
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
                    </>
                )}
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

export default inject('AuditSesStore')(observer(AuditSesConfirmed));

import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, useHistory } from 'react-router';
import { AddButton, WhiteHeaderBack } from '../../../../components/atoms';
import AuditCard from '../../../../components/atoms/audit-card';
import { ModalComplex } from '../../../../components/molecules';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
import colors from '../../../../styles/colors';
import { FaAngleRight } from 'react-icons/fa';
import RadioMinimalGroup from '../../../../components/molecules/radio-minimal-group';
import { Container, PageTitle } from './styles';
import { ContainerModalIntern, ModalTitle, Title } from '../styles';

const AuditHeadQualityNCOM = ({ Auditing }) => {
    const history = useHistory();

    const { programmings = {}, setUnConformity } = Auditing;

    const [modalNewAuditVisible, setModalNewAuditVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);

    return programmings?.unConformities && programmings.unConformities.length > 0 ? (
        <>
            <WhiteHeaderBack
                title={'Auditorias com NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                <PageTitle>
                    Auditorias com NC/OM ({programmings.unConformities.length})
                </PageTitle>
                {programmings.unConformities.map((audit, index) => {
                    return (
                        <AuditCard
                            key={index}
                            backgroundColor={colors.white}
                            title={`Área de atuação: ${audit?.areaDescription}`}
                            borderColor={colors.redNC}
                            type={audit?.auditableProcessesLabel}
                            textButton={'Ver detalhes'}
                            iconButton={<FaAngleRight />}
                            onClick={() => {
                                setUnConformity(audit);

                                history.push('nc-om/details')
                            }}
                        />
                    );
                })}
                <AddButton
                    bottom={68}
                    position={'absolute'}
                    onClick={() => setModalNewAuditVisible(true)}
                />
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
                onClickAudit={() => history.push('/audit/head-quality')}
            />
        </>
    ) : <Redirect to={'/audit/head-quality'} />;
};

export default inject('Auditing')(observer(AuditHeadQualityNCOM));

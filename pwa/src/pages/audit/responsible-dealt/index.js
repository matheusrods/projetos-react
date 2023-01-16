import { flowResult } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import AccordionAudit from '../../../components/atoms/accordion-audit';
import AccordionAuditCard from '../../../components/atoms/accordion-audit-card';
import { EmptyListContainer, LoadingContainer } from '../../../components/molecules';
import Header from '../../../components/organisms/header';
import NavbarFooter from '../../../components/organisms/navbarFooter';
import colors from '../../../styles/colors';

import { Container } from './styles';

const AuditResponsibleDealt = ({ UserStore, Auditing }) => {
    const history = useHistory();

    const { user } = UserStore || {};

    const [loading, setLoading] = useState(true);
    const [unConformitiesAudits, setUnConformitiesAudits] = useState([]);

    const fetchAuditData = useCallback(async () => {
        if (!user.clientId) {
            toast.error('Código do cliente inválido');
            setLoading(false);

            return;
        }

        await flowResult(Auditing.fetch({ codigo_unidade: user.clientId, codigo_responsavel_tratativa: user.id }, 'responsible-dealt'));

        if (Auditing.state === 'done') {
            const programmings = JSON.parse(JSON.stringify(Auditing.programmings));

            const { unConformities = [] } = programmings;

            setUnConformitiesAudits(unConformities);
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
                    unConformitiesAudits.length > 0 ?
                        <AccordionAudit
                            status={'pending'}
                            label={`Tratativas de NC/OM pendentes (${unConformitiesAudits.length})`}
                            quantity={unConformitiesAudits.length}
                        >
                            {unConformitiesAudits.map((item, index) => (
                                <AccordionAuditCard
                                    borderColor={colors.auditOrange}
                                    key={index}
                                    audit={item}
                                    onClickContinue={() => {
                                        Auditing.setUnConformity(item);

                                        history.push('/audit/responsible-dealt/pending-deals');
                                    }}
                                />
                            ))}
                        </AccordionAudit>
                        : <EmptyListContainer hasBackground />
                )}
            </Container>
            <NavbarFooter
                active={3}
                onClickAudit={() => history.push('responsible-dealt')}
            />
        </>
    );
};

export default inject('UserStore', 'Auditing')(observer(AuditResponsibleDealt));

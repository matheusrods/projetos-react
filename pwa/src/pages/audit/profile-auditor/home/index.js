import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyListContainer, LoadingContainer } from '../../../../components/molecules';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
import TabHeader from '../../../../components/organisms/tab-header';
import AccordionAudit from '../../../../components/atoms/accordion-audit';
import AccordionAuditCard from '../../../../components/atoms/accordion-audit-card';
import { Container } from './styles';
import { flowResult } from 'mobx';
import { toast } from 'react-toastify';
import { inject, observer } from 'mobx-react';
import colors from '../../../../styles/colors';

function AuditorHome({ AuditProfileAuditorStore, UserStore }) {
    const history = useHistory();

    const { user } = UserStore || {};
    const { setProgrammingInEditing, setProgrammingInView } = AuditProfileAuditorStore;

    const [loading, setLoading] = useState(true);

    const [programmingsPending, setProgrammingsPending] = useState([]);
    const [programmingInProgress, setProgrammingInProgress] = useState([]);
    const [programmingInCompleted, setProgrammingInCompleted] = useState([]);
    const [auditsNc, setAuditsNc] = useState([]);
    const [auditsContested, setAuditsContested] = useState([]);

    const [tabs, setTab] = useState([
        {
            name: 'Auditorias',
            selected: true
        },
        {
            name: 'NC & OM',
            selected: false
        },
        {
            name: 'Contestações',
            selected: false
        }
    ]);

    const handleSelectTab = (index) => {
        const tempTabs = tabs.map((item) => ({ ...item, selected: false }));

        tempTabs[index].selected = true;

        setTab(tempTabs);
    };

    const handleContestedLinkClick = (audit) => {
        setProgrammingInEditing(audit);

        history.push(`/audit/profile-auditor/contestation/rating`);
    };

    const handlePendingLinkClick = (audit) => {
        setProgrammingInEditing(audit);

        history.push('/audit/profile-auditor/audit-pending');
    };

    const handleNCOMLinkClick = (audit) => {
        setProgrammingInEditing(audit);

        history.push(`/audit/profile-auditor/ncom`);
    };

    const handleProgressLinkClick = (audit) => {
        setProgrammingInEditing(audit);

        history.push('/audit/profile-auditor/start-audit/requirements-applicable');
    };

    const handleCompletedLinkClick = (audit) => {
        setProgrammingInView(audit);

        history.push('/audit/profile-auditor/audit-completed');
    };

    const fetchAuditData = useCallback(async () => {
        await flowResult(
            AuditProfileAuditorStore.fetch(user.clientId)
        );

        if (AuditProfileAuditorStore.stateFetch === 'done') {
            const programmings = AuditProfileAuditorStore.programmings;

            const {
                pending = [],
                inProgress = [],
                completed = [],
                unConformities = [],
                contestations = [],
            } = programmings

            setProgrammingsPending(pending)
            setProgrammingInProgress(inProgress)
            setProgrammingInCompleted(completed)
            setAuditsNc(unConformities)
            setAuditsContested(contestations)
        }

        setLoading(false);

        if (AuditProfileAuditorStore.stateFetch === 'error') {
            toast.error('Algo inesperado aconteceu, tente novamente mais tarde');
        }
    }, [AuditProfileAuditorStore, user]);

    useEffect(() => fetchAuditData(), [fetchAuditData]);

    if (loading) {
        return (
            <Fragment>
                <TabHeader tabs={tabs} />
                <Container>
                    <LoadingContainer />
                </Container>
                <NavbarFooter active={3} />
            </Fragment>
        );
    }

    if (tabs[1].selected) {
        return (
            <Fragment>
                <TabHeader tabs={tabs} handleSelectTab={handleSelectTab} />
                <Container>
                    {auditsNc.length > 0 ?
                        <AccordionAudit
                            status={'nc'}
                            label={`Auditorias com NC/OM (${auditsNc.length})`}
                            quantity={auditsNc.length}
                        >
                            {auditsNc.map((item, index) => (
                                <AccordionAuditCard
                                    key={index}
                                    audit={item}
                                    borderColor={colors.redNC}
                                    onClickContinue={handleNCOMLinkClick}
                                />
                            ))}
                        </AccordionAudit>
                        : <EmptyListContainer hasBackground />}
                </Container>
                <NavbarFooter active={3} />
            </Fragment>
        );
    }

    if (tabs[2].selected) {
        return (
            <Fragment>
                <TabHeader tabs={tabs} handleSelectTab={handleSelectTab} />
                <Container>
                    {auditsContested.length > 0 ?
                        <AccordionAudit
                            status={'contested'}
                            label={`Auditorias contestadas (${auditsContested.length})`}
                            quantity={auditsContested.length}
                        >
                            {auditsContested.map((item, index) => (
                                <AccordionAuditCard
                                    key={index}
                                    audit={item}
                                    borderColor={colors.contestationBlue}
                                    onClickContinue={handleContestedLinkClick}
                                />
                            ))}
                        </AccordionAudit>
                        : <EmptyListContainer hasBackground />}
                </Container>
                <NavbarFooter active={3} />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <TabHeader tabs={tabs} handleSelectTab={handleSelectTab} />
            <Container>
                {programmingsPending.length > 0 &&
                    <AccordionAudit
                        status={'pending'}
                        label={`Auditorias pendentes (${programmingsPending.length})`}
                        quantity={programmingsPending.length}
                    >
                        {programmingsPending.map((item, index) => (
                            <AccordionAuditCard
                                key={index}
                                audit={item}
                                onClickContinue={handlePendingLinkClick}
                            />
                        ))}
                    </AccordionAudit>
                }
                {programmingInProgress.length > 0 &&
                    <AccordionAudit
                        status={'inProgress'}
                        label={`Auditorias em andamento (${programmingInProgress.length})`}
                        quantity={programmingInProgress.length}
                    >
                        {programmingInProgress.map((item, index) => (
                            <AccordionAuditCard
                                key={index}
                                audit={item}
                                textButtonNext={'Continuar'}
                                onClickContinue={handleProgressLinkClick}
                            />
                        ))}
                    </AccordionAudit>
                }
                {programmingInCompleted.length > 0 &&
                    <AccordionAudit
                        status={'done'}
                        label={`Auditorias concluídas (${programmingInCompleted.length})`}
                        quantity={programmingInCompleted.length}
                    >
                        {programmingInCompleted.map((item, index) => (
                            <AccordionAuditCard
                                key={index}
                                audit={item}
                                textButtonNext={'Ver detalhes'}
                                onClickContinue={handleCompletedLinkClick}
                            />
                        ))}
                    </AccordionAudit>
                }
                {
                    programmingsPending.length === 0
                    && programmingInProgress.length === 0
                    && programmingInCompleted.length === 0
                    && <EmptyListContainer hasBackground />
                }
            </Container>
            <NavbarFooter active={3} />
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore', 'UserStore')(observer(AuditorHome));

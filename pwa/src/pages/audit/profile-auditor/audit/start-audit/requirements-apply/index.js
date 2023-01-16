import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useState } from 'react';
import { FaAngleRight, FaPenAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    Accordion,
    AuditRequirementsCard,
    CompanyHeader,
    SingleNextButton
} from '../../../../../../components/atoms';
import { FiAlertCircle } from 'react-icons/fi';
import { ModalComplex } from '../../../../../../components/molecules';
import {
    Container,
    Content,
    Title,
    ContainerCards,
    CardNCOM,
    SubCard,
    TitleSubCard,
    ItemContainer,
    ItemId,
    ItemContent,
    ItemValue,
    ItemLabel,
    TitleSubCardButton
} from './styles';
import { filterAuditableRequirements } from '../../../../../../services/transforms/audits'
import { Header } from '../../../../../../components/organisms';

function AuditPendingViewAnnotations({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInEditing = null, resetSignatures } = AuditProfileAuditorStore;

    const [requirements, setRequirements] = useState([]);
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    const handleViewDetails = (item) => {
        if (item?.submittedAudit) {
            history.push('/audit/profile-auditor/start-audit/requirements-applicable/completed/details');
        } else {
            history.push('/audit/profile-auditor/start-audit/requirements-applicable/details');
        }
    };

    const checkForUnansweredNegotiations = () => {
        const { themeDeals = [] } = programmingInEditing;

        let dealsNotValid = false;

        themeDeals.forEach(theme => {
            const { deals = [] } = theme;

            deals.forEach(dealt => {
                if (dealt.isValid === 1 && dealt.statusEvaluationDeal === 1) {
                    dealsNotValid = true;
                }
            })
        });

        return dealsNotValid;
    };

    const handleSignatures = () => {
        if (checkForUnansweredNegotiations()) {
            setAlertModalVisible(true);
        } else {
            resetSignatures();

            history.push('signatures/review');
        }
    };

    useEffect(() => {
        if (!programmingInEditing) {
            history.push('/audit/profile-auditor');
            return;
        }

        setRequirements(filterAuditableRequirements(programmingInEditing));
    }, [history, programmingInEditing]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    onClose={history.goBack}
                    typeAction={'Auditoria em andamento'}
                />
                <Content>
                    <Title>Requisitos aplicáveis</Title>
                    <ContainerCards>
                        {requirements.map((item, index) => {
                            return (
                                <AuditRequirementsCard
                                    key={index}
                                    item={item}
                                    onClick={handleViewDetails}
                                />
                            );
                        })}
                    </ContainerCards>
                    {programmingInEditing?.themeDeals?.length > 0 &&
                        <Accordion
                            label={'NC/OM anteriores'}
                            labelColor={'#F2994A'}
                            backgroundColor={'transparent'}
                            heightAuto={true}
                        >
                            <CardNCOM>
                                {programmingInEditing?.themeDeals.map(theme => (
                                    <SubCard key={theme.id}>
                                        <TitleSubCard>Requisitos {theme.title}</TitleSubCard>
                                        {theme.deals.map((deal) => (
                                            <ItemContainer key={deal.id}>
                                                <ItemId>
                                                    ID #{deal.id}
                                                </ItemId>
                                                <ItemContent>
                                                    <ItemLabel>
                                                        {deal.orderLabel}
                                                    </ItemLabel>
                                                    <ItemValue>
                                                        {deal.requirementTitle}
                                                    </ItemValue>
                                                </ItemContent>
                                            </ItemContainer>
                                        ))}
                                        <TitleSubCardButton
                                            onClick={() =>
                                                history.push('ncom-previous', {
                                                    deals: JSON.parse(JSON.stringify(theme.deals))
                                                })
                                            }
                                        >
                                            Ver detalhes <FaAngleRight />
                                        </TitleSubCardButton>
                                    </SubCard>
                                ))}
                            </CardNCOM>
                        </Accordion>
                    }
                </Content>
                <SingleNextButton
                    positionRelative={true}
                    disabled={requirements.filter(item => !item?.submittedAudit).length > 0}
                    nextLabel={'Coletar assinaturas'}
                    icon={<FaPenAlt />}
                    onNext={handleSignatures}
                />
                <ModalComplex
                    nameModal={'alert-modal'}
                    visible={alertModalVisible}
                    onConfirm={() => setAlertModalVisible(false)}
                    onCancel={() => setAlertModalVisible(false)}
                    title={'Avalie as tratativas'}
                    description={'Você precisa avaliar as tratativas de não conformidades de ciclos anteriores antes de finalizar.'}
                    confirmButtonLabel={'Avaliar'}
                    icon={<FiAlertCircle />}
                    uniqueFooterButton={true}
                />
            </Container>
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore')(observer(AuditPendingViewAnnotations));

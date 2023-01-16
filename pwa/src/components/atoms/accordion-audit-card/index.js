import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import {
    Container,
    Title,
    Text,
    Value,
    AuditLabel,
    AuditHeader,
    AuditSubStatus,
    DetailsContainer,
    FlexColumn,
    DetailsLink,
    Footer
} from './styles';

function AccordionAuditCard({
    borderColor,
    audit,
    onClickContinue,
    textButtonNext = 'Ver detalhes'
}) {
    return (
        <Container>
            <AuditHeader color={borderColor || audit?.statusAuditor?.color || null} status={audit?.status} subStatus={audit?.subStatus}>
                <Title>Área de atuação: {audit?.areaDescription}</Title>
                {audit?.subStatus ? (
                    <AuditSubStatus subStatus={audit?.subStatus}>
                        {audit?.subStatusDesc}
                    </AuditSubStatus>
                ) : null}
            </AuditHeader>
            <FlexColumn>
                <AuditLabel>
                    <Title>Processo(s)</Title>
                    <Text>{audit?.auditableProcessesLabel}</Text>
                </AuditLabel>
                <AuditLabel>
                    <Value>{audit?.calendarDateFormatted}</Value>
                </AuditLabel>
            </FlexColumn>
            <Footer>
                <Value>{audit?.unity?.fantasyName}</Value>
                <DetailsContainer>
                    <DetailsLink
                        onClick={() => {
                            if (typeof onClickContinue !== 'function') {
                                return;
                            }
                            onClickContinue(audit);
                        }}
                    >
                        {textButtonNext}
                    </DetailsLink>
                    <FaAngleRight />
                </DetailsContainer>
            </Footer>
        </Container>
    );
}

export default AccordionAuditCard;

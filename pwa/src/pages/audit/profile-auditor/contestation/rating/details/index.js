import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, Divisor } from '../../../../../../components/atoms';
import { ReasonText } from './styles';
import {
    Container,
    Content,
    Title,
    Card,
    CardHeader,
    CardTitle,
    CardSubTitle,
    CardDetails,
    CardDetailsValue,
    CardBody,
    Iso,
    Id,
    CardBodyText,
    CardBodyTitle,
    JustificationTitle
} from './styles.js';
import { LoadingContainer } from '../../../../../../components/molecules';

function RateContestedAuditDetails({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const {
        programmingInEditing = null,
        themeInDeal = null
    } = AuditProfileAuditorStore;

    const [loading] = useState(false);
    const [programming, setProgramming] = useState(false);

    useEffect(() => {
        setProgramming(programmingInEditing)
    }, [programmingInEditing])

    if (loading) {
        return (
            <Fragment>
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        onClose={() => history.goBack()}
                        typeAction={'Avaliação de contestações'}
                    />
                    <LoadingContainer />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    onClose={() => history.goBack()}
                    typeAction={'Avaliação de contestações'}
                />
                <Content>
                    <Title>NC/OM contestada </Title>
                    <Card>
                        <CardHeader>
                            <CardTitle>Área de atuação: {programming.areaDescription}</CardTitle>
                            <CardSubTitle>{programming?.auditableProcessesLabel}</CardSubTitle>
                        </CardHeader>

                        <Divisor />
                        
                        <CardDetails>
                            <CardDetailsValue>{themeInDeal.dateInclusionFormatted}</CardDetailsValue>
                            <CardDetailsValue>{programming.unity?.fantasyName}</CardDetailsValue>
                        </CardDetails>
                        
                        <Divisor />

                        <CardBody>
                            <Iso>{themeInDeal.themeTitle}</Iso>
                            <Id>ID #{themeInDeal.requirementAuditedId}</Id>
                            <CardBodyText>
                                {themeInDeal.orderLabel} {themeInDeal.title}
                            </CardBodyText>
                            <CardBodyTitle>Evidências</CardBodyTitle>
                            {themeInDeal?.classifications.map((classification, index) => (
                                    <CardBodyText key={index}>
                                    {classification.evidence}
                                </CardBodyText>)
                            )}

                            <Divisor />
                            
                            <CardBodyTitle>Motivo da recusa</CardBodyTitle>
                            <CardBodyText>
                                {themeInDeal.deal.justification}
                            </CardBodyText>
                            
                            <Divisor />
                            
                            <ReasonText>
                                Motivo da recusa
                                <strong> aceito</strong> pelo avaliador.
                            </ReasonText>
                            <JustificationTitle>
                                Justificativa (Avaliador)
                            </JustificationTitle>
                            <CardBodyText>
                                {themeInDeal.deal.justificationContestation}
                            </CardBodyText>
                        </CardBody>
                    </Card>
                </Content>
            </Container>
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore')(observer(RateContestedAuditDetails));
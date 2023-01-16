import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { WhiteHeaderBack } from '../../../../../components/atoms';
import {
    Container,
    CardContainer,
    ContainerItem,
    Label,
    ContainerItemColumn,
    LabelCriticism,
    ValueCriticism,
    ContainerButton,
    LinkAction,
    ContainerInfos,
    InfoText,
    ContainerHeader,
    Title,
    Subtitle
} from './styles';
import { FaAngleRight } from 'react-icons/fa';
import { NavbarFooter } from '../../../../../components/organisms';
import { getAuditNCOMRequirements } from '../../../../../services/transforms/audits'

function AuditHeadQualityNCOMDetails({ Auditing }) {
    const history = useHistory();

    const { unConformityAudit = null, setUnConformityRequirement } = Auditing;

    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        if (!unConformityAudit) {
            history.push('/audit/head-quality');
            return;
        }

        const response = getAuditNCOMRequirements(unConformityAudit);

        if (response.length === 0) {
            history.push('/audit/head-quality');
            return;
        }

        setRequirements(response);
    }, [history, unConformityAudit])

    const handleInitLinkClick = (requirement) => {
        setUnConformityRequirement(requirement);

        history.push('/audit/head-quality/nc-om/details/indicated');
    };

    return (
        <Fragment>
            <WhiteHeaderBack
                title={'Auditorias com NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                {requirements.map((requirement, index) => {
                    return (
                        <Fragment key={index}>
                            <CardContainer>
                                <ContainerHeader>
                                    <Title>Área de atuação: {unConformityAudit.areaDescription}</Title>
                                    <Subtitle>{unConformityAudit?.auditableProcessesLabel}</Subtitle>
                                </ContainerHeader>
                                <ContainerInfos>
                                    <InfoText>{requirement.dateInclusionFormatted}</InfoText>
                                    <InfoText>{unConformityAudit.unity?.fantasyName}</InfoText>
                                </ContainerInfos>

                                <Fragment>
                                    <ContainerItem>
                                        <Label>{requirement.themeTitle}</Label>
                                    </ContainerItem>
                                    <ContainerItemColumn>
                                        <LabelCriticism>
                                            ID #{requirement.requirementAuditedId}
                                        </LabelCriticism>
                                        <ValueCriticism>
                                            {requirement.orderLabel} {requirement.title}
                                        </ValueCriticism>
                                    </ContainerItemColumn>
                                </Fragment>
                                <ContainerButton>
                                    <LinkAction
                                        onClick={() => handleInitLinkClick(requirement)}
                                    >
                                        Iniciar tratativa <FaAngleRight />
                                    </LinkAction>
                                </ContainerButton>
                            </CardContainer>
                        </Fragment>
                    )
                })}
            </Container>
            <NavbarFooter
                active={3}
                onClickAudit={() => history.push('/audit/head-quality')}
            />
        </Fragment>
    );
}

export default inject('Auditing')(observer(AuditHeadQualityNCOMDetails));

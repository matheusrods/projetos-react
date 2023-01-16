import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, useHistory } from 'react-router-dom';
import { WhiteHeaderBack } from '../../../../components/atoms';
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
import { NavbarFooter } from '../../../../components/organisms';

function AuditResponsibleDealtPendingDeals({ Auditing }) {
    const history = useHistory();

    const { unConformityAudit = null, setUnConformityRequirement, setDealInEditing } = Auditing;

    const handleInitLinkClick = (requirement) => {
        setUnConformityRequirement(requirement);
        setDealInEditing({}, true);

        history.push('/audit/responsible-dealt/steps/team-analysis');
    };

    return unConformityAudit && unConformityAudit?.dealsPending?.length > 0 ? (
        <Fragment>
            <WhiteHeaderBack
                title={'Tratativa de NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                {unConformityAudit.dealsPending.map((requirement, index) => {
                    return (
                        <Fragment key={index}>
                            <CardContainer>
                                <ContainerHeader>
                                    <Title>Área de atuação: {unConformityAudit?.areaDescription}</Title>
                                    <Subtitle>{unConformityAudit?.auditableProcessesLabel}</Subtitle>
                                </ContainerHeader>
                                <ContainerInfos>
                                    <InfoText>{requirement?.themeAuditedCreatedAt}</InfoText>
                                    <InfoText>{unConformityAudit.unity?.fantasyName}</InfoText>
                                </ContainerInfos>
                                <Fragment>
                                    <ContainerItem>
                                        <Label>{requirement?.themeTitle}</Label>
                                    </ContainerItem>
                                    <ContainerItemColumn>
                                        <LabelCriticism>
                                            ID #{requirement?.themeAuditedRequirementId}
                                        </LabelCriticism>
                                        <ValueCriticism>
                                            {requirement?.orderLabel} {requirement?.requirementTitle}
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
                onClickAudit={() => history.push('/audit/responsible-dealt')}
            />
        </Fragment>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
}

export default inject('Auditing')(observer(AuditResponsibleDealtPendingDeals));

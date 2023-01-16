import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { WhiteHeaderBack } from '../../../../components/atoms';
// import AuditCard from '../../../../components/atoms/audit-card';
// import { LoadingContainer } from '../../../../components/molecules';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
// import colors from '../../../../styles/colors';
import { FaAngleRight } from 'react-icons/fa';
// eslint-disable-next-line
import {
    Container,
    Title,
    CardContainer,
    ContainerHeader,
    Subtitle,
    ContainerInfos,
    InfoText,
    ContainerItem,
    Label,
    ContainerItemColumn,
    LabelCriticism,
    ValueCriticism,
    ContainerButton,
    LinkAction
} from './styles';
import { getAuditNCOMRequirements } from '../../../../services/transforms/audits';

const AuditResponsibleProcessDetails = ({ Auditing }) => {
    const history = useHistory();

    const { unConformityAudit = null, setUnConformityRequirement } = Auditing;
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        setRequirements(getAuditNCOMRequirements(unConformityAudit));
    }, [unConformityAudit]);

    const handleInitLinkClick = (requirement) => {
        setUnConformityRequirement(requirement);

        history.push('/audit/responsible-process/awaiting-analysis/indicated');
    };

    return (
        <Fragment>
            <WhiteHeaderBack
                title={'NC/OM'}
                onBack={() => history.push('/audit/responsible-process')}
            />
            <Container>
                {requirements.map((requirement, index) => {
                    return (
                        <Fragment key={index}>
                            <CardContainer>
                                <ContainerHeader>
                                    <Title>
                                        Área de atuação:{' '}
                                        {unConformityAudit?.areaDescription}
                                    </Title>
                                    <Subtitle>
                                        {
                                            unConformityAudit?.auditableProcessesLabel
                                        }
                                    </Subtitle>
                                </ContainerHeader>
                                <ContainerInfos>
                                    <InfoText>
                                        {requirement?.dateInclusionFormatted}
                                    </InfoText>
                                    <InfoText>
                                        {unConformityAudit.unity?.fantasyName}
                                    </InfoText>
                                </ContainerInfos>
                                <Fragment>
                                    <ContainerItem>
                                        <Label>{requirement?.themeTitle}</Label>
                                    </ContainerItem>
                                    <ContainerItemColumn>
                                        <LabelCriticism>
                                            ID #
                                            {requirement?.requirementAuditedId}
                                        </LabelCriticism>
                                        <ValueCriticism>
                                            {requirement?.orderLabel}{' '}
                                            {requirement?.title}
                                        </ValueCriticism>
                                    </ContainerItemColumn>
                                </Fragment>
                                <ContainerButton>
                                    <LinkAction
                                        onClick={() =>
                                            handleInitLinkClick(requirement)
                                        }
                                    >
                                        Ver detalhes
                                        <FaAngleRight />
                                    </LinkAction>
                                </ContainerButton>
                            </CardContainer>
                        </Fragment>
                    );
                })}
            </Container>
            <NavbarFooter
                active={3}
                onClickAudit={() => history.push('/audit/responsible-process')}
            />
        </Fragment>
    );
};

export default inject('Auditing')(observer(AuditResponsibleProcessDetails));

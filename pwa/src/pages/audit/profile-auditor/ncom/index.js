import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { LoadingContainer } from '../../../../components/molecules';
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
import { getAuditNCOMRequirements } from '../../../../services/transforms/audits'

function AuditNCOMDetails({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInEditing = null, setThemeInDeal } = AuditProfileAuditorStore;

    const [requirements, setRequirements] = useState([]);
    const [programming, setProgramming] = useState([]);
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1000);

    useEffect(() => {
        setRequirements(getAuditNCOMRequirements(programmingInEditing))
        setProgramming(programmingInEditing)
    }, [programmingInEditing])

    const handleInitLinkClick = (theme) => {
        setThemeInDeal(theme);

        history.push(`/audit/profile-auditor/ncom/start-deal`)
    };

    return (
        <Fragment>
            <WhiteHeaderBack
                title={'Auditorias com NC/OM'}
                onBack={history.goBack}
            ></WhiteHeaderBack>

            {loading ? (
                <LoadingContainer />
            ) : (
                <Container>
                    {requirements.map((requirement, index) => {
                        return (
                            <Fragment key={index}>
                                <CardContainer>
                                    <ContainerHeader>
                                        <Title>Área de atuação: {programming?.areaDescription}</Title>
                                        <Subtitle>{programming?.auditableProcessesLabel}</Subtitle>
                                    </ContainerHeader>
                                    <ContainerInfos>
                                        <InfoText>{requirement?.dateInclusionFormatted}</InfoText>
                                        <InfoText>{programming.unity?.fantasyName}</InfoText>
                                    </ContainerInfos>

                                    <Fragment>
                                        <ContainerItem>
                                            <Label>{requirement?.themeTitle}</Label>
                                        </ContainerItem>
                                        <ContainerItemColumn>
                                            <LabelCriticism>
                                                ID #{requirement?.themeAuditedId}
                                            </LabelCriticism>
                                            <ValueCriticism>
                                                {requirement?.orderLabel} {requirement?.title}
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

                                <NavbarFooter
                                    active={3}
                                    onClickAudit={() => history.push(`/audit/profile-auditor`)}
                                />
                            </Fragment>
                        )
                    })}
                </Container>
            )}
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore')(observer(AuditNCOMDetails));

import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { LoadingContainer } from '../../../../../components/molecules';
import { WhiteHeaderBack, TagStatus } from '../../../../../components/atoms';
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
import { getAuditContestedRequirements } from '../../../../../services/transforms/audits'
import { Top, Status } from './styles'

function RateContestedAudit({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInEditing = null, setThemeInDeal } = AuditProfileAuditorStore;

    const [requirements, setRequirements] = useState([]);
    const [programming, setProgramming] = useState([]);
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1000);

    useEffect(() => {
        setRequirements(getAuditContestedRequirements(programmingInEditing))
        setProgramming(programmingInEditing)
    }, [programmingInEditing])

    return (
        <Fragment>
            <WhiteHeaderBack
                title={'Auditorias com NC/OM'}
                onBack={history.goBack}
            ></WhiteHeaderBack>

            { loading ? (
                <LoadingContainer />
            ) : (
                <Container>
                    {requirements.map((requirement, index) => {
                        return (
                            <Fragment key={index}>
                                <CardContainer>
                                    <Top>
                                        <Title>Área de atuação: {programming.areaDescription}</Title>
                                        { !requirement.deal?.pending &&
                                            <Status>
                                                <TagStatus
                                                    label={'Concluído'}
                                                    color={'#00B247'}
                                                />
                                            </Status>
                                        }
                                    </Top>
                                    <ContainerHeader>
                                        <Subtitle>{programming?.auditableProcessesLabel}</Subtitle>
                                    </ContainerHeader>
                                    <ContainerInfos>
                                        <InfoText>{requirement.dateInclusionFormatted}</InfoText>
                                        <InfoText>{programming.unity?.fantasyName}</InfoText>
                                    </ContainerInfos>

                                    <Fragment>
                                        <ContainerItem>
                                            <Label>{requirement.themeTitle}</Label>
                                        </ContainerItem>
                                        <ContainerItemColumn>
                                            <LabelCriticism>
                                                ID #{requirement.themeAuditedId}
                                            </LabelCriticism>
                                            <ValueCriticism>
                                                {requirement.orderLabel} {requirement.title}
                                            </ValueCriticism>
                                        </ContainerItemColumn>
                                    </Fragment>
                                    <ContainerButton>
                                        <LinkAction
                                            onClick={() => {
                                                setThemeInDeal(requirement);

                                                if (!requirement.deal?.pending) {
                                                    history.push(`/audit/profile-auditor/contestation/rating/details`)
                                                } else {
                                                    history.push(`/audit/profile-auditor/contestation/rating/start-contestation`)
                                                }
                                            }}
                                        >
                                            {!requirement.deal?.pending ? 'Ver detalhes' : 'Avaliar'}
                                            <FaAngleRight />
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

export default inject('AuditProfileAuditorStore')(observer(RateContestedAudit));

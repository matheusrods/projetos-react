import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import colors from '../../../../../../../styles/colors';
import { CompanyHeader, Accordion } from '../../../../../../../components/atoms';
import CheckboxGroup from '../../../../../../../components/molecules/checkbox-group';
import {
    Container,
    Content,
    Title,
    Request,
    Requests,
    RequestTitle,
    RequestItem
} from './styles';
import { Header } from '../../../../../../../components/organisms';

function AuditStartAuditRequirementsApplicableDetailsCompleted({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInEditing = null } = AuditProfileAuditorStore;

    const [auditableRequirements, setAuditableRequirements] = useState([]);
    const [auditableProcesses, setAuditableProcesses] = useState([]);

    useEffect(() => {
        if (!programmingInEditing) {
            history.push('/audit/profile-auditor');
            return;
        }

        const {
            auditableRequirements = [],
            auditableProcesses = []
        } = programmingInEditing;

        setAuditableRequirements(auditableRequirements);
        setAuditableProcesses(auditableProcesses);
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
                    <Requests>
                        {auditableProcesses.map((auditableProcess) => {
                            const { themes } = auditableProcess;

                            return (themes.map((theme, index) => {
                                const { titles } = theme;

                                return (
                                    <Request key={index}>
                                        <RequestTitle>{theme?.title}</RequestTitle>

                                        {titles.map((title, index) => (
                                            <RequestItem key={index}>
                                                <Accordion
                                                    label={`${title.orderLabel}. ${title.title}`}
                                                    heightAuto={true}
                                                >
                                                    <CheckboxGroup
                                                        key={index}
                                                        options={title.requirements?.map((item) => ({
                                                            id: item.id,
                                                            label: `${item.orderLabel} ${item.title}`
                                                        }))}
                                                        selected={title?.requirements.map(
                                                            (item) => {
                                                                if (auditableRequirements.includes(item.id)) {
                                                                    return item.id
                                                                }
                                                                return null;
                                                            }
                                                        )}
                                                        onSelect={() => { }}
                                                        colorActive={colors.greenAux}
                                                        colorDefault={colors.gray2}
                                                    />
                                                </Accordion>
                                            </RequestItem>
                                        ))}
                                    </Request>
                                )
                            }))
                        })}
                    </Requests>
                </Content>
            </Container>
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore')(observer(AuditStartAuditRequirementsApplicableDetailsCompleted));

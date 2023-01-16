import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import WhiteHeader from '../../../../../components/atoms/white-header';
import { useHistory } from 'react-router-dom';
import { ItemListLargeGroup, ItemListSmallGroup } from '../../../../../components/molecules';
import {
    Container,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle,
    ContainerHeader,
    Content
} from './styles';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';
import { Header } from '../../../../../components/organisms';

function AuditCompleted({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInView = null } = AuditProfileAuditorStore;

    const [fields, setFields] = useState([]);
    const [themes, setThemes] = useState([]);

    const handleNonConformity = (item) => {
        history.push('start-audit/ncom-previous/details', {
            dealt: item.requirementDealt
        })
    };

    useEffect(() => {
        if (!programmingInView) {
            history.push('/audit/profile-auditor');
            return;
        }

        const {
            unity = {},
            auditors = [],
            auditorsLabel = '',
            calendarDateFormatted = '',
            responsibleProcesses = [],
            responsibleProcessesLabel = ''
        } = programmingInView;

        const fieldsFormatted = [
            {
                label: auditors.length > 1 ? 'Auditores' : 'Auditor',
                value: auditorsLabel
            },
            {
                label: responsibleProcesses.length > 1 ? 'Responsáveis' : 'Responsável',
                value: responsibleProcessesLabel
            },
            {
                label: 'Localidade',
                value: unity.fantasyName
            },
            {
                label: 'Data agendada',
                value: calendarDateFormatted
            }
        ];

        setFields(fieldsFormatted);
        setThemes(filterAuditableRequirements(programmingInView));
    }, [programmingInView, history]);

    return (
        <>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title="Auditoria finalizada"
                    onClose={history.goBack}
                />
                <Content>
                    <ContainerHeader>
                        <ContainerHeaderTitle>
                            Área de atuação: {programmingInView?.areaDescription}
                        </ContainerHeaderTitle>
                        <ContainerHeaderSubTitle>
                            {programmingInView?.auditableProcessesLabel}
                        </ContainerHeaderSubTitle>
                    </ContainerHeader>
                    <ItemListLargeGroup data={fields} />
                    <ItemListSmallGroup data={themes} handleOnPress={handleNonConformity} />
                </Content>
            </Container>
        </>
    );
}

export default inject('AuditProfileAuditorStore')(observer(AuditCompleted));

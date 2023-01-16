import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';

import NavbarFooter from '../../../../../components/organisms/navbarFooter';
import { WhiteHeaderBack } from '../../../../../components/atoms';
import ItemListLargeGroup from '../../../../../components/molecules/items-list-large-group';
import ItemListSmallGroup from '../../../../../components/molecules/items-list-small-group';
import EditButton from '../../../../../components/atoms/edit-button';

import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle
} from './styles';
import { inject, observer } from 'mobx-react';

const DetailsConfirmedAuditHeadQuality = ({ Auditing }) => {
    const history = useHistory();

    const { setProgrammingInEditing } = Auditing;

    const [fields, setFields] = useState([]);
    const [themes, setThemes] = useState([]);

    const { confirmedAudit = null } = history?.location?.state || {};

    useEffect(() => {
        if (!confirmedAudit) {
            history.push('/audit/head-quality');
            return;
        }

        const {
            unity = {},
            auditors = [],
            auditorsLabel = '',
            calendarDateFormatted = ''
        } = confirmedAudit;

        const fieldsFormatted = [
            {
                label: auditors.length > 1 ? 'Auditores' : 'Auditor',
                value: auditorsLabel
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
        setThemes(filterAuditableRequirements(confirmedAudit));
    }, [confirmedAudit, history]);

    return (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={history.goBack}
            />
            <Container>
                <ContainerHeader>
                    <ContainerHeaderTitle>
                        Área de atuação: {confirmedAudit?.areaDescription}
                    </ContainerHeaderTitle>
                    <ContainerHeaderSubTitle>
                        Revise as informações do escopo antes de
                        confirmar a auditoria
                    </ContainerHeaderSubTitle>
                </ContainerHeader>
                <ItemListLargeGroup data={fields} />
                <ItemListSmallGroup data={themes} />
                <EditButton
                    position={'absolute'}
                    bottom={66}
                    right={20}
                    onClick={() => {
                        setProgrammingInEditing(confirmedAudit);

                        history.push('details/schedule');
                    }}
                />
            </Container>
            <NavbarFooter
                active={3}
            />
        </>
    );
};

export default inject('Auditing')(observer(DetailsConfirmedAuditHeadQuality));

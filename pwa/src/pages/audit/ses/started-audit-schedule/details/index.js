import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router';
import ItemListLarge from '../../../../../components/atoms/item-list-large';
import { ItemListSmallGroup } from '../../../../../components/molecules';
import { ContainerList } from '../../../../../components/molecules/items-list-large-group/styles';
import { ConfirmCancelFooter } from '../../../../../components/organisms';
import colors from '../../../../../styles/colors';
import { capitalize } from '../../../../../utils/helpers';
import { TagStatus, WhiteHeaderBack } from '../../../../../components/atoms';
import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    DivFooter,
    ContainerContent
} from './styles';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';
import { Redirect } from 'react-router-dom';

const DetailsStartedAudit = ({ Auditing }) => {
    const history = useHistory();

    const { setSourcePage, setProgrammingInEditing } = Auditing;

    const { startedAudit: audit = null } = history.location.state || {};

    const [themes] = useState(audit ? filterAuditableRequirements(audit) : []);

    const handleReschedule = () => {
        setSourcePage('ses');
        setProgrammingInEditing(audit);

        history.push('/audit/schedule');
    };

    return audit ? (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={history.goBack}
            />
            <Container>
                <ContainerContent>
                    <ContainerHeader>
                        <ContainerHeaderTitle>
                            Área de atuação: {audit?.areaDescription}
                        </ContainerHeaderTitle>
                        <TagStatus
                            label={capitalize(audit?.statusSes?.description?.split(' ')[3])}
                            color={audit?.statusSes?.color}
                        />
                    </ContainerHeader>
                    <ContainerList>
                        <ItemListLarge
                            label={audit?.auditors?.length > 1 ? 'Auditores' : 'Auditor'}
                            value={audit?.auditorsLabel}
                        />
                        <ItemListLarge
                            label="Localidade"
                            value={audit?.unity?.fantasyName}
                        />
                        <ItemListLarge
                            label="Data agendada"
                            value={audit?.calendarDateFormatted}
                        />
                    </ContainerList>
                    <ItemListSmallGroup data={themes} />
                </ContainerContent>
            </Container>
            <DivFooter>
                <ConfirmCancelFooter
                    confirmButtonLabel={'Confirmar'}
                    fixed={true}
                    cancelButtonLabel={'Reagendar'}
                    cancelButtonLabelColor={colors.gray6}
                    onConfirm={history.goBack}
                    onCancel={handleReschedule}
                />
            </DivFooter>
        </>
    ) : <Redirect to={'/audit/ses'} />;
};

export default inject('Auditing')(observer(DetailsStartedAudit));

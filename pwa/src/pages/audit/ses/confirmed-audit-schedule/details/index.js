import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router';
import NavbarFooter from "../../../../../components/organisms/navbarFooter";
import { WhiteHeaderBack } from '../../../../../components/atoms';
import ItemListLarge from '../../../../../components/atoms/item-list-large';
import ItemListSmallGroup from '../../../../../components/molecules/items-list-small-group';
import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle
} from './styles';
import EditButton from '../../../../../components/atoms/edit-button';
import { ContainerList } from '../../../../../components/molecules/items-list-large-group/styles';
import { 
    ContainerRequirements
} from '../../../../../components/molecules/items-list-small-group/styles';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';
import { Redirect } from 'react-router-dom';

const DetailsConfirmedAudit = ({ Auditing }) => {
    const history = useHistory();

    const { setSourcePage, setProgrammingInEditing } = Auditing;

    const [audit] = useState(history?.location?.state || null);
    const [themes] = useState(filterAuditableRequirements(audit));

    const handleEditProgramming = () => {
        setSourcePage('ses');
        setProgrammingInEditing(audit);

        history.push('/audit/schedule');
    };

    return audit ? (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={() => history.goBack()}
            />

            <Container>
                <ContainerHeader>
                    <ContainerHeaderTitle>
                        Área de atuação: {audit?.areaDescription}
                    </ContainerHeaderTitle>
                    <ContainerHeaderSubTitle>
                        Revise as informações do escopo antes de
                        confirmar a auditoria
                    </ContainerHeaderSubTitle>
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

                <ContainerRequirements>
                    <ItemListSmallGroup
                        data={themes}
                    />
                </ContainerRequirements>

                <EditButton
                    position={"absolute"}
                    bottom={66}
                    right={20}
                    onClick={handleEditProgramming}
                />
                <NavbarFooter
                    active={3}
                />
            </Container>
        </>
    ) : <Redirect to={'/audit/ses'} />;
};

export default inject('Auditing')(observer(DetailsConfirmedAudit));

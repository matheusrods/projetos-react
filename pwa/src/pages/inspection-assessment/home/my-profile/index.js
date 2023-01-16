import React, {  useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
    AddButtonCustom,
} from './styles';
import colors from '../../../../styles/colors';
import { FaCalendarTimes, FaExclamationTriangle } from 'react-icons/fa';
import {  Loading, Card, SmallCard } from '../../../../components/atoms';
import { useHistory } from 'react-router-dom';

const MyProfile = ({ HomeInspectionStore }) => {
    const [loading, setLoading] = useState(true);
    const {homePath, setActiveTab, inspections} = HomeInspectionStore;
    const history = useHistory();

    const handleAddInspection = () => {
        history.push(`${homePath}/inspection/new`);
    }
    useEffect(() => {
        setActiveTab('home');
        setLoading(false);
    }, [setActiveTab]);

    return (
        <>
            {loading ?
                <Loading /> :
                <Container>
                    <SmallCard
                        color={colors.environmentDangerGreen}
                        link={`${homePath}/inspections/next-inspections`}
                        strongLabel={inspections.next.count}
                        label="inspeções próximas do vencimentos"
                        icon={() => <FaCalendarTimes size={16} />}
                    />
                    <SmallCard
                        color={colors.redAux}
                        link={`${homePath}/inspections/pending-inspections`}
                        strongLabel={inspections.pending.count}
                        label="pendências em inspeções"
                        icon={() => <FaExclamationTriangle size={16} />}
                    />

                    <Card
                        bordercolor={colors.auditOrange}
                        label={`Inspeções programadas (${inspections.scheduled.count})`}
                        link={`${homePath}/inspections/scheduled-inspections`}
                    />
                    <Card
                        bordercolor={colors.redAux}
                        label={`Inspeções canceladas (${inspections.canceled.count})`}
                        link={`${homePath}/inspections/canceled-inspections`}
                    />
                    <Card
                        bordercolor={colors.auditGreen}
                        label={`Inspeções concluídas (${inspections.completed.count})`}
                        link={`${homePath}/inspections/completed-inspections`}
                    />
                    <Card
                        bordercolor={colors.inspectionsProgress}
                        label={`Inspeções em andamento (${inspections.ongoing.count})`}
                        link={`${homePath}/inspections/ongoing-inspections`}
                    />

                    <AddButtonCustom onClick={() => handleAddInspection()} />
                </Container>
            }
        </>
    );
};

export default inject('HomeInspectionStore')(observer(MyProfile));

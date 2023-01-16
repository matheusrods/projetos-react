import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container
} from './styles';
import colors from '../../../../styles/colors';
import { Loading, AccordionCard, AccordionCardItem} from '../../../../components/atoms';
import {FiUsers} from 'react-icons/fi';
import {BsFillCircleFill} from 'react-icons/bs';

const Team = ({ HomeInspectionStore, TeamInspectionStore }) => {
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState([]);
    const {homePath, setActiveTab} = HomeInspectionStore;
    const {getMyTeam, countStatus} = TeamInspectionStore;

    useEffect(() => {
        setActiveTab('home');
        getMyTeam().then((list) => {
            setTeam(list);
            setLoading(false);
        });
    }, [setActiveTab, getMyTeam]);

    return (
        <>
            {loading ?
                <Loading /> :
                <Container>
                    {team.map((item, index) => (
                        <Fragment key={index}>
                            <AccordionCard
                                label={item.name}
                                icon={() => <FiUsers size={25} color={colors.icons}/>}
                            >
                                <AccordionCardItem
                                    label={`Inspeções programadas: ${countStatus(item.list, 1)}`}
                                    icon={() => <BsFillCircleFill size={10} color={colors.auditOrange}/>}
                                    link={`${homePath}/inspections/scheduled-inspections/team/${item.id}`}
                                />
                                <AccordionCardItem
                                    label={`Inspeções concluídas: ${countStatus(item.list, 3)}`}
                                    icon={() => <BsFillCircleFill size={10} color={colors.auditGreen}/>}
                                    link={`${homePath}/inspections/completed-inspections/team/${item.id}`}
                                />
                                <AccordionCardItem
                                    label={`Inspeções em andamento: ${countStatus(item.list, 2)}`}
                                    icon={() => <BsFillCircleFill size={10} color={colors.inspectionsProgress}/>}
                                    link={`${homePath}/inspections/ongoing-inspections/team/${item.id}`}
                                />
                                <AccordionCardItem
                                    label={`Inspeções canceladas: ${countStatus(item.list, 4)}`}
                                    icon={() => <BsFillCircleFill size={10} color={colors.redAux}/>}
                                    link={`${homePath}/inspections/canceled-inspections/team/${item.id}`}
                                />
                            </AccordionCard>
                        </Fragment>
                    ))}
                </Container>
            }
        </>
    );
};

export default inject('HomeInspectionStore', 'TeamInspectionStore')(observer(Team));

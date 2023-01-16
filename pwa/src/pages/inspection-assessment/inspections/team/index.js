import React, {Fragment, useCallback, useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container
} from './styles';
import colors from '../../../../styles/colors';
import { Loading, InfoCardItem, InfoCard, InfoCardAlertInfo } from '../../../../components/atoms';
import {useLocation, useParams} from 'react-router-dom';
import ScheduledInspections from "../list-type/scheduled";
import OngoingInspections from "../list-type/ongoing";
import CompletedInspections from "../list-type/completed";
import CanceledInspections from "../list-type/canceled";
import NextInspections from "../list-type/next";
import PendingInspections from "../list-type/pending";

const Team = ({ HomeInspectionStore, TeamInspectionStore }) => {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const params = useParams();
    const {setInspectionsTitle, setInspectionsTitleBySlug, setInspections, setPendingActions} = HomeInspectionStore;
    const { getListByUser, getAllList, getAllPendingList } = TeamInspectionStore;

    const renderListPage = () => {
        switch (params.type) {
            case 'scheduled-inspections':
                return <ScheduledInspections />;
            case 'ongoing-inspections':
                return <OngoingInspections />;
            case 'completed-inspections':
                return <CompletedInspections />;
            case 'canceled-inspections':
                return <CanceledInspections />;
            case 'next-inspections':
                return <NextInspections />;
            case 'pending-inspections':
                return <PendingInspections />;
            default:
                return '';
        }
    }

    const getData = useCallback(async () => {
        if(params.userId !== undefined){
            const list = await getListByUser(params.userId);
            const pendingList = await getAllPendingList(params.userId);
            setInspections(list);
            setPendingActions(pendingList);
        }else{
            const list = await getAllList();
            const pendingList = await getAllPendingList();
            setInspections(list);
            setPendingActions(pendingList);
        }

    }, [params, setInspections]);

    useEffect(() => {
        setInspectionsTitleBySlug(params.type, true);
        return () => {
            setInspectionsTitle('');
        };
    }, [setInspectionsTitle, setInspectionsTitleBySlug, params]);

    useEffect(() => {
        setLoading(true);
        getData().then(() => {
            setLoading(false);
        });
    }, [params, getData]);

    return (
        <Fragment key={location}>
            {loading ?
                <Loading /> :
                <Container>
                    { renderListPage() }
                </Container>
            }
        </Fragment>
    );
};

export default inject('HomeInspectionStore', 'TeamInspectionStore')(observer(Team));

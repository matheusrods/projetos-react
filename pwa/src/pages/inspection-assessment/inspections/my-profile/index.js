import React, {Fragment, useCallback, useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import {
    Container
} from './styles';
import { Loading } from '../../../../components/atoms';
import {useLocation, useParams} from 'react-router-dom';
import ScheduledInspections from '../list-type/scheduled';
import OngoingInspections from "../list-type/ongoing";
import CompletedInspections from "../list-type/completed";
import CanceledInspections from "../list-type/canceled";
import NextInspections from "../list-type/next";
import PendingInspections from "../list-type/pending";

const MyProfile = ({ HomeInspectionStore }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const {
        setInspectionsTitleBySlug,
        setInspectionsTitle,
        getInspections,
    } = HomeInspectionStore;

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
        setLoading(true);
        await getInspections();
    }, [getInspections]);


    useEffect(() => {
        setInspectionsTitleBySlug(params.type);
        return () => {
            setInspectionsTitle('');
        };
    }, [setInspectionsTitle, setInspectionsTitleBySlug, params]);

    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    }, [getData]);

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

export default inject('HomeInspectionStore')(observer(MyProfile));

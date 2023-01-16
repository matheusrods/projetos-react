import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container
} from './styles';
import {Loading, Tabs, WhiteHeaderBack} from '../../../components/atoms';
import { BottomTabsNavigation } from '../../../components/organisms';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import DetailsInspection from "./details";
import ImprovementActionsInspection from "./improvement-actions";


const Inspection = ({ HomeInspectionStore }) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const location = useLocation();
    const history = useHistory();

    const {
        bottomTabsNavigation,
        homePath,
        getInspectionById,
    } = HomeInspectionStore;

    const tabs = [
        {
            label: 'Detalhes',
            component: <DetailsInspection />
        },
        {
            label: 'Ações de melhoria',
            component: <ImprovementActionsInspection />
        }
    ];


    useEffect(() => {
        if(params.id !== undefined){
            setLoading(true);
            getInspectionById(params.id).then(() => {
                setLoading(false);
            });
        }
    }, [params, getInspectionById]);

    return (
        <Fragment key={location.key}>
            <WhiteHeaderBack
                fixed={true}
                title={'Detalhes da inspeção'}
                onBack={() => history.push(homePath)}
            />
            <Container>
                {loading ?
                    <Loading /> :
                    <>
                        <Tabs tabs={tabs}/>
                    </>
                }
            </Container>
            <BottomTabsNavigation tabs={bottomTabsNavigation} />
        </Fragment>
    );
};

export default inject('HomeInspectionStore')(observer(Inspection));

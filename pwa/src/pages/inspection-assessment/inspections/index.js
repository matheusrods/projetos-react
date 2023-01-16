import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container
} from './styles';
import {Loading, WhiteHeaderBack, Tabs} from '../../../components/atoms';
import { BottomTabsNavigation } from '../../../components/organisms';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import MyProfile from './my-profile';
import Team from './team';

const Inspections = ({ HomeInspectionStore }) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const location = useLocation();
    const history = useHistory();

    const {
        bottomTabsNavigation,
        setActiveTab,
        homePath,
        isGestor,
        getGestorTabs,
        setGestorTabComponent,
        clearTabComponents,
        inspectionsTitle
    } = HomeInspectionStore;



    useEffect(() => {
        if(params.type === 'scheduled-inspections'){
            setActiveTab('schedule');
        }else{
            setActiveTab('inspections');
        }
        setGestorTabComponent('profile', <MyProfile />);
        setGestorTabComponent('team', <Team />);
        setLoading(false);
        return () => {
            clearTabComponents();
        };
    }, [setActiveTab, setGestorTabComponent, clearTabComponents, params]);

    return (
        <Fragment key={location.key}>
            <WhiteHeaderBack
                fixed={true}
                title={inspectionsTitle}
                onBack={() => history.push(homePath)}
            />
            <Container>
                {loading ?
                    <Loading /> :
                    <>
                        {isGestor() && <Tabs tabs={getGestorTabs()} defaultIndex={params.userId !== undefined ? 1 : 0}/>}
                        {!isGestor() && <MyProfile />}
                    </>
                }
            </Container>
            <BottomTabsNavigation tabs={bottomTabsNavigation} />
        </Fragment>
    );
};

export default inject('HomeInspectionStore')(observer(Inspections));

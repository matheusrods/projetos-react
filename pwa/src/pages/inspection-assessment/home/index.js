import React, { useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Container } from './styles';
import { Loading, Tabs } from '../../../components/atoms/';
import MyProfile from './my-profile';
import Team from './team';
import { BottomTabsNavigation, Header } from '../../../components/organisms';

const InspectionAssessment = ({ HomeInspectionStore }) => {
    const [loading, setLoading] = useState(true);
    const {
        bottomTabsNavigation,
        setActiveTab,
        isGestor,
        getGestorTabs,
        setGestorTabComponent,
        clearTabComponents,
        getInspections
    } = HomeInspectionStore;

    const getData = useCallback(async () => {
        setLoading(true);
        await getInspections();
    }, [getInspections]);

    useEffect(() => {
        setActiveTab('home');
        setGestorTabComponent('profile', <MyProfile />);
        setGestorTabComponent('team', <Team />);
        setLoading(false);
        return () => {
            clearTabComponents();
        };
    }, [setActiveTab, setGestorTabComponent, clearTabComponents]);

    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    }, [getData]);

    return (
        <>
            <Header />
            <Container>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {isGestor() && <Tabs tabs={getGestorTabs()} />}
                        {!isGestor() && <MyProfile />}
                    </>
                )}
            </Container>
            <BottomTabsNavigation tabs={bottomTabsNavigation} />
        </>
    );
};

export default inject('HomeInspectionStore')(observer(InspectionAssessment));

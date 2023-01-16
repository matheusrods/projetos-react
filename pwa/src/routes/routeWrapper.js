import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

import { DefaultLayout, TrainingLayout } from '../components/layouts';

const RouteWrapper = ({ AuthStore, isPrivate, ...rest }) => {
    const { token } = AuthStore;

    const layouts = {
        training: TrainingLayout
        // ... insert here others layouts
    };

    const Layout = layouts[rest.path.split('/')[1]] ?? DefaultLayout;

    if (!token && isPrivate) {
        return <Redirect to="/" />;
    }

    if (rest.path === '/' && token) {
        return <Redirect to="/want-to-see" />;
    }

    return (
        <Layout>
            <Route {...rest} />
        </Layout>
    );
};

export default inject('AuthStore', 'UserStore')(observer(RouteWrapper));

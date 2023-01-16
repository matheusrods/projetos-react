import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const PermittedRoute = ({
    AuthStore,
    PermissionStore: { haveAtLeastOnePermission },
    isPrivate,
    permissions = [],
    paramsToRemoveRoute = [],
    ...rest
}) => {
    const removeParamsPathname = (pathname) => {
        // eslint-disable-next-line
        const path = pathname.replace(/[\d,\.]+/g, '{param}');

        return removeSlashEndUrl(path);
    };

    const removeParamsRoute = (path, paramsToRemove) => {
        if (paramsToRemove.length > 0) {
            paramsToRemove.forEach((param) => {
                path = path.replace(`:${param}`, '{param}');
            });

            return removeSlashEndUrl(path);
        }

        return removeSlashEndUrl(path);
    };

    const removeSlashEndUrl = (url) => {
        const urlWithoutSlash = url.replace(/^\/|\/$/g, '');
        return urlWithoutSlash;
    };

    const { token } = AuthStore;

    if (!token && isPrivate) {
        return <Redirect to="/" />;
    }

    if (rest.path === '/' && token) {
        return <Redirect to="/want-to-see" />;
    }

    if (
        permissions.length > 0 &&
        removeParamsPathname(window.location.pathname) ===
            removeParamsRoute(rest.path, paramsToRemoveRoute)
    ) {
        if (!haveAtLeastOnePermission(permissions)) {
            toast.warning(
                'O seu usuário não possuí permissão para acessar essa página'
            );

            return <Redirect to="/" />;
        }
    }

    return <Route {...rest} />;
};

export default inject(
    'AuthStore',
    'UserStore',
    'PermissionStore'
)(observer(PermittedRoute));

import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (
            <Routes>
                {privateRoutes.map( ({path, component}) =>
                        <Route key={path} path={path} element={component} exact={true}/>
                )}

                <Route
                    path="*"
                    element={<Navigate to={CHAT_ROUTE} replace />}
                />
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map( ({path, component}) =>
                    <Route key={path} path={path} element={component} exact={true}/>
                )}
                <Route
                    path="*"
                    element={<Navigate to={LOGIN_ROUTE} replace />}
                />
            </Routes>
        )
};

export default AppRouter;
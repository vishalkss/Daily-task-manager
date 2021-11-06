import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
import Header from "../components/Header/Header"

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => getToken() ? <div><Header /><Component {...props} /></div> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;
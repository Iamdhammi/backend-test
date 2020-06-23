import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            const checkIfTokenExists = () => {
                const token = localStorage.getItem('eventToken');
                if (token) {           
                    return true;
                } else {
                    return false;
                }
            }
            return auth.isLoggedIn || checkIfTokenExists() ? (
                <Component {...props} />
            ) :
            <Redirect to="/" />
        }}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = ({auth}) => {
    return {
        auth: auth
    }
}

export default connect(
    mapStateToProps
)(PrivateRoute);
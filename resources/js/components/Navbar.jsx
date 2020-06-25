import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CustomModal from "../components/Modal";
import AuthPage from "../components/AuthPage";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login_user } from '../redux/actions/auth';

function Navbar(props) {
    const { dashboard } = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');


    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const clearLoginError = () => {
        setLoginError('');
    }

    const handleLogin = credential => {
        props.login_user(credential);
    }

    const userEmail = localStorage.getItem('userEmail')

    return (
        <div className={ dashboard ? "navbar-dashboard" : "navbar"} >
            <div className="my-container">
                <div className={ dashboard ? "navbar-dashboard__content" : "navbar__content"}>
                    <div className={ dashboard ? "navbar-dashboard__content--logo" : "navbar__content--logo"}><h2><Link to={"/"}>EventTalk</Link></h2></div>
                    <div className={ dashboard ? "navbar-dashboard__content--routes" : "navbar__content--routes"}>
                        <ul>
                            {
                                dashboard ?
                                <li>Welcome {userEmail}!</li> :
                                <li><a className="authButton" onClick={openModal}> <Icon name="sign-in"/> Sign in</a></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
            <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <AuthPage closeModal={closeModal} handleLogin={handleLogin} loginError={loginError} emailError={emailError} clearLoginError={clearLoginError} loading={props.loading} />
            </CustomModal>
        </div>
    );
}

Navbar.propTypes = {
    dashboard: PropTypes.bool
} 

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading
    }
}

export default connect(
    mapStateToProps,
    {login_user}
)(Navbar);



import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CustomModal from "../components/Modal";
import AuthPage from "../components/AuthPage";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login_user } from '../redux/actions/auth';

function Navbar(props) {
    let btnRef, mobileRef;
    const { dashboard } = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');

    const toggleMobileMenu = () => {
		btnRef.classList.toggle("mobile-toggler--opened");
		mobileRef.classList.toggle("mobile-menu--opened");
    };

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

    return (
        <div className={ dashboard ? "navbar-dashboard" : "navbar"} >
            <div className="my-container">
                <div className={ dashboard ? "navbar-dashboard__content" : "navbar__content"}>
                    <div className={ dashboard ? "navbar-dashboard__content--logo" : "navbar__content--logo"}><h2><Link to={"/"}>EventTalk</Link></h2></div>
                    <div className={ dashboard ? "navbar-dashboard__content--routes" : "navbar__content--routes"}>
                        <ul>
                            {
                                dashboard ?
                                <li></li> :
                                <li><a className="authButton" onClick={openModal}> <Icon name="sign-in"/> Sign in</a></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <button
                className="mobile-toggler"
                ref={ref => (btnRef = ref)}
                onClick={toggleMobileMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className="mobile-menu" ref={ref => (mobileRef = ref)}>
                <ul>
                    <li>
                        <Link to="/">
                        Properties
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Sell
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Sign In
                        </Link>
                    </li>
                </ul>
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



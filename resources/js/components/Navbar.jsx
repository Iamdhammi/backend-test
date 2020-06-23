import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from "../components/Modal";
import AuthPage from "../components/AuthPage";
import { login_user, logout_user } from '../redux/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clear_error, clear_success } from '../redux/actions';

function Navbar(props) {
    let btnRef, mobileRef;
    const { isLoggedin, history, errorMessage, clear_error } = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');

    React.useEffect(() => {
        // const token = localStorage.getItem('eventToken')
        if(isLoggedin) {
            history.push('/dashboard');
        }
        if(errorMessage) {
            toast.error( errorMessage , {
                autoClose: 8000,
            });
            clear_error();
        }
    }, [isLoggedin, errorMessage, clear_error]);

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

    const handleRegister = credential => {
        props.create_user(credential);
        setEmailError('');
    }

    const handleLogin = credential => {
        props.login_user(credential);
    }

    return (
        <div className="navbar">
            <ToastContainer autoClose={8000} pauseOnHover={true}/>
            <div className="my-container">
                <div className="navbar__content">
                    <div className="navbar__content--logo"><h2><Link to={"/"}>EventTalk</Link></h2></div>
                    <div className="navbar__content--routes">
                        <ul>
                            <li><a className="authButton" onClick={openModal}> <Icon name="sign-in"/> Sign in</a></li>
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
                <AuthPage closeModal={closeModal} handleRegister={handleRegister} handleLogin={handleLogin} loginError={loginError} emailError={emailError} clearLoginError={clearLoginError} loading={props.loading} />
            </CustomModal>
        </div>
    );
}

Navbar.propTypes = {
    login_user: PropTypes.func,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    isLoggedin: PropTypes.bool,
    loginErrorMessage: PropTypes.string
} 

const mapStatToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        isLoggedin: auth.isLoggedin,
        errorMessage: auth.errorMessage,
        successMessage: auth.successMessage
    }
}

export default connect(
    mapStatToProps,
    {login_user, logout_user, clear_error}
)(Navbar);



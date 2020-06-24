import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import PropTypes from 'prop-types';

function AuthPage(props) {

    const [loginCredential, setLoginCredential] = React.useState({
        email: '',
        password: ''
    })

    const [loginEmailError, setLoginEmailError] = React.useState('');
    const [loginPasswordError, setLoginPasswordError] = React.useState('');
    const [showLoginPassword, setShowLoginPassword] = React.useState(false);
    const [loginAuthError, setLoginAuthError] = React.useState('');

    React.useEffect(() => {
        if(props.emailError) setRegisterEmailError(props.emailError);
        if(props.loginError){ 
            setLoginAuthError(props.loginError);
        };
    }, [props.emailError, props.loginError]);


    const toggleLoginPassword = () => {
        setShowLoginPassword(!showLoginPassword);
    }  

    const clearAllLoginError = () => {
        setLoginEmailError("");
        setLoginPasswordError("");
    }

    const checkLoginSchema = yup.object().shape({
        password: yup
        .string()
        .required('Password is required'),
        email: yup
        .string()
        .email('Email is invalid')
        .required('Email address is required'),
    });

    const handleLogin = () => {
        checkLoginSchema
        .validate({
            email: loginCredential.email,
            password: loginCredential.password
        })
        .then(() => {
            props.handleLogin(loginCredential);
        })
        .catch(error => {
            switch (error.path) {
                case 'email':
                    setLoginEmailError(error.errors);
                    break;
                case 'password':
                    setLoginPasswordError(error.errors);
                    break;
                default:
                    clearAllLoginError();
                    break;
            }
        })
    }


    return(
        <div className="tabs">
            <h2>Welcome to EventTalk</h2>
            <Icon name="cancel" className="cancel" onClick={props.closeModal}/>
            <div className="auth">
                <div className="modal__form">
                    <p className="auth--title">Email address</p>
                    <Input 
                        icon='mail' 
                        iconPosition='left' 
                        placeholder='e.g. damilola@gmail.com' 
                        className="auth--input" 
                        type="email"
                        value={loginCredential.email}
                        onChange={(e, data) => { 
                            setLoginCredential({...loginCredential, email: e.target.value}),
                            setLoginEmailError(''),
                            setLoginAuthError(''),
                            props.clearLoginError()
                        }}
                        error={loginEmailError ? true : false}
                    />
                    <p className="modal__form--error">{loginEmailError}</p>
                </div>
                <div className="modal__form">
                    <p className="auth--title">Password</p>
                    {
                        showLoginPassword ?
                        <Icon name="eye slash" className="auth--icon" onClick={toggleLoginPassword}/> :
                        <Icon name="eye" className="auth--icon" onClick={toggleLoginPassword}/>
                    }
                    <Input 
                        icon='key' 
                        iconPosition='left' 
                        placeholder='**********'
                        className="auth--input" 
                        type={showLoginPassword ? "text" : "password"}
                        value={loginCredential.password}
                        onChange={(e, data) => {
                            setLoginCredential({...loginCredential, password: e.target.value}),
                            setLoginPasswordError(''),
                            setLoginAuthError(''),
                            props.clearLoginError()
                        }}
                        error = {loginPasswordError ? true : false}
                    />
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p className="modal__form--error">{loginPasswordError}</p>
                        <p className="auth--subtitle">Forgot Password?</p>
                    </div>
                    
                </div>
                <div className="modal__form">
                    <p className="auth-error">{loginAuthError}</p>
                </div>
                <div className="modal__form">
                    <Button fluid className="modal__form--btn"  onClick={() => handleLogin()} loading={props.loading} disabled={props.loading}>
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;

AuthPage.propTypes = {
    handleRegister: PropTypes.func,
    handleLogin: PropTypes.func,
    closeModal: PropTypes.func,
    emailError: PropTypes.string,
    loading: PropTypes.bool,
    loginError: PropTypes.string,
    clearLoginError: PropTypes.func
} 
   
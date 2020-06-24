import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { create_attendee } from '../redux/actions/attendee';

function CreateAttendee(props) {
    const { closeModal, create_attendee, loading } = props;
    const [ attendeeDetails, setAttendeeDetails ] = React.useState({
        fullName: '',
        email: ''
    })
    const [fullNameError, setFullNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');

    const clearAllError = () => {
        setFullNameError(""),
        setEmailError("")
    }

    const checkTalkSchema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Email is required'),
        fullName: yup.string().required('Full name is required')
    });

    const handleSubmit = () => {
        checkTalkSchema
        .validate({
            fullName: attendeeDetails.fullName,
            email: attendeeDetails.email
        })
        .then(() => {
            create_attendee(attendeeDetails);
        })
        .catch(error => {
            switch (error.path) {
                case 'fullName':
                    setFullNameError(error.errors);
                    break;
                case 'email':
                    setEmailError(error.errors);
                    break;
                default:
                    clearAllError();
                    break;
            }
        })
    }

    return (
        <div className="tabs">
            <h2>Add an Attendee</h2>
            <Icon name="cancel" className="cancel" onClick={closeModal}/>
            <div className="my-modal">
                <div className="modal__form">
                    <p className="my-modal--title">Full Name</p>
                    <Input 
                        placeholder='Talk Name' 
                        className="my-modal--input" 
                        type="text"
                        value={attendeeDetails.fullName}
                        onChange={(e, data) => { 
                            setAttendeeDetails({...attendeeDetails, fullName: e.target.value}),
                            setFullNameError('')
                        }}
                        error={fullNameError ? true : false}
                    />
                    <p className="contact__form--error">{fullNameError}</p>
                </div>
                <div className="modal__form">
                    <p className="my-modal--title">Email</p>
                    <Input 
                        className="my-modal--input" 
                        type="email"
                        placeholder="Email address"
                        value={attendeeDetails.email}
                        onChange={(e, data) => { 
                            setAttendeeDetails({...attendeeDetails, email: e.target.value}),
                            setEmailError('')
                        }}
                        error={emailError ? true : false}
                    />
                    <p className="contact__form--error">{emailError}</p>
                </div>
                <div className="modal__form">
                    <Button fluid className="modal__form--btn"  onClick={() => handleSubmit()} loading={loading} disabled={loading}>
                        Add Attendee
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({attendee}) => {
    return {
        loading: attendee.loading,
    }
}

export default connect(
    mapStateToProps,
    {create_attendee}
)(CreateAttendee);

CreateAttendee.propTypes = {
    closeModal: PropTypes.func
}
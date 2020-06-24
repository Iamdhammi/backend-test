import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import * as dayjs from 'dayjs'
import { connect } from 'react-redux';
import { create_talk } from '../redux/actions/talk';

function CreateTalk(props) {
    const { closeModal, create_talk, clear_success, clear_error, errorMessage, successMessage, loading } = props;
    const [ talkDetails, setTalkDetails ] = React.useState({
        name: '',
        date: '',
        time: '',
        venue: ''
    })
    const [nameError, setNameError] = React.useState('');
    const [dateError, setDateError] = React.useState('');
    const [timeError, setTimeError] = React.useState('');
    const [venueError, setVenueError] = React.useState('');


    const clearAllError = () => {
        setNameError("");
        setDateError("");
        setTimeError("");
        setVenueError("");
    }

    const checkTalkSchema = yup.object().shape({
        venue: yup.string().required('Talk venue is required'),
        time: yup.string().required('Talk time is required'),
        date: yup.date().required('Talk date is required'),
        name: yup.string().required('Talk name is required')
    });

    const handleSubmit = () => {
        checkTalkSchema
        .validate({
            name: talkDetails.name,
            date: talkDetails.date,
            time: talkDetails.time,
            venue: talkDetails.venue
        })
        .then(() => {
            create_talk(talkDetails);
        })
        .catch(error => {
            switch (error.path) {
                case 'name':
                    setNameError(error.errors);
                    break;
                case 'date':
                    setDateError(error.errors);
                    break;
                case 'time':
                    setTimeError(error.errors);
                    break;
                case 'venue':
                    setVenueError(error.errors);
                    break;
                default:
                    clearAllError();
                    break;
            }
        })
    }

    return (
        <div className="tabs">
            <h2>Create a Talk</h2>
            <Icon name="cancel" className="cancel" onClick={closeModal}/>
            <div className="my-modal">
                <div className="modal__form">
                    <p className="my-modal--title">Talk Name</p>
                    <Input 
                        placeholder='Talk Name' 
                        className="my-modal--input" 
                        type="text"
                        value={talkDetails.name}
                        onChange={(e, data) => { 
                            setTalkDetails({...talkDetails, name: e.target.value}),
                            setNameError('')
                        }}
                        error={nameError ? true : false}
                    />
                    <p className="contact__form--error">{nameError}</p>
                </div>
                <div className="modal__form">
                    <p className="my-modal--title">Talk Date</p>
                    <Input 
                        className="my-modal--input" 
                        type="date"
                        value={talkDetails.date}
                        onChange={(e, data) => { 
                            setTalkDetails({...talkDetails, date: e.target.value}),
                            setDateError('')
                        }}
                        error={dateError ? true : false}
                        min={dayjs().format('YYYY-MM-DD')}
                    />
                    <p className="contact__form--error">{dateError}</p>
                </div>
                <div className="modal__form">
                    <p className="my-modal--title">Talk Time</p>
                    <Input 
                        className="my-modal--input" 
                        type="time"
                        value={talkDetails.time}
                        onChange={(e, data) => { 
                            setTalkDetails({...talkDetails, time: e.target.value}),
                            setTimeError('')
                        }}
                        error={timeError ? true : false}
                    />
                    <p className="contact__form--error">{timeError}</p>
                </div>
                <div className="modal__form">
                    <p className="my-modal--title">Venue</p>
                    <Input 
                        className="my-modal--input" 
                        type="text"
                        value={talkDetails.venue}
                        onChange={(e, data) => { 
                            setTalkDetails({...talkDetails, venue: e.target.value}),
                            setVenueError('')
                        }}
                        error={venueError ? true : false}
                    />
                    <p className="contact__form--error">{venueError}</p>
                </div>
                <div className="modal__form">
                    <Button fluid className="modal__form--btn"  onClick={() => handleSubmit()} loading={loading} disabled={loading}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({talk}) => {
    return {
        loading: talk.loading,
    }
}

export default connect(
    mapStateToProps,
    {create_talk}
)(CreateTalk);

CreateTalk.propTypes = {
    closeModal: PropTypes.func
}
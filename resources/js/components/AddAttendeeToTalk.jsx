import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { get_all_attendees } from '../redux/actions/attendee';
import { add_attendee_to_talk } from '../redux/actions/talk';
import Select from 'react-select';

function AddAttendeeToTalk(props) {
    const { closeModal, loading, get_all_attendees, attendees, talkId, add_attendee_to_talk, talkAttendeesProps } = props;
    const [ talkAttendees, setTalkAttendees ] = React.useState([]);
    const [talkAttendeesError, setTalkAttendeesError] = React.useState('');
    const [allAttendees, setAllAttendees] = React.useState([]);
    const [options, setOptions] = React.useState([])

    React.useEffect(() => {
        get_all_attendees();
    }, [get_all_attendees]);

    React.useEffect(() => {
        if(attendees) {
            setAllAttendees(attendees);

            
        }
    }, [attendees]);

    React.useEffect(() => {
        if(talkAttendeesProps && attendees) {
            const talkAttendeesIds = talkAttendeesProps.map((item) => {
                return item.attendee_id
            })
            setOptions(attendees.filter( item => !talkAttendeesIds.includes(item.id)))
            console.log('me');
        }
    }, [talkAttendeesProps, attendees]);

    const checkTalkSchema = yup.object().shape({
        talkAttendees: yup
        .array()
        .of(yup.string())
        .required("Field is required"),
    });

    const handleSubmit = () => {
        checkTalkSchema
        .validate({
            talkAttendees: talkAttendees
        })
        .then(() => {
            const data = {
                talkAttendees,
            }
            add_attendee_to_talk(talkId, talkAttendees);
        })
        .catch(error => {
            setTalkAttendeesError(error.errors);
        })
    }

    const handleSelect = optionSelected => {
        var value = [];
        if(optionSelected) {
            for (var i = 0, l = optionSelected.length; i < l; i++) {
                value.push(optionSelected[i].value);
            }
        }
        setTalkAttendees(value);
    }

    const attendeesOption = options.map((item, key) => {
        return {
            value: item.id, label: item.full_name
        }
    });
    const selectStyles = {   
        menu: provided => ({ ...provided, zIndex: 9999 })
    }

    return (
        <div className="tabs">
            <h2>Add Attendee to Talk</h2>
            <Icon name="cancel" className="cancel" onClick={closeModal}/>
            <div className="my-modal">
                <div className="modal__form">
                    <p className="my-modal--title">Select Attendee</p>
                    <Select
                        isMulti
                        options={attendeesOption}
                        className="my-modal--select" 
                        onChange={handleSelect}
                        styles={selectStyles}
                    />
                    <p className="contact__form--error">{talkAttendeesError}</p>
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
        attendees: attendee.attendees
    }
}

export default connect(
    mapStateToProps,
    { get_all_attendees, add_attendee_to_talk}
)(AddAttendeeToTalk);

AddAttendeeToTalk.propTypes = {
    closeModal: PropTypes.func,
    talkId: PropTypes.string,
    talkAttendeesProps: PropTypes.array
}
import React from 'react';
import { connect } from 'react-redux';
import { clear_success, clear_error } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import { Icon, Button } from 'semantic-ui-react';
import CustomModal from '../../components/Modal';
import AddAttendeeToTalk from '../../components/AddAttendeeToTalk';
import { create_talk, get_talk, delete_talk_attendee } from '../../redux/actions/talk';
import { logout_user } from '../../redux/actions/auth';
import Datatable from '../../components/DataTable';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom'

function Talk(props) {
    const { id } = props.match.params;
    const { clear_success, clear_error, talkSuccessMessage, talkErrorMessage, get_talk, talk, loading, delete_talk_attendee, logout_user } = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [allTalk, setAllTalk] = React.useState({});
    const [talkAttendees, setTalkAttendees] = React.useState(null); 

    React.useEffect(() => {
        get_talk(id);
    }, [get_talk]);

    React.useEffect(() => {
        if(talkSuccessMessage) {
            toast.success( talkSuccessMessage , {
                autoClose: 8000,
            });
            clear_success();
            closeModal();
            get_talk(id);
        }
        if(talkErrorMessage) {
            toast.error(talkErrorMessage, {
                autoClose: 8000,
            });
            clear_error();
        }
    }, [talkSuccessMessage, talkSuccessMessage, clear_success, clear_error, get_talk]);

    React.useEffect(() => {
        if(talk) {
            setAllTalk(talk);
            setTalkAttendees(talk.talk_attendee);
            clear_success();
        }
    }, [talk])



    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    return (
        <div className="dashboard">
            <ToastContainer autoClose={8000} pauseOnHover={true}/>
            <Navbar history={props.history} dashboard={true} />
            <div className="my-container">
                <div className="dashboard__content">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <div className="dashboard__content--sidebar">
                                <Link to="/talks"> <Icon name="dashboard" /> My Talks</Link>
                                <Link to="/attendees"><Icon name="users" /> Attendees</Link>
                                <a onClick={logout_user}><Icon name="log out" /> Log out</a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            {
                                loading ?
                                <div style={{position: 'absolute', right: 'calc(50%)'}}>
                                    <Loader type="Oval" color="#fad03b" height={40} width={40} timeout={3000} /> 
                                </div>:
                                <div className="dashboard__content--main">
                                    <div className="header-section">
                                        <h2>{allTalk && allTalk.talk_name}</h2>
                                        <Button className="header-section--button" onClick={openModal}>Add Attendee(s) to Talk</Button>
                                    </div>
                                    <div style={{paddingTop: 20}}>
                                        <h3>Talk Attendees</h3>
                                        <div className="datatable-section">
                                            <Datatable data={talkAttendees} talkAttendee={true} deleteTalkAttendee={delete_talk_attendee} />
                                        </div>
                                    </div>
                                </div>

                            }
                            {console.log(allTalk)}
                            
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal} attendeeTalk={true}>
                <AddAttendeeToTalk closeModal={closeModal} talkId={id} talkAttendeesProps={talkAttendees} />
            </CustomModal>
        </div>
    );
}
const mapStateToProps = ({talk}) => {
    return {
        talkSuccessMessage: talk.successMessage,
        talkErrorMessage: talk.errorMessage,
        talk: talk.talk,
        loading: talk.loading,
    }
}
export default connect(
    mapStateToProps,
    {create_talk, clear_success, get_talk, clear_error, delete_talk_attendee, logout_user}
)(Talk);
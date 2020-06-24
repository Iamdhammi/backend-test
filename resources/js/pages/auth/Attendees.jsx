import React from 'react';
import { connect } from 'react-redux';
import { clear_success, clear_error } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import { Icon, Button } from 'semantic-ui-react';
import CustomModal from '../../components/Modal';
import CreateAttendee from '../../components/CreateAttendee';
import { get_all_attendees, delete_attendee } from '../../redux/actions/attendee';
import Datatable from '../../components/DataTable';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

function Attendees(props) {
    const { clear_success, clear_error, successMessage, errorMessage, get_all_attendees, attendees, loading, delete_attendee } = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [allAttendees, setAllAttendees] = React.useState([]);

    React.useEffect(() => {
        get_all_attendees();
    }, [get_all_attendees]);
    
    React.useEffect(() => {
        if(successMessage) {
            toast.success( successMessage , {
                autoClose: 8000,
            });
            clear_success();
            closeModal();
            get_all_attendees();
        }
        if(errorMessage) {
            toast.error(errorMessage, {
                autoClose: 8000,
            });
            clear_error();
        }
    }, [successMessage, errorMessage, clear_success, clear_error, get_all_attendees]);

    React.useEffect(() => {
        if(attendees) {
            setAllAttendees(attendees);
        }
    }, [attendees])


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
                                <Link to="/dashboard"> <Icon name="dashboard" /> My Talks</Link>
                                <Link to="/attendees" className="active"><Icon name="users" /> Attendees</Link>
                                <a><Icon name="log out" /> Log out</a>
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
                                        <h2>Attendees</h2>
                                        <Button className="header-section--button" onClick={openModal}>Add Attendee</Button>
                                    </div>
                                    <div className="datatable-section">
                                        <Datatable data={allAttendees} deleteAttendee={delete_attendee} attendee={true} />
                                    </div>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <CreateAttendee closeModal={closeModal} />
            </CustomModal>
        </div>
    );
}
const mapStateToProps = ({attendee}) => {
    return {
        successMessage: attendee.successMessage,
        errorMessage: attendee.errorMessage,
        attendees: attendee.attendees,
        loading: attendee.loading
    }
}
export default connect(
    mapStateToProps,
    {clear_success, get_all_attendees, clear_error, delete_attendee}
)(Attendees);
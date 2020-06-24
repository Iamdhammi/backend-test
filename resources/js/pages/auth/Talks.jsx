import React from 'react';
import { connect } from 'react-redux';
import { clear_success, clear_error } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import { Icon, Button } from 'semantic-ui-react';
import CustomModal from '../../components/Modal';
import CreateTalk from '../../components/CreateTalk';
import { create_talk, get_all_talks, delete_talk } from '../../redux/actions/talk';
import { logout_user } from '../../redux/actions/auth';
import Datatable from '../../components/DataTable';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom'

function Talks(props) {
    const { clear_success, clear_error, successMessage, talkSuccessMessage, talkErrorMessage, get_all_talks, talks, loading, delete_talk, logout_user } = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [allTalks, setAllTalks] = React.useState([]);

    React.useEffect(() => {
        get_all_talks();
    }, [get_all_talks]);
    
    React.useEffect(() => {
        if(successMessage) {
            toast.success(successMessage, {
                autoClose: 8000,
            });
            clear_success();
        }
    }, [successMessage, clear_success]);

    React.useEffect(() => {
        if(talkSuccessMessage) {
            toast.success( talkSuccessMessage , {
                autoClose: 8000,
            });
            clear_success();
            closeModal();
            get_all_talks();
        }
        if(talkErrorMessage) {
            toast.error(talkErrorMessage, {
                autoClose: 8000,
            });
            clear_error();
        }
    }, [talkSuccessMessage, talkSuccessMessage, clear_success, clear_error, get_all_talks]);

    React.useEffect(() => {
        if(talks) {
            setAllTalks(talks);
        }
    }, [talks])



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
                                <Link to="/talks" className="active"> <Icon name="dashboard" /> My Talks</Link>
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
                                        <h2>My Talks</h2>
                                        <Button className="header-section--button" onClick={openModal}>Add Talk</Button>
                                    </div>
                                    <div className="datatable-section">
                                        <Datatable data={allTalks} deleteTalk={delete_talk} />
                                    </div>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <CreateTalk closeModal={closeModal} />
            </CustomModal>
        </div>
    );
}
const mapStateToProps = ({auth, talk}) => {
    return {
        successMessage: auth.successMessage,
        talkSuccessMessage: talk.successMessage,
        talkErrorMessage: talk.errorMessage,
        talks: talk.talks,
        loading: talk.loading,
    }
}
export default connect(
    mapStateToProps,
    {create_talk, clear_success, get_all_talks, clear_error, delete_talk, logout_user}
)(Talks);
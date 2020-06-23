import React from 'react';
import { connect } from 'react-redux';
import { clear_success } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard(props) {
    const { clear_success, successMessage } = props;

    React.useEffect(() => {
        if(successMessage) {
            toast.success(successMessage, {
                autoClose: 8000,
            });
            clear_success();
        }
    }, [successMessage, clear_success]);


    return (
        <div>
            <ToastContainer autoClose={8000} pauseOnHover={true}/>
            <p>
                me
            </p>
        </div>
    );
}
const mapStateToProps = ({auth}) => {
    return {
        successMessage: auth.successMessage
    }
}
export default connect(
    mapStateToProps,
    {clear_success}
)(Dashboard);
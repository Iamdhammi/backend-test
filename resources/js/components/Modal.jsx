import React from 'react';
import Modal from 'react-modal';

if (document.getElementById('app')) {
    Modal.setAppElement('#app')
}


export default function CustomModal(props) {
    const {attendeeTalk} = props;

    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflowY: attendeeTalk ? "visible" : "auto",
            overflowX: attendeeTalk ? "visible" : "auto",
            maxHeight: '100vh'
        },
        overlay: {
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)'
        }
    };
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {props.children}
        </Modal>
    )
}
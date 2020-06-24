import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const customStyles = {
    headCells: {
      style: {
        paddingLeft: 10,
        paddingRight: 20,
        background: '#e1e1e2',
        fontWeight: '800',
        fontSize: 13
      },
    }
};


function Datatable(props){
    const { deleteTalk, attendee, deleteAttendee, talkAttendee , deleteTalkAttendee} = props;
    const data = props.data ? props.data : [];
    const column = [
        {
            name: 'Talk Name',
            selector: 'talk_name',
            sortable: true,
            cell: row => (
                    <h4>{row.talk_name}</h4>
            ),
        },
        {
            name: 'Talk Date',
            selector: 'talk_date',
            sortable: true,
            cell: row => `${row.talk_date}`
        },
        {
            name: 'Talk Time',
            selector: 'talk_time',
            sortable: true,
            cell: row => `${row.talk_time}`
        },
        {
            name: 'Talk Venue',
            selector: 'talk_venue',
            sortable: true,
            cell: row => `${row.talk_venue}`
        },
        {
            name: 'Actions',
            cell: row => (
                <Link to={`/talks/${row.id}`}><h5 style={{color: 'green'}}><Icon name="eye" /> View</h5></Link>
            ),
            maxWidth: '100px',
        },
        {
            cell: row => (
                <h5 style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteTalk(row.id)} ><Icon name="delete" />Delete</h5>
            ),
        },
    ];

    const AttendeeColumn = [
        {
            name: 'Full Name',
            selector: 'full_name',
            sortable: true,
            cell: row => (
                    <h4>{row.full_name}</h4>
            ),
        },
        {
            name: 'Email address',
            selector: 'email',
            sortable: true,
            cell: row => (
                    <h4>{row.email}</h4>
            ),
        },
        {   
            name: 'Actions',
            cell: row => (
                <h5 style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteAttendee(row.id)} ><Icon name="delete" />Delete</h5>
            ),
            maxWidth: '100px',
        },
    ]

    const TalkAttendeeColumn = [
        {
            name: 'Full Name',
            selector: 'full_name',
            sortable: true,
            cell: row => (
                    <h4>{row.full_name}</h4>
            ),
        },
        {
            name: 'Email address',
            selector: 'email',
            sortable: true,
            cell: row => (
                    <h4>{row.email}</h4>
            ),
        },
        {   
            name: 'Actions',
            cell: row => (
                <h5 style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteTalkAttendee( row.talk_id,row.id)} ><Icon name="delete" />Delete</h5>
            ),
            maxWidth: '100px',
        },
    ]
    return (
        <div>
            <DataTable
                columns={ attendee ? AttendeeColumn : talkAttendee ? TalkAttendeeColumn : column}
                data={data}
                customStyles={customStyles}
                pagination
                noHeader
                defaultSortField="talk_date"
                defaultSortAsc={false}
            />
        </div>
    )
}

export default Datatable;

Datatable.propTypes = {
    attendee: PropTypes.bool
}
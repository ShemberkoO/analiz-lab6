import React from 'react';
import UsersMarksTable from './UserMarksTable';
import ExpertsMarksTable from './ExpertsMarksTable';
export default function MarksPage () {

    return (
    <div className='container-fluid'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-8'>
            <ExpertsMarksTable></ExpertsMarksTable>
            </div>
            
        </div>
        <div className='row'>
            <UsersMarksTable></UsersMarksTable>
        </div>
    </div>);
}

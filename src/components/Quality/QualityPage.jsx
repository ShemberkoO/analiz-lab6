import React from 'react';
import ExpertsVagTable from './ExpertsVagTable';
import CountsResultTable from './CountsResultTable'
export default function QualityPage () {

    return (
    <div className='container-fluid'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-8'>
            <ExpertsVagTable/>
            </div>
            
        </div>
        <div className='row'>
           <CountsResultTable></CountsResultTable>
        </div>
    </div>);
}

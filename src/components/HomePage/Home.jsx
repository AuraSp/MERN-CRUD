import React, { Fragment } from 'react';
import {
    Link
} from "react-router-dom";

import './home.css';

function Home() {

    return (
        <Fragment className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 navigation d-flex flex-row justify-content-center text-center align-items-center pt-6'>
                <Link to="/students" className='navItem fw-bold mx-1 p-2'>Students Archive</Link>
                <Link to="/teachers" className='navItem fw-bold mx-1 p-2'>Teachers Archive</Link>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                <span className='d-flex justify-content-center align-items-center fw-bold fs-italic app-title'>Digital School Archive</span>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 navigation d-flex flex-row justify-content-center text-center align-items-center pb-5'>
                <a href='https://cloud.mongodb.com/v2' className='navItem fw-bold p-2'>Go to MongoDB</a>
            </div>
        </Fragment>
    )
}

export default Home
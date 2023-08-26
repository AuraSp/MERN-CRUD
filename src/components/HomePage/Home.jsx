import React from 'react';
import {
    Link
} from "react-router-dom";

import './home.css';

function Home() {
    return (
        <div className="row h-100 w-100">
            <div className='col-12 d-flex align-items-center justify-content-center top-block'>
                <Link to="/students" className='top-link text-white py-1 px-3 fw-bold'>Go to archive</Link>
            </div>
            <div className='col-12 text-center d-flex align-items-center justify-content-center mid-block'>
                <h1 className=" text-white fw-bold mid-title">Digital School Archive</h1>
            </div>
            <div className='col-12 d-flex align-items-center justify-content-center bottom-block'>
                <button type='button'
                    onClick={() => window.open('https://www.mongodb.com/', '_blank')}
                    className="bottom-link text-white py-1 px-3 fw-bold">Go to MongoDB
                </button>
            </div>
        </div>
    )
}

export default Home
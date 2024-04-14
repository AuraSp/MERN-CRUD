import React from 'react';
import {
    Link
} from "react-router-dom";
import Header from './v2/Shared/Header/Header';

import './Home.css';


function Home({ version, onToggle, screenSize }) {

    return (
        <div className="row w-100 h-100 d-flex flex-column">

            {['small'].includes(screenSize) ?
                <Header version={version} screenSize={screenSize} onToggle={onToggle} />
                :
                <div className='col-12 d-flex justify-content-center flex-wrap align-items-center position-relative top-block'>
                    <Link to={`${version}/students`} className='py-1 px-3 text-white fw-bold border rounded-5 top-link'>Go to archive</Link>
                    <div className='version-change position-absolute top-0 end-0 border'>
                        <button onClick={onToggle} className='main-version position-absolute top-50 start-50 translate-middle w-100 h-100 text-center bg-transparent border-0 text-white'>Go to v1</button>
                        <div className='particle-version position-absolute rounded-circle'></div>
                    </div>
                </div>
            }

            <div className='col-12 d-flex justify-content-center align-items-center mid-block'>
                <h1 className="text-light text-center fw-bold mid-title">Digital Archive</h1>
            </div>


            <div className='col-12 d-flex justify-content-center align-items-center bottom-block'>
                <button type='button'
                    onClick={() => window.open('https://www.mongodb.com/', '_blank')}
                    className="py-1 px-3 text-white fw-bold border rounded-5 bottom-link ">Go to MongoDB
                </button>
            </div>

        </div>
    )
}

export default Home
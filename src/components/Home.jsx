import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";

import './Home.css';
import Header from './v2/Shared/Header/Header';

function Home({ version, onToggle }) {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);


    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="row w-100 h-100 d-flex flex-column">
            {isSmallScreen ?
                <Header version={version}/>
                :
                <div className='col-12 d-flex justify-content-center align-items-center top-block'>
                    <Link to={`${version}/students`} className='py-1 px-3 text-white fw-bold border rounded-5 top-link'>Go to archive</Link>
                    <div className='version-change position-absolute top-0 end-0 border'>
                        <button onClick={onToggle} className='main-version position-absolute top-50 start-50 translate-middle w-100 h-100 text-center bg-transparent border-0 text-white'>Go to v1</button>
                        <div className='particle-version position-absolute rounded-circle'></div>
                    </div>
                </div>

            }

            <div className={`col-12 d-flex justify-content-center align-items-${isSmallScreen ? 'center' : 'center'} mid-block`}>
                <h1 className="text-white fw-bold mid-title">Digital Archive</h1>
            </div>

            {!isSmallScreen && (
                <div className='col-12 d-flex justify-content-center align-items-center bottom-block'>
                    <button type='button'
                        onClick={() => window.open('https://www.mongodb.com/', '_blank')}
                        className="py-1 px-3 text-white fw-bold border rounded-5 bottom-link ">Go to MongoDB
                    </button>
                </div>
            )}

        </div>
    )
}

export default Home
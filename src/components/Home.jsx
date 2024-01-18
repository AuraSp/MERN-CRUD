// import React, { useState, useEffect } from 'react';

// import HeaderSM from '../Shared/Header/Header-sm';
// import HeaderLGMG from '../Shared/Header/Header-lg-md';

// import './home.css';

// function Home() {

//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth < 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <div className="row h-100 w-100">
//             {isSmallScreen ? <HeaderSM /> : <HeaderLGMG />}
//             <div className={`col-12 d-flex justify-content-center align-items-${isSmallScreen ? 'start' : 'center'} pt-${isSmallScreen ? '5' : '0'} mid-block`}>
//                 <h1 className="text-white fw-bold mid-title">Digital Archive</h1>
//             </div>
//             {!isSmallScreen && (
//                 <div className='col-12 d-flex justify-content-center align-items-center bottom-block'>
//                     <button type='button'
//                         onClick={() => window.open('https://www.mongodb.com/', '_blank')}
//                         className="py-1 px-3 text-white fw-bold bottom-link ">Go to MongoDB
//                     </button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Home

import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";

import './Home.css';

function Home({ version, onToggle }) {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isNavOpen, setIsNavOpen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const showNavbar = () => {
        setIsNavOpen(true);
    };

    const closeNavbar = () => {
        setIsNavOpen(false);
    };

    return (
        <div className="row w-100 h-100 d-flex flex-column">
            {isSmallScreen ?

                <div className='col-12 top-block'>
                    <div className='d-flex justify-content-end align-items-center px-5 py-5 navigation'>
                        <button onClick={showNavbar}
                            className={`text-white ${isNavOpen ? 'opacity-0' : ''} border-0 bg-transparent btn--open`}>
                        </button>
                        <nav className={`vh-100 w-100 flex-column justify-content-center align-items-center nav-block ${isNavOpen ? 'show-nav' : ''}`}>
                            <Link  to={`${version}/students`} className='my-3 fs-1 text-white fw-bold'>Students</Link>
                            <Link to={`${version}/students`} className='my-3 fs-1 text-white fw-bold'>Teachers</Link>
                            <button onClick={closeNavbar} className='text-white border-0 bg-transparent px-5 py-3 btn--close'>&#215;</button>
                        </nav>
                    </div>
                </div>

                :

                <div className='col-12 d-flex justify-content-center align-items-center top-block'>
                    <Link to={`${version}/students`} className='py-1 px-3 text-white fw-bold top-link'>Go to archive</Link>
                    <div className='version-change'>
                        <button onClick={onToggle} className='main-version'>Go to v1</button>
                        <div className='particle-version'></div>
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
                        className="py-1 px-3 text-white fw-bold bottom-link ">Go to MongoDB
                    </button>
                </div>
            )}

        </div>
    )
}

export default Home
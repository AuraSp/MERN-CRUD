import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";

import { VscGithub } from "react-icons/vsc";

import './Header.css';
const archive = `${process.env.PUBLIC_URL}/assets/app/archive.png`;
function Header() {

    const [screenSize, setScreenSize] = useState('');
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setScreenSize('small');
            } else if (width >= 768 && width <= 1200) {
                setScreenSize('medium');
            } else {
                setScreenSize('large');
            }
        };

        // Initial call to set the initial screen size
        handleResize();

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
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

        <>
            {screenSize === 'small' && (
                <div className='col-12 top-block'>
                    <div className='d-flex justify-content-end align-items-center px-5 py-5 small-screen'>
                        <button onClick={showNavbar}
                            className={`text-white ${isNavOpen ? 'opacity-0' : ''} border-0 bg-transparent btn--open`}>
                        </button>
                        <nav className={`vh-100 w-100 flex-column justify-content-center align-items-center nav-block ${isNavOpen ? 'show-nav' : ''}`}>
                            <Link to="/" onClick={closeNavbar} className='my-3 fs-1 text-white fw-bold'>Home</Link>
                            <Link to="/students" onClick={closeNavbar} className='my-3 fs-1 text-white fw-bold'>Students</Link>
                            <Link to="/teachers" onClick={closeNavbar} className='my-3 fs-1 text-white fw-bold'>Teachers</Link>
                            <button onClick={closeNavbar} className='text-white border-0 bg-transparent px-5 py-3 btn--close'>&#215;</button>
                        </nav>
                    </div>
                </div>
            )}

            {screenSize === 'medium' && (
                <div className='col-12 d-flex justify-content-center align-items-center text-white top-block'>
                    <div className='w-75 rounded-pill d-flex align-items-center px-5 py-3 shared--header'>
                        <div className='medium-screen'>
                            <button onClick={showNavbar}
                                className={`text-white ${isNavOpen ? 'opacity-0' : ''} border-0 bg-transparent btn--open`}>
                            </button>
                            <nav className={`vh-100 w-100 flex-column justify-content-center align-items-center nav-block ${isNavOpen ? 'show-nav' : ''}`}>
                                <Link to="/" onClick={closeNavbar} className='my-3 fs-1 text-white fw-bold'>Home</Link>
                                <Link to="/students" onClick={closeNavbar} className='my-3 fs-1 text-white fw-bold'>Students</Link>
                                <Link to="/teachers" onClick={closeNavbar} className='my-3 fs-1 text-white fw-bold'>Teachers</Link>
                                <button onClick={closeNavbar} className='text-white border-0 bg-transparent px-5 py-3 btn--close'>&#215;</button>
                            </nav>
                        </div>
                        <div className='d-flex justify-content-center medium-screen-title'>
                            <img src={archive} width={40} height={40} className='mx-3' />
                            <h2>DIGITAL ARCHIVE</h2>
                        </div>
                        <div className='text-end medium-screen-link'>
                            <button type='button'
                                onClick={() => window.open('https://github.com/AuraSp/MERN-crud', '_blank')}
                                className='border-0 bg-transparent text-white'>
                                <VscGithub className='fs-1 icon' />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {screenSize === 'large' && (
                <div className='col-12 d-flex justify-content-center align-items-center text-white top-block'>
                    <div className='w-50 rounded-pill d-flex align-items-center px-5 py-3 shared--header'>
                        <div className='d-flex justify-content-center align-items-center large-screen-title'>
                            <img src={archive} alt='archive' width={40} height={40} className='mx-3' />
                            <h2>DIGITAL ARCHIVE</h2>
                        </div>
                        <div className='text-end large-screen-link'>
                            <button type='button'
                                onClick={() => window.open('https://github.com/AuraSp/MERN-crud', '_blank')}
                                className='border-0 bg-transparent text-white'>
                                <VscGithub className='fs-1 icon' />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
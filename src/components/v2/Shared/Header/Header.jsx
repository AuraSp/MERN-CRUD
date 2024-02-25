import React, { useState, useEffect } from 'react';
import {
    Link, useLocation
} from "react-router-dom";

import { VscGithub } from "react-icons/vsc";

import './Header.css';
const archive = `${process.env.PUBLIC_URL}/assets/app/archive.png`;


function Header({ version, screenSize }) {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const { pathname } = useLocation();
    console.log(pathname)


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
                    <div className={`d-flex ${pathname === `${version}/students` || pathname === `${version}/teachers` ? 'justify-content-between' : 'justify-content-end'} py-4 px-5 position-relative z-1 small-screen`}>

                        {pathname === `${version}/students` || pathname === `${version}/teachers` ? (
                            <h5 className='text-white'>Digital Archive</h5>
                        ) : <></>}
                        <button onClick={showNavbar}
                            className={`text-white ${isNavOpen ? 'opacity-0' : ''} border-0 bg-transparent btn--open`}>
                        </button>
                        {isNavOpen &&
                            <nav className='vh-100 w-100 flex-column justify-content-center align-items-center nav-block d-flex position-fixed top-0 start-0'>
                                <Link to="/" onClick={closeNavbar} className='position-relative my-3 fs-1 text-white fw-bold'>Home</Link>
                                <Link to={`${version}/students`} onClick={closeNavbar} className='position-relative my-3 fs-1 text-white fw-bold'>Students</Link>
                                <Link to={`${version}/teachers`} onClick={closeNavbar} className='position-relative my-3 fs-1 text-white fw-bold'>Teachers</Link>
                                <button onClick={closeNavbar} className='text-white border-0 bg-transparent px-5 py-3 position-absolute top-0 end-0 btn--close'>&#215;</button>
                            </nav>
                        }
                    </div>
                </div >
            )
            }

            {
                screenSize === 'medium' && (
                    <div className='col-12 d-flex justify-content-center align-items-center text-white top-block z-1'>
                        <div className='w-75 rounded-pill d-flex align-items-center px-5 py-3 shared--header'>
                            <div className='medium-screen'>
                                <button onClick={showNavbar}
                                    className={`text-white ${isNavOpen ? 'opacity-0' : ''} border-0 bg-transparent btn--open`}>
                                </button>
                                <nav className={`vh-100 w-100 flex-column justify-content-center align-items-center nav-block ${isNavOpen ? 'd-flex position-fixed top-0 start-0' : 'd-none'}`}>
                                    <Link to="/" onClick={closeNavbar} className='position-relative my-3 fs-1 text-white fw-bold'>Home</Link>
                                    <Link to={`${version}/students`} onClick={closeNavbar} className='position-relative my-3 fs-1 text-white fw-bold'>Students</Link>
                                    <Link to={`${version}/teachers`} onClick={closeNavbar} className='position-relative my-3 fs-1 text-white fw-bold'>Teachers</Link>
                                    <button onClick={closeNavbar} className='text-white border-0 bg-transparent px-5 py-3 position-absolute top-0 end-0 btn--close'>&#215;</button>
                                </nav>
                            </div>
                            <div className='d-flex justify-content-center flex-grow-1 medium-screen-title'>
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
                )
            }

            {
                screenSize === 'large' && (
                    <div className='col-12 d-flex justify-content-center align-items-center text-white top-block'>
                        <div className='w-50 rounded-pill d-flex align-items-center px-5 py-3 shared--header'>
                            <div className='d-flex justify-content-center align-items-center flex-grow-1 large-screen-title'>
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
                )
            }
        </>
    )
}

export default Header
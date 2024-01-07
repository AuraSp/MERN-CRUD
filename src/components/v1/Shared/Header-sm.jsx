// import React, { useRef, useState } from 'react';
// import {
//     Link
// } from "react-router-dom";

// import './Header.css';

// function HeaderSM() {

//     const navRef = useRef();
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     const showNavbar = () => {
//         setIsNavOpen(!isNavOpen);
//         navRef.current.classList.toggle('responsive-nav');
//     }
//     return (
//         <div className='col-12 top-block'>
//             <div className='d-flex justify-content-end align-items-center px-5 py-4 screen-sm'>
//                 <button onClick={showNavbar}
//                     className={`text-white nav-btn btn--open ${isNavOpen ? 'opacity-0' : ''}`}>
//                 </button>
//                 <nav ref={navRef} className='vh-100 w-100 flex-column justify-content-center align-items-center nav-block'>
//                     <Link to="/" className='my-3 fs-1 text-white fw-bold'>Home</Link>
//                     <Link to="/students" className='my-3 fs-1 text-white fw-bold'>Students</Link>
//                     <Link to="/teachers" className='my-3 fs-1 text-white fw-bold'>Teachers</Link>
//                     <button className='px-5 text-white nav-btn btn--close'>&#215;</button>
//                 </nav>
//             </div>
//         </div>
//     )
// }

// export default HeaderSM
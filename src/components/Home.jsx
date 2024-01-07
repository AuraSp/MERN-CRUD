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
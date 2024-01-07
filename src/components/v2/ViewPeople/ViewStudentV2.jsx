import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { BiFilter, BiTrash, BiEditAlt } from "react-icons/bi";
import StudentCard from './StudentCard';
import './ViewInfo.css';
import Header from '../Shared/Header/Header';

const home = `${process.env.PUBLIC_URL}/assets/app/home.png`;
const arrow = `${process.env.PUBLIC_URL}/assets/app/arrow.png`;

function ViewStudentV2({ version }) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [checkedUserIds, setCheckedUserIds] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const getUsers = async () => {
        setLoading(true);
        const response = await fetch(`https://api-for-mern-app.onrender.com/api/v2/students`);
        const users = await response.json();
        // console.info(users);
        setUsers(users.data.students);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleCheckboxChange = (userId) => {
        setCheckedUserIds((prevState) => {
            const updatedUserIds = prevState.includes(userId)
                ? prevState.filter((id) => id !== userId)
                : [...prevState, userId];

            // Uncheck 'Check All' if all users is unchecked separately
            const allUnchecked = users.every((user) => !updatedUserIds.includes(user._id));

            // Update isCheckAll accordingly
            setIsCheckAll(!allUnchecked);

            return updatedUserIds;
        });
    };


    const handleCheckAllChange = () => {
        console.log('g')
        setIsCheckAll((prevIsCheckAll) => {
            console.log(isCheckAll)
            if (prevIsCheckAll) {
                setCheckedUserIds([]);
            } else {
                setCheckedUserIds(users.map(({ _id }) => _id));
            }
            return !prevIsCheckAll;
        });
    };

    const handlePopupClose = () => {
        setCheckedUserIds([]);
        setIsCheckAll(!isCheckAll);
    };

    const handleFormClick = () => {
        setIsFormOpen(!isFormOpen);
    }

    const handleFilterClick = () => {
        setIsFilterOpen(!isFilterOpen);
    }


    const { pathname } = useLocation();

    const [tableHeight, setTableHeight] = useState();
    const [tbodyHeight, setTbodyHeight] = useState();

    const sectionRef = useRef(null);
    const tbodyRef = useRef(null);
    const tableRef = useRef(null);


    useEffect(() => {
        const calculateTableHeight = () => {
            const sectionHeight = sectionRef.current.clientHeight;
            const newTableHeight = `calc(100% - ${sectionHeight}px)`;
            const tbodyHeight = tbodyRef.current.clientHeight;

            setTableHeight(newTableHeight);
            setTbodyHeight(`calc(${tableHeight} + 12px)`);
            // console.log(tableHeight, tbodyHeight);


        };

        calculateTableHeight();

        // Attach a resize event listener to handle changes when the window is resized
        window.addEventListener('resize', calculateTableHeight);

        return () => {
            // Remove the resize event listener when the component unmounts
            window.removeEventListener('resize', calculateTableHeight);
        };
    }, [tableHeight]);

    return (
        <div className='row w-100'>
            <Header />
            <div className='mid-block'>
                <nav className='table-nav-block'>
                    <NavLink to="/" className={`page-links ${pathname === '/' ? 'active' : ''}`}>
                        <img src={home} alt="Home" className='me-3' />
                        Home
                    </NavLink>
                    <NavLink to={`${version}/students`} className={`page-links ${pathname === '/students' ? 'active' : ''}`}>Students Archive</NavLink>
                    <NavLink to={`${version}/teachers`} className={`page-links ${pathname === '/teachers' ? 'active' : ''}`}>Teachers Archive</NavLink>
                </nav>
                <div className='table-wrapper pt-4 pb-4 px-3'>
                    <section className='d-flex align-items-center justify-content-between table-controls mb-2 mx-4' ref={sectionRef}>
                        <button className='filter-control bg-transparent text-white py-1 px-2' onClick={handleFilterClick}><BiFilter className='mx-2 fs-4' />Filter people</button>

                        <span className='rows-length'> {users.length} {users.length === 1 ? 'student' : 'students'} counted</span>
                        <button className='add-control text-white py-1 px-4' onClick={handleFormClick}>+ New Student</button>

                        {isFormOpen && (
                            <div className='form-overlay'>
                                <div className='form-overlay-content'>
                                    This is the content of the overlay
                                    <button className='form-close-button' onClick={() => setIsFormOpen(false)}>X</button>
                                </div>
                            </div>
                        )}

                    </section>
                    <table className='w-100' ref={tableRef} style={{ height: tableHeight }}>
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox'
                                        checked={isCheckAll}
                                        onChange={handleCheckAllChange}
                                    />
                                </th>
                                <th>Name, Surname</th>
                                <th>Birthdate</th>
                                <th>Town</th>
                                <th>Program</th>
                                <th>Group</th>
                            </tr>
                        </thead>
                        <tbody ref={tbodyRef} style={{ height: tbodyHeight }}>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <StudentCard
                                        key={user.id}
                                        data={user}
                                        checked={checkedUserIds.includes(user._id)}
                                        onCheckboxChange={() => handleCheckboxChange(user._id)}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td className='w-100 pt-5'>No users found. Add a new user by pressing '+ New Student' button <img src={arrow} alt='arrow-up' className='ms-5' /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='bottom-block'>
                {checkedUserIds.length > 0 && (
                    <div className="popup-container h-100 d-flex align-items-center justify-content-center">
                        <div className="popup w-50 d-flex justify-content-between align-items-center rounded-pill py-3 px-4">
                            <div className="left-section d-flex align-items-center">
                                <button className="close-button border-0 bg-transparent text-white fs-4 mx-3" onClick={handlePopupClose}>X</button>
                                <div className="checked-count text-white"><span className='rounded-pill'>{checkedUserIds.length}</span> {checkedUserIds.length === 1 ? 'student' : 'students'} selected</div>
                            </div>
                            <div className="right-section d-flex">
                                <button className="action-button border-0 bg-danger rounded-pill me-1 text-white"><BiTrash className='me-1 fs-5' />Delete</button>
                                <button className="action-button border-0 rounded-pill ms-1 text-white"><BiEditAlt className='me-1 fs-5' />Edit</button>
                            </div>
                        </div>
                    </div>
                )}

                {isFilterOpen && (
                    <div className='popup-container h-100 filter-overlay d-flex align-items-center justify-content-center'>
                        <div className='popup w-50 rounded-pill filter-content py-3 px-4'>
                            This is the content for the filter
                            <button className='filter-close-button' onClick={() => setIsFilterOpen(false)}>X</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewStudentV2;
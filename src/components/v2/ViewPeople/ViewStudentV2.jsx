import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { BiFilter, BiTrash, BiEditAlt } from "react-icons/bi";
import StudentCard from './StudentCard';
import './ViewInfo.css';
import Header from '../Shared/Header/Header';
import FormComponent from '../AddPeople/FormComponent';
import Actions from '../Shared/Actions/Actions';
import EditComponent from '../EditPeople/EditComponent';

const home = `${process.env.PUBLIC_URL}/assets/app/home.png`;
const arrow = `${process.env.PUBLIC_URL}/assets/app/arrow.png`;

function ViewStudentV2({ version }) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userType, setUserType] = useState([]);
    const [checkedUserIds, setCheckedUserIds] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isRendering, setIsRendering] = useState(false);
    const [query, setQuery] = useState('');
    const [editingUserIds, setEditingUserIds] = useState([]);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api-for-mern-app.onrender.com/api/v2/students`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const users = await response.json();
            setUsers(users.data.students);
            setUserType(users.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getUsers();
    }, [isRendering]);

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

            setTableHeight(newTableHeight);
            setTbodyHeight(`calc(${newTableHeight} - 20px)`);
        };

        calculateTableHeight();

        window.addEventListener('resize', calculateTableHeight);

        return () => {
            window.removeEventListener('resize', calculateTableHeight);
        };
    }, []);



    const keys = ["name", "surname", "town", "birthdate", "program", "group", "subject", "subjectGroup"];

    const search = (data) => {
        return data.filter(
            (item) =>
                keys.some((key) => {
                    const value = item[key];
                    return value && typeof value === 'string' && value.toLowerCase().includes(query);
                })
        );
    };

    return (
        <div className='row w-100 h-100 d-flex flex-column'>
            <Header version={version} />
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
                        <div className='filter-control py-1 px-3'>
                            <BiFilter className='fs-4' />
                            <span className='ms-3'>Filter people</span>
                            <input type='text' onChange={(e) => setQuery(e.target.value)} className='filter-input' />
                        </div>

                        <span className='rows-length'> {users.length} {users.length === 1 ? 'student' : 'students'} counted</span>
                        <button className='add-control text-white py-1 px-4' onClick={() => setIsFormOpen(true)}>+ New Student</button>

                        {isFormOpen &&
                            <FormComponent userType={userType} setIsFormOpen={setIsFormOpen} setIsRendering={setIsRendering} />}
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
                            {!loading ? (
                                search(users).length > 0 ? (
                                    search(users).map((user) => (
                                        editingUserIds.includes(user._id) ? (
                                            <EditComponent
                                                key={user._id} />
                                        ) : (
                                            <StudentCard
                                                key={user._id}
                                                data={user}
                                                checked={checkedUserIds.includes(user._id)}
                                                onCheckboxChange={() => handleCheckboxChange(user._id)}
                                            />
                                        )
                                    ))
                                ) : (
                                    <tr>
                                        <td className='w-100 pt-5'>No users found. Add a new user by pressing '+ New Student' button <img src={arrow} alt='arrow-up' className='ms-5' /></td>
                                    </tr>
                                )) :
                                <tr>
                                    <td colSpan={3} className=''>
                                        <div className='loader-wrapper d-flex flex-column align-items-center justify-content-center position-relative'>
                                            <div className="circle"></div>
                                            <div className="circle"></div>
                                            <div className="circle"></div>
                                            <span className='loader-text position-absolute'>Loading...one sec</span>
                                        </div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='bottom-block'>
                {checkedUserIds.length > 0 && (
                    <Actions
                        setIsRendering={setIsRendering}
                        users={users}
                        setUsers={setUsers}
                        handlePopupClose={handlePopupClose}
                        setCheckedUserIds={setCheckedUserIds}
                        checkedUserIds={checkedUserIds}
                        setIsCheckAll={setIsCheckAll}
                        isCheckAll={isCheckAll}
                        setEditingUserIds={setEditingUserIds} />
                )}
            </div>
        </div>
    )
}

export default ViewStudentV2;
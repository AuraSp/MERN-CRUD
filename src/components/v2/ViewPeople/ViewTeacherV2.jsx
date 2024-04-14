import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import TeacherCard from './TeacherCard';
import Header from '../Shared/Header/Header';
import FormComponent from '../AddPeople/FormComponent';
import EditComponent from '../EditPeople/EditComponent';

import { BiFilter, BiTrash, BiEditAlt } from "react-icons/bi";
import './ViewInfo.css';
import '../Shared/@Media/@Media.css';

const home = `${process.env.PUBLIC_URL}/assets/app/home.png`;
const arrow = `${process.env.PUBLIC_URL}/assets/app/arrow.png`;


function ViewTeacherV2({ version, screenSize }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [query, setQuery] = useState('');
  const [tableHeight, setTableHeight] = useState();
  const [tbodyHeight, setTbodyHeight] = useState();


  const [selectedUserIds, setSelectedUserIds] = useState({
    checked: [],
    editing: []
  });

  const { pathname } = useLocation();
  const sectionRef = useRef(null);
  const tbodyRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL_TEACHERS);
        if (!response.ok) {
          throw new Error('%cFailed to fetch data', 'color:red');
        }
        const users = await response.json();
        setUsers(users.data.teachers);
        setUserType(users.data);
      } catch (error) {
        console.error('%cError fetching data:', 'color:red', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();

  }, [isRendering]);

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevState) => {
      const updatedCheckedUserIds = prevState.checked.includes(userId)
        ? prevState.checked.filter((id) => id !== userId)
        : [...prevState.checked, userId];

      // Uncheck 'Check All' if all users are unchecked separately
      const allUnchecked = users.every((user) => !updatedCheckedUserIds.includes(user._id));

      // Update isCheckAll accordingly
      setIsCheckAll(!allUnchecked);

      return { ...prevState, checked: updatedCheckedUserIds };
    });
  };



  const handleCheckAllChange = () => {
    setSelectedUserIds((prevState) => {
      const allCheckedIds = isCheckAll ? [] : users.map(({ _id }) => _id);

      // Close all opened editing rows
      const editingUserIds = isCheckAll ? [] : prevState.editing;

      return { checked: allCheckedIds, editing: editingUserIds };
    });
    setIsCheckAll((prevIsCheckAll) => !prevIsCheckAll);
  };



  const handlePopupClose = () => {
    setSelectedUserIds({
      checked: [],
      editing: []
    });

    setIsCheckAll(false);
  };



  useEffect(() => {
    const calculateTableHeight = () => {
      const sectionHeight = sectionRef.current?.clientHeight || 0;
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
    const queryWords = query.toLowerCase().split(' ');

    return data.filter(
      (item) =>
        queryWords.every((queryWord) =>
          keys.some((key) => String(item[key]).toLowerCase().includes(queryWord))
        )
    );
  };






  function onDelete(e) {
    e.preventDefault();
    Swal
      .fire({
        heightAuto: false,
        title: 'Are you sure?',
        text: 'This data will be lost forever',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      })
      .then((result) => {
        if (result.isConfirmed) {

          // Perform delete operation for each checked user
          selectedUserIds.checked.forEach((id) => {
            // Update state to remove the deleted user
            const usersDelete = users.filter((user) => user._id !== id);
            setUsers(usersDelete);
            setSelectedUserIds((prevState) => ({
              ...prevState,
              checked: [],
            }));
            setIsCheckAll(false);

            fetch(`${process.env.REACT_APP_API_URL_TEACHERS}${id}`, { method: 'DELETE' })
              .then(() => console.warn(`%c${id} was deleted successfully`, 'color:orange'));

            setIsRendering(prevState => !prevState);
          });

          Swal.fire('Data has been deleted!', '', 'success')
        } else if (result.isDenied) {
          Swal.close();
        };
      });
  };


  const onEdit = (e) => {
    e.preventDefault();
    setSelectedUserIds((prevState) => ({
      checked: prevState.checked,
      editing: prevState.checked
    }));

  };


  const onSubmitEdit = (userId, data) => {

    if (data.birthdate instanceof Date) {
      // Adjust the date by adding one day
      data.birthdate.setDate(data.birthdate.getDate() + 1);
      data.birthdate = data.birthdate.toISOString().slice(0, 10); // Convert to YYYY-MM-DD format
    }

    console.log(data)

    fetch(process.env.REACT_APP_API_URL_TEACHERS + userId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        data
      )
    })
      .then(response => response.json())
      .then(updatedData => {
        console.info('%cSuccess:', 'color:green', updatedData);


        setSelectedUserIds((prevState) => ({
          ...prevState,
          editing: prevState.editing.filter(id => id !== userId)
        }));

        const updatedUsers = users.map(user => (user._id === userId ? { ...user, ...data } : user));
        setUsers(updatedUsers);

        if (selectedUserIds.editing.length === 1) {
          setIsRendering(prevState => !prevState);
        }
      })
      .catch((error) => {
        console.error('%cError:', 'color:red', error);
      });

  };

  const onCancelEdit = (userId) => {
    setSelectedUserIds((prevState) => ({
      checked: ['small', 'medium'].includes(screenSize)
        ? prevState.checked.filter((id) => id !== userId)
        : prevState.checked,
      editing: prevState.editing.filter((id) => id !== userId)
    }));
  };

  return (
    <div className='row w-100 h-100 d-flex flex-column'>
      <Header version={version} screenSize={screenSize} />
      <div className='mid-block'>
        <nav className={`table-nav-block d-${['small', 'medium'].includes(screenSize) ? 'none' : 'flex'}`}>
          <NavLink to="/" className={`page-links py-1 px-5 text-white text-center d-flex align-items-center ${pathname === '/' ? 'active' : ''}`}>
            <img src={home} alt="Home" className='me-3' />
            Home
          </NavLink>
          <NavLink to={`${version}/students`} className={`page-links py-1 px-5 text-white text-center ${pathname === '/students' ? 'active' : ''}`}>Students Archive</NavLink>
          <NavLink to={`${version}/teachers`} className={`page-links py-1 px-5 text-white text-center position-relative ${pathname === '/teachers' ? 'active' : ''}`}>Teachers Archive</NavLink>
        </nav>
        <div className={`table-wrapper w-100 py-4 px-3 flex-grow-1 flex-shrink-1 overflow-hidden rounded-${['small', 'medium'].includes(screenSize) ? '5' : ''}`}>
          <section className={`d-${['small', 'medium'].includes(screenSize) ? 'none' : 'flex'} align-items-center justify-content-between table-controls text-white mb-2 mx-4`}
            ref={sectionRef}>
            <div className='filter-control border border-2 rounded-pill py-1 px-3 position-relative text-center'>
              <BiFilter className='fs-4 position-absolute top-50 rounded-circle' />
              <span className='ms-3'>Filter people</span>
              <input type='text' onChange={(e) => setQuery(e.target.value.trim())} className='filter-input position-absolute top-0 start-0 w-100 h-100 border-0 rounded-pill' />
            </div>

            <span className='rows-length'> {users.length} {users.length === 1 ? 'teacher' : 'teachers'} counted</span>
            <button className='add-control border border-2 rounded-pill text-white py-1 px-4' onClick={() => setIsFormOpen(true)}>+ New Teacher</button>
          </section>

          {isFormOpen &&
            <FormComponent userType={userType} setIsFormOpen={setIsFormOpen} setIsRendering={setIsRendering} />}

          <table className={`w-100 d-block rounded-5 ${['small', 'medium'].includes(screenSize) ? 'overflow-auto h-100' : 'overflow-hidden'}`} ref={tableRef} style={{ height: tableHeight }}>
            <thead className={`bg-light text-dark w-100 overflow-x-hidden d-${['small', 'medium'].includes(screenSize) ? 'none' : 'block'}`}>
              <tr className='d-block w-100 text-center position-relative py-3'>
                <th>
                  <input type='checkbox'
                    checked={isCheckAll}
                    onChange={handleCheckAllChange}
                  />
                </th>
                <th>Name, Surname</th>
                <th>Birthdate</th>
                <th>Town</th>
                <th>Subject</th>
                <th>Subject Group</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef} style={{ height: tbodyHeight }} className={`w-100 overflow-y-auto d-block position-relative ${['small', 'medium'].includes(screenSize) ? 'px-2' : 'bg-white'}`}>
              {!loading ? (
                search(users).length > 0 ? (
                  search(users).map((user) => (
                    selectedUserIds.editing.includes(user._id) ? (
                      <EditComponent
                        key={user._id}
                        data={user}
                        onSubmitEdit={onSubmitEdit}
                        onCancelEdit={() => onCancelEdit(user._id)}
                        userType={userType}
                        screenSize={screenSize}
                        checked={selectedUserIds.checked.includes(user._id)}

                      />
                    ) : (
                      <TeacherCard
                        key={user._id}
                        data={user}
                        checked={selectedUserIds.checked.includes(user._id)}
                        onCheckboxChange={() => handleCheckboxChange(user._id)}
                        screenSize={screenSize}
                        onDelete={onDelete}
                        onEdit={onEdit}
                      />

                    )
                  ))
                ) : (
                  <tr className='empty-data__wrapper d-block w-100 text-center py-3 position-relative'>
                    <td className='empty-data__text w-100 pt-5'>
                      {['small', 'medium'].includes(screenSize) ?
                        <><span className='d-block lh-lg'>No users found. Add a new user by pressing '+ New Teacher' button</span>
                          <button className='add-control border border-2 rounded-pill text-white py-1 px-4 mt-2' onClick={() => setIsFormOpen(true)}>+ New Teacher</button></> :
                        <>
                          No users found. Add a new user by pressing '+ New Teacher' button
                          <img src={arrow} alt='arrow-up' className='ms-5' />
                        </>
                      }
                    </td>
                  </tr>
                )
              ) : (
                <tr className='loader-wrapper d-block w-100 text-center py-3 position-relative'>
                  <td colSpan={3} className='w-auto'>
                    <div className='loader-content d-flex flex-column align-items-center justify-content-center position-relative'>
                      <div className="circle position-absolute rounded-circle"></div>
                      <div className="circle position-absolute rounded-circle"></div>
                      <div className="circle position-absolute rounded-circle"></div>
                      <span className='loader-text position-absolute top-100'>Loading...one sec</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='bottom-block'>
        {!['small', 'medium'].includes(screenSize) && (
          selectedUserIds.checked.length > 0 && selectedUserIds.editing.length === 0 ? (
            <div className="popup-container h-100 d-flex align-items-center justify-content-center">
              <div className="popup w-50 d-flex justify-content-between align-items-center rounded-pill py-3 px-4">
                <div className="left-section d-flex align-items-center">
                  <button className="close-button border-0 bg-transparent text-white fs-4 mx-3" onClick={handlePopupClose}>X</button>
                  <div className="checked-count text-white"><span className='rounded-pill py-1 px-3'>{selectedUserIds.checked.length}</span> {selectedUserIds.checked.length === 1 ? 'teacher' : 'teachers'} selected</div>
                </div>
                <div className="right-section d-flex">
                  <button className="action-button border-0 bg-danger rounded-pill me-1 text-white" onClick={onDelete}><BiTrash className='me-1 fs-5' />Delete</button>
                  <button className="action-button border-0 rounded-pill ms-1 text-white" onClick={onEdit}><BiEditAlt className='me-1 fs-5' />Edit</button>
                </div>
              </div>
            </div>
          ) : null
        )
        }
      </div>
    </div>
  )
}

export default ViewTeacherV2
import React, { Fragment } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { BiSearchAlt } from "react-icons/bi";
import {
    Link,
    useSearchParams
} from "react-router-dom";
import Teacherscards from './teacherscards';
import EditInfo from '../../EditPeople/EditTeachers/editinfo';

import './teachersmain.css';

function TeachersMain() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams('');
    let [editId, setEditId] = useState("");

    const getUsers = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_PROXY_URI}/teachers`);
        const users = await response.json();
        console.info(users);
        setUsers(users.data.teachers);
        setLoading(false);
    };
    useEffect(() => {
        getUsers();
    }, []);

    //---SearchStudent---//
    const searchTerm = searchParams.get("name") || "";
    function handleSearch(e) {
        const name = e.target.value;
        if (name) {
            setSearchParams({ name });
        } else {
            setSearchParams({});
        }
    };

    //---DeleteTeacher---//
    function handleDelete(e, id) {
        Swal
            .fire({
                title: 'Are you sure?',
                text: 'This data will be lost forever',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Delete',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal
                        .fire('Data has been deleted!', '', 'success')

                    const dlt = users.filter((data) => data._id !== id);
                    setUsers(dlt);
                    fetch(`${process.env.REACT_APP_API_PROXY_URI}/teachers${id}`, { method: 'DELETE' })
                        .then(() => console.info(`${id} was deleted succesfully`));

                } else if (result.isDenied) {
                    Swal.close();
                };
            });
    };

    //---OpenEditForm---//
    const handleEdit = (e, data) => {
        e.preventDefault();
        setEditId(data._id);
    };

    //---HandleTeacherEdit---//
    const submitEdit = (e, data) => {
        e.preventDefault();
        console.log(data)
    };

    //---CancelStudentEdit---//
    function cancelEdit() {
        setEditId("");
    };

    return (
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 navigation p-4'>
                <div className='d-flex flex-row align-items-center text-center'>
                    <Link to="/" className='navItem fw-bold mx-1 p-2'>Home</Link>
                    <Link to="/students" className='navItem fw-bold mx-1 p-2'>Students Page</Link>
                    <Link to="/teachers" className='navItem fw-bold mx-1 p-2'>Teachers Page</Link>
                    <Link to="/tform" className='navItem fw-bold mx-1 p-2'>Register teacher</Link>
                    <p className='counter text-warning fs-5'>Counted users: {users.length}</p>
                    <div className='search'>
                        <label><BiSearchAlt />Search:&nbsp;</label>
                        <input type="text" value={searchTerm} onChange={handleSearch} className='text-dark' placeholder='Search students...' />
                    </div>
                </div>
            </div>
            <table className='table mt-3'>
                <thead className='thead-dark text-center'>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Birthdate</th>
                        <th>Town</th>
                        <th>Subject</th>
                        <th>Subject Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {searchParams ?
                        (!loading ?
                            users.filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase())).map((data) => (
                                <Fragment key={data._id}>
                                    {editId === data._id ? (
                                        <EditInfo
                                            data={data}
                                            onCancel={cancelEdit}
                                            onSubmit={submitEdit}
                                        />
                                    ) : (
                                        <Teacherscards
                                            id={data._id}
                                            data={data}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    )}
                                </Fragment>
                            ))
                            : <tr><td className='loader'>Loading...</td></tr>
                        ) : ''
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TeachersMain

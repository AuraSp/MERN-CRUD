import React, { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import {
    Link,
    useSearchParams
} from "react-router-dom";
import EditStudent from '../EditPeople/EditStudent';
import StudentCard from './StudentCard';

import './ViewInfo.css';

function ViewStudentV1({onToggle, version}) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams('');
    let [editId, setEditId] = useState("");

    const getUsers = async () => {
        setLoading(true);
        const response = await fetch(`https://api-for-mern-app.onrender.com/api/v2/students`);
        const users = await response.json();
        console.info(users);
        setUsers(users.data.students);
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

    //---DeleteStudent---//
    function handleDelete(e, id) {
        e.preventDefault();
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
                    fetch(`https://api-for-mern-app.onrender.com/api/v2/students/${id}`, { method: 'DELETE' })
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

    //---HandleStudentEdit---//
    const submitEdit = (e, data) => {
        e.preventDefault();
        fetch(`https://api-for-mern-app.onrender.com/api/v2/students/` + editId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                data
            )
        })
            .then(response => response.json())
            .then(data => {
                console.info('Success:', data);
                getUsers();
                cancelEdit();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    //---CancelStudentEdit---//
    function cancelEdit() {
        setEditId("");
    };

    return (
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 nav-list p-4'>
                <div className='d-flex flex-row align-items-center text-center'>
                    <Link to="/" onClick={onToggle} className='navItem fw-bold mx-1 p-2'>Home</Link>
                    <Link to={`${version}/teachers`} className='navItem fw-bold mx-1 p-2'>Teachers Page</Link>
                    <Link to={`${version}/addstudent`} className='navItem fw-bold mx-1 p-2'>Register student</Link>
                    <p className='counter text-warning fs-5 ms-3 fw-bold'>Counted users: {users.length}</p>
                    <div className='search'>
                        <label><BiSearchAlt />Search:&nbsp;</label>
                        <input type="text" value={searchTerm} onChange={handleSearch} className='text-dark' placeholder='Search students...' />
                    </div>
                </div>
                <div className='updating rounded fw-bold fs-5 mt-5 bg-primary p-1 d-flex flex-row justify-content-center'>
                    <HiOutlineSpeakerphone className='text-black mx-4 p-0 fs-3' />
                    <span className='text-black'>This page is being updated at the moment!</span>
                </div>
            </div>
            <table className='table mt-3'>
                <thead className='thead-dark text-center'>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Birthdate</th>
                        <th>Town</th>
                        <th>Program</th>
                        <th>Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {searchParams ?
                        (!loading ?
                            users.filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase())).map((data) => (
                                <Fragment key={data._id}>
                                    {editId === data._id ? (
                                        <EditStudent
                                            data={data}
                                            onCancel={cancelEdit}
                                            onSubmit={submitEdit}
                                        />
                                    ) : (
                                        <StudentCard
                                            id={data._id}
                                            data={data}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    )}
                                </Fragment>
                            ))
                            : <tr><td>Loading...</td></tr>
                        ) : ''
                    }
                </tbody>
            </table>
        </div >
    )
}

export default ViewStudentV1;
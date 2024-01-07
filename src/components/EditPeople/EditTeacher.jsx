
import React from 'react';
import { useState } from 'react';
import { MdCancel, MdCheckCircle } from "react-icons/md";

import './EditInfo.css';

function EditTeacher({ data, onCancel, onSubmit }) {
  const [name, setName] = useState(data.name);
  const [surname, setSurname] = useState(data.surname);
  const [birthdate, setBirthdate] = useState(data.birthdate);
  const [town, setTown] = useState(data.town);
  const [subject, setSubject] = useState(data.subject);
  const [subjectGroup, setSubjectGroup] = useState(data.subjectGroup);


  const editTeacher = (e) => {
    e.preventDefault();
    let updatedData = {
      name: name,
      surname: surname,
      birthdate: birthdate,
      town: town,
      subject: subject,
      subjectGroup: subjectGroup
    }
    onSubmit(e, updatedData)
  }

  return (
    <tr id='edit-row'>
      <td>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
        </input>
      </td>
      <td>
        <input
          type='text'
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        >
        </input>
      </td>
      <td>
        <input
          type='text'
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        >
        </input>
      </td>
      <td>
        <input
          type='text'
          value={data.town}
          onChange={(e) => setTown(e.target.value)}
        >
        </input>
      </td>
      <td>
        <input
          type='text'
          value={data.subject}
          onChange={(e) => setSubject(e.target.value)}
        >
        </input>
      </td>
      <td>
        <input
          type='text'
          value={data.subjectGroup}
          onChange={(e) => setSubjectGroup(e.target.value)}
        >
        </input>
      </td>
      <td>
        <button
          className='cancel border-0 btn btn-danger text-warning mt-2'
          onClick={() => { onCancel() }}><MdCancel />
        </button>
        <button
          className='check border-0 btn btn-secondary text-warning mt-2'
          onClick={(e) => { editTeacher(e) }}><MdCheckCircle />
        </button>
      </td>
    </tr >
  )
}

export default EditTeacher

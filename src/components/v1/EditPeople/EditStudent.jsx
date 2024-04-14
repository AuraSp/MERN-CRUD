import React from 'react';
import { useState } from 'react';

import { MdCancel, MdCheckCircle } from "react-icons/md";
import './EditInfo.css';

function EditStudent({ data, onCancel, onSubmit }) {

  const [name, setName] = useState(data.name);
  const [surname, setSurname] = useState(data.surname);
  const [birthdate, setBirthdate] = useState(data.birthdate);
  const [town, setTown] = useState(data.town);
  const [program, setProgram] = useState(data.program);
  const [group, setGroup] = useState(data.group);
  
  const editStudent = (e) => {
    e.preventDefault();
    let updatedData = {
        name: name,
        surname: surname,
        birthdate: birthdate,
        town: town,
        program: program,
        group: group
    }
    onSubmit(e, updatedData)
  }
    
    return (
        <tr className='edit-row align-middle'>
            <td>
                <input
                    type='text'
                    className='text-center p-1'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                     className='text-center p-1'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                     className='text-center p-1'
                    value={birthdate.slice(0,10)}
                    onChange={(e) => setBirthdate(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                     className='text-center p-1'
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                     className='text-center p-1'
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                >
                </input>
            </td>
            <td>
                <input
                    type='text'
                     className='text-center p-1'
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                </input>
            </td>
            <td>
            <button
          className='cancel border-0 btn btn-danger text-warning mt-2 me-1 fw-bold'
          onClick={() => { onCancel() }}><MdCancel className='fs-5'/>
        </button>
        <button
          className='check border-0 btn btn-secondary text-warning mt-2 ms-1 fw-bold'
          onClick={(e) => { editStudent(e) }}><MdCheckCircle className='fs-5'/>
        </button>
            </td>
        </tr >
    )
}

export default EditStudent


import React from 'react';
import { useState } from 'react';

function Editinfo({ data, onCancel, onSubmit }) {
  const [name, setName] = useState('');


  const editTeacher = (e) => {
    e.preventDefault();
    let updatedData = {
      name: name
    }
    onSubmit(e, updatedData)
  }

  return (
    <tr>
      <td>
        <input
          type='text'
          defaultValue={data.name}
          onChange={(e) => setName(e.target.value)}
        >
        </input>
      </td>

      <td>
        <button
          onClick={() => { onCancel() }}>Cancel
        </button>
        <button
          onClick={(e) => { editTeacher(e) }}> Edit
        </button>
      </td>
    </tr >
  )
}

export default Editinfo

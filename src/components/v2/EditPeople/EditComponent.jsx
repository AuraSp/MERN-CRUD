import React, { useState } from 'react';
import { MdClose, MdCheck } from "react-icons/md";

import './EditInfo.css';

function EditComponent({ data, onCancelEdit, onSubmitEdit, userType }) {
    const [combinedValues, setCombinedValues] = useState(`${data.name} ${data.surname}`);
    const [birthdate, setBirthdate] = useState(data.birthdate);
    const [town, setTown] = useState(data.town);
    const [program, setProgram] = useState(data.program);
    const [group, setGroup] = useState(data.group);
    const [subject, setSubject] = useState(data.subject);
    const [subjectGroup, setSubjectGroup] = useState(data.subjectGroup);

    const onSaveEdit = (e) => {

        const [firstname, lastname] = combinedValues
            .split(' ')
            .map((item) => item.trim());

        let obj = {
            name: firstname,
            surname: lastname,
            town: town,
            birthdate: birthdate,
            program: program,
            group: group,
            subject: subject,
            subjectGroup: subjectGroup
        }

        onSubmitEdit(e, data._id, obj);
        onCancelEdit();
    }

    return (
        <tr className='edit-rows d-block w-100 text-center py-3 position-relative'>
            <td className='edit-rows__column'>
                <button className='editbutton position-relative border-0 align-middle me-2'
                    onClick={(e) => onCancelEdit(e)} ><MdClose style={{ top: '50%', left: '50%', transform: 'translate(-100%, -50%)' }} className='position-absolute bg-danger rounded-circle text-white fs-3 p-1' /></button>
                <button className='editbutton position-relative align-middle border-0 ms-2'
                    onClick={(e) => onSaveEdit(e)} ><MdCheck style={{ top: '50%', right: '50%', transform: 'translate(100%, -50%)' }} className='position-absolute rounded-circle text-white fs-3 p-1' /></button>
            </td >


            <td>
                <input
                    type="text"
                    value={combinedValues}
                    onChange={(e) => setCombinedValues(e.target.value)}
                    className='border-0 text-center rounded-2 w-50 lh-base align-middle fw-medium'
                />
            </td>
            <td>
                <input
                    type='text'
                    value={birthdate.slice(0, 10)}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className='border-0 text-center rounded-2 w-50 lh-base align-middle fw-medium'
                />
            </td>
            <td>
                <input
                    type='text'
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className='border-0 text-center rounded-2 w-50 lh-base align-middle fw-medium'
                />
            </td>

            {userType.hasOwnProperty('students') ? (
                <>
                    <td>
                        <select

                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className='border-0 text-center rounded-2 w-50 bg-white align-middle fw-medium'
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </td>
                    <td>
                        <select

                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className='border-0 text-center rounded-2 w-50 bg-white align-middle fw-medium'
                        >
                            <option value="1">Group 1</option>
                            <option value="2">Group 2</option>
                            <option value="3">Group 3</option>
                        </select>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        <select

                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className='border-0 text-center rounded-2 w-50 bg-white align-middle fw-medium'
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </td>
                    <td>
                        <select

                            value={subjectGroup}
                            onChange={(e) => setSubjectGroup(e.target.value)}
                            className='border-0 text-center rounded-2 w-50 bg-white align-middle fw-medium'
                        >
                            <option value="1">Group 1</option>
                            <option value="2">Group 2</option>
                            <option value="3">Group 3</option>
                        </select>
                    </td>
                </>
            )}
        </tr >
    );
}

export default EditComponent;

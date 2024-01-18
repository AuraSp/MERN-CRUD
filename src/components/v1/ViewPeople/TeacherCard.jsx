import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import './Card.css'

function TeacherCard({ id, data, onEdit, onDelete }) {
    return (
        <tr className='card-row'>
            <td className='align-middle'><span>{data.name}</span></td>
            <td className='align-middle'><span>{data.surname}</span></td>
            <td className='align-middle'><span>{data.birthdate.slice(0, 10)}</span></td>
            <td className='align-middle'><span>{data.town}</span></td>
            <td className='align-middle'><span>{data.subject}</span></td>
            <td className='align-middle'><span>{data.subjectGroup}</span></td>
            <td className='align-middle'>
                <button onClick={(e) => onDelete(e, id)} className='btn btn-danger border-0 text-warning mt-2 me-1'><MdDelete />
                    <p className='delete'>Remove</p></button>
                <button onClick={(e) => onEdit(e, data)} className='btn btn-secondary border-0 text-warning mt-2 ms-1'><AiFillEdit /><p className='edit'>Edit</p></button>
            </td>
        </tr>
    )
}

export default TeacherCard;
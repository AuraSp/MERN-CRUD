import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import './Card.css'

function StudentCard({ id, data, onDelete, onEdit }) {
    return (
        <tr className='card-row'>
            <td className='align-middle'><span>{data.name}</span></td>
            <td className='align-middle'><span>{data.surname}</span></td>
            <td className='align-middle'><span>{data?.birthdate?.slice(0, 10) ?? ''}</span></td>
            <td className='align-middle'><span>{data.program}</span></td>
            <td className='align-middle'><span>{data.town}</span></td>
            <td className='align-middle'><span>{data.group}</span></td>
            <td className='align-middle'>
                <button onClick={(e) => onDelete(e, id)} className='btn btn-danger border-0 text-warning mt-2 me-1 position-relative'><MdDelete className='fs-4 delete-icon' />
                    <p className='delete-text position-absolute fw-bold'>Remove</p></button>
                <button onClick={(e) => onEdit(e, data)} className='btn btn-secondary border-0 text-warning mt-2 ms-1 position-relative'><AiFillEdit className='fs-4 edit-icon' /><p className='edit-text position-absolute fw-bold'>Edit</p></button>
            </td>
        </tr >
    )
}

export default StudentCard;
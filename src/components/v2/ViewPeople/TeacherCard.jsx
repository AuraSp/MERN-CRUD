import React from 'react';

import { BiTrash, BiEditAlt } from "react-icons/bi";
import './Card.css';


function TeacherCard({ data, checked, onCheckboxChange, screenSize, onDelete, onEdit }) {

  return (
    <tr className={`w-100 py-3 position-relative ${['small', 'medium'].includes(screenSize) ? 'my-4 px-3 rounded-5 d-flex flex-row flex-wrap text-start text-white' : 'd-block text-center'} ${checked && !['small', 'medium'].includes(screenSize) ? 'checked-border' : ''}`} data-language={data.subject}>
      <td className={`${['small', 'medium'].includes(screenSize) ? 'mb-3 w-auto order-3 position-relative' : ''}`}
      >
        <input
          type="checkbox"
          className={` ${['small', 'medium'].includes(screenSize) ? 'position-relative' : ''} input align-top text-center`}
          checked={checked}
          onChange={onCheckboxChange}
        />
        {checked && (['small', 'medium'].includes(screenSize)) && (
          <div className='small-sc__popup position-absolute start-50 translate-middle-x p-3 rounded-3 bg-light text-center z-1'>


            <button className="action-button border-0 bg-transparent text-dark mb-1" onClick={onDelete}><BiTrash className='text-danger me-2 fs-5' />Delete</button>
            <button className="action-button border-0 bg-transparent text-dark mt-1" onClick={onEdit}><BiEditAlt className='text-secondary me-2 fs-5' />Edit</button>


          </div>
        )}
      </td>
      <td className={`${['small', 'medium'].includes(screenSize) ? 'mb-3 w-auto order-1' : ''}`} data-name='Name, Surname'><span className='fw-medium'>{`${data?.name}, ${data?.surname}`}</span></td>
      <td className={`${['small', 'medium'].includes(screenSize) ? 'mb-3 w-auto order-2' : ''}`} data-name='Birthdate'><span className='fw-medium'>{data?.birthdate ? data.birthdate.slice(0, 10) : ''}</span></td>
      <td className={`${['small', 'medium'].includes(screenSize) ? 'mb-3 w-auto order-4' : ''}`} data-name='Town'><span className='fw-medium'>{data?.town}</span></td>
      <td className={`${['small', 'medium'].includes(screenSize) ? 'mb-3 w-auto order-5' : ''}`} data-name='Subject'>
        <span className='program rounded-pill d-inline-block position-relative fw-medium' data-language={data.subject} style={{ backgroundColor: `var(--language-colors-${data.subject}-primary)`, color: `var(--language-colors-${data.subject}-secondary)` }}>
          {data?.subject}
        </span>
      </td>
      <td className={`${['small', 'medium'].includes(screenSize) ? 'mb-3 w-auto order-6 text-center' : ''}`} data-name='Sub. Group'><span className='fw-medium'>{data?.subjectGroup}</span></td>
    </tr >
  )
}

export default TeacherCard
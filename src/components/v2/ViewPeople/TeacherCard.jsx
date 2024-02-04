import React from 'react'
import './Card.css'

function TeacherCard({ data, checked, onCheckboxChange }) {
  return (
    <tr className={` d-block w-100 text-center py-3 position-relative ${checked ? 'checked-border' : ''}`}>
      <td>
        <input
          type="checkbox"
          className="input align-top text-center"
          checked={checked}
          onChange={onCheckboxChange}
        />
      </td>
      <td><span className='fw-medium'>{`${data?.name}, ${data?.surname}`}</span></td>
      <td><span className='fw-medium'>{data?.birthdate?.slice(0, 10) ?? ''}</span></td>
      <td><span className='fw-medium'>{data?.town}</span></td>
      <td>
        <span className='program rounded-pill d-inline-block position-relative fw-medium' data-language={data.subject} style={{ backgroundColor: `var(--language-colors-${data.subject}-primary)`, color: `var(--language-colors-${data.subject}-secondary)` }}>
          {data?.subject}
        </span>

      </td>
      <td><span className='fw-medium'>{data?.subjectGroup}</span></td>
    </tr >
  )
}

export default TeacherCard
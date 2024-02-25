import React from 'react'
import './Card.css'

function TeacherCard({ data, checked, onCheckboxChange, screenSize }) {
  return (
    <tr className={`w-100 py-3 position-relative ${screenSize === 'small' || screenSize === 'medium' ? 'my-4 py-0 px-4 rounded-5 d-flex flex-row flex-wrap text-start text-white border-3 border-top-0 border-bottom-0 border-end-0 border-start border-danger' : 'd-block text-center'} ${checked ? 'checked-border' : ''}`}>
      <td className={`${screenSize === 'small' || screenSize === 'medium' ? 'mb-3 w-auto order-3' : ''}`}>
        <input
          type="checkbox"
          className={` ${screenSize === 'small' || screenSize === 'medium' ? 'position-relative' : ''} input align-top text-center`}
          checked={checked}
          onChange={onCheckboxChange}
        />
      </td>
      <td className={`${screenSize === 'small' || screenSize === 'medium' ? 'mb-3 w-auto order-1' : ''}`} data-name='Name, Surname'><span className='fw-medium'>{`${data?.name}, ${data?.surname}`}</span></td>
      <td className={`${screenSize === 'small' || screenSize === 'medium' ? 'mb-3 w-auto order-2' : ''}`} data-name='Birthdate'><span className='fw-medium'>{data?.birthdate?.slice(0, 10) ?? ''}</span></td>
      <td className={`${screenSize === 'small' || screenSize === 'medium' ? 'mb-3 w-auto order-4' : ''}`} data-name='Town'><span className='fw-medium'>{data?.town}</span></td>
      <td className={`${screenSize === 'small' || screenSize === 'medium' ? 'mb-3 w-auto order-5' : ''}`} data-name='Subject'>
        <span className='program rounded-pill d-inline-block position-relative fw-medium' data-language={data.subject} style={{ backgroundColor: `var(--language-colors-${data.subject}-primary)`, color: `var(--language-colors-${data.subject}-secondary)` }}>
          {data?.subject}
        </span>
      </td>
      <td className={`${screenSize === 'small' || screenSize === 'medium' ? 'mb-3 w-auto order-6 text-center' : ''}`} data-name='Sub. Group'><span className='fw-medium'>{data?.subjectGroup}</span></td>
    </tr >
  )
}

export default TeacherCard
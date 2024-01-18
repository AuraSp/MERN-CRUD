import React from 'react'
import './Card.css'

function StudentCard({ data, checked, onCheckboxChange }) {
    return (
        <tr className={checked ? 'checked-border' : ''}>
            <td>
                <input
                    type="checkbox"
                    className="input"
                    checked={checked}
                    onChange={onCheckboxChange}
                />
            </td>
            <td><span>{data?.name} {data?.surname}</span></td>
            <td><span>{data?.birthdate?.slice(0, 10) ?? ''}</span></td>
            <td><span>{data?.town}</span></td>
            <td>
                <span className='program rounded-pill' data-language={data.program} style={{ backgroundColor: `var(--language-colors-${data.program}-primary)`, color: `var(--language-colors-${data.program}-secondary)` }}>
                    {data?.program}
                </span>

            </td>
            <td><span>{data?.group}</span></td>
        </tr >
    )
}

export default StudentCard
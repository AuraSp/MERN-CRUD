import React, { useState } from 'react';
import { BiTrash, BiEditAlt } from "react-icons/bi";
import Swal from 'sweetalert2';

function Actions({ handlePopupClose, checkedUserIds, users, setUsers, setIsRendering, setIsCheckAll, isCheckAll, setCheckedUserIds,
  setEditingUserIds }) {

  function onDelete(e) {
    e.preventDefault();
    Swal
      .fire({
        title: 'Are you sure?',
        text: 'This data will be lost forever',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      })
      .then((result) => {
        if (result.isConfirmed) {


          // Perform delete operation for each checked user
          checkedUserIds.forEach((id) => {
            // Update state to remove the deleted user
            const usersDelete = users.filter((user) => user._id !== id);
            setUsers(usersDelete);
            setCheckedUserIds([]);
            setIsCheckAll(!isCheckAll);

            fetch(`https://api-for-mern-app.onrender.com/api/v2/students/${id}`, { method: 'DELETE' })
              .then(() => console.info(`${id} was deleted succesfully`));

            setIsRendering(prevState => !prevState)
          });

          Swal.fire('Data has been deleted!', '', 'success')
        } else if (result.isDenied) {
          Swal.close();
        };
      });
  };


  const onEdit = (e) => {
    e.preventDefault();
    setEditingUserIds(checkedUserIds);
  };

  // const submitEdit = (e, data) => {
  //   e.preventDefault();
  //   fetch(`https://api-for-mern-app.onrender.com/api/v2/students/` + editId, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       data
  //     )
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.info('Success:', data);
  //       // getUsers();
  //       cancelEdit();
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };


  // function cancelEdit() {
  //   setEditId("");
  // };

  return (
    <div className="popup-container h-100 d-flex align-items-center justify-content-center">
      <div className="popup w-50 d-flex justify-content-between align-items-center rounded-pill py-3 px-4">
        <div className="left-section d-flex align-items-center">
          <button className="close-button border-0 bg-transparent text-white fs-4 mx-3" onClick={handlePopupClose}>X</button>
          <div className="checked-count text-white"><span className='rounded-pill'>{checkedUserIds.length}</span> {checkedUserIds.length === 1 ? 'student' : 'students'} selected</div>
        </div>
        <div className="right-section d-flex">
          <button className="action-button border-0 bg-danger rounded-pill me-1 text-white" onClick={onDelete}><BiTrash className='me-1 fs-5' />Delete</button>
          <button className="action-button border-0 rounded-pill ms-1 text-white" onClick={onEdit}><BiEditAlt className='me-1 fs-5' />Edit</button>
        </div>
      </div>
    </div>
  )
}

export default Actions
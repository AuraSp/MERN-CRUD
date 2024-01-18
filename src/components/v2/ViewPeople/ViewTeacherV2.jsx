import React, { useState, useEffect } from 'react'
import FormComponent from '../AddPeople/FormComponent';

function ViewTeacherV2({ onToggle, version }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch(`https://api-for-mern-app.onrender.com/api/v2/teachers`);
    const users = await response.json();
    // console.info(users);
    setUsers(users.data.teachers);
    setUserType(users.data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleFormClick = () => {
    setIsFormOpen(!isFormOpen);
  }
  return (
    <div>
      <button className='add-control text-white py-1 px-4' onClick={handleFormClick}>+ New Student</button>
      {isFormOpen && (
        <div className='form-overlay rounded'>
          <FormComponent userType={userType} />
        </div>
      )}
    </div>
  )
}

export default ViewTeacherV2
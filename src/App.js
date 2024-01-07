import React, { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from './components/Home';
import ViewStudentV1 from './components/v1/ViewPeople/ViewStudentV1';
import ViewTeacherV1 from './components/v1/ViewPeople/ViewTeacherV1';
import AddStudentV1 from './components/v1/AddPeople/AddStudentV1';
import AddTeacherV1 from './components/v1/AddPeople/AddTeacherV1';
import ViewStudentV2 from './components/v2/ViewPeople/ViewStudentV2';

import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTeacherV2 from './components/v2/ViewPeople/ViewTeacherV2';

function App() {

  const [routePath, setRoutePath] = useState('/v2');
  const navigate = useNavigate();

  const handleToggle = () => {
    const newRoutePath = routePath === '/v1' ? '/v2' : '/v1';
    setRoutePath(newRoutePath);
    navigate(newRoutePath + '/students');
  };

  return (
    <div className='container-fluid h-100 p-0 m-0'>
      <Routes>
        <Route path="/" element={<Home version={routePath} onToggle={handleToggle} />} />
        <Route path="/:id/students" element={routePath === '/v1' ? <ViewStudentV1 onToggle={handleToggle} version={routePath} /> : <ViewStudentV2 onToggle={handleToggle} version={routePath} />} />
        <Route path="/:id/teachers" element={routePath === '/v1' ? <ViewTeacherV1 onToggle={handleToggle} version={routePath} /> : <ViewTeacherV2 onToggle={handleToggle} version={routePath} />} />
        <Route path="/:id/addstudent" element={<AddStudentV1 version={routePath} onToggle={handleToggle}/>} />
        <Route path="/:id/addteacher" element={<AddTeacherV1 version={routePath} onToggle={handleToggle}/>} />
      </Routes>
    </div>
  )
}
export default App;


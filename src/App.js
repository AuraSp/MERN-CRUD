import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from './components/Home';
import AddStudentV1 from './components/v1/AddPeople/AddStudentV1';
import AddTeacherV1 from './components/v1/AddPeople/AddTeacherV1';
import ViewStudentV1 from './components/v1/ViewPeople/ViewStudentV1';
import ViewTeacherV1 from './components/v1/ViewPeople/ViewTeacherV1';
import ViewStudentV2 from './components/v2/ViewPeople/ViewStudentV2';
import ViewTeacherV2 from './components/v2/ViewPeople/ViewTeacherV2';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [routePath, setRoutePath] = useState('/v2');
  const navigate = useNavigate();
  const newRoutePath = routePath === '/v2' ? '/v1' : '/v2';

  const handleToggle = () => {
    setRoutePath(newRoutePath)
    navigate(newRoutePath + '/students')
  };

  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('small');
      } else if (width >= 768 && width <= 1200) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='container-fluid h-100 p-0 m-0'>
      <Routes>
        <Route path="/" element={<Home version={routePath} onToggle={handleToggle} screenSize={screenSize} />} />
        <Route path="/:id/students" element={routePath === '/v1' ? <ViewStudentV1 version={routePath} onToggle={handleToggle} /> : <ViewStudentV2 version={routePath} screenSize={screenSize} />} />
        <Route path="/:id/teachers" element={routePath === '/v1' ? <ViewTeacherV1 version={routePath} onToggle={handleToggle} /> : <ViewTeacherV2 version={routePath} screenSize={screenSize} />} />
        <Route path="/:id/addstudent" element={<AddStudentV1 version={routePath} onToggle={handleToggle} />} />
        <Route path="/:id/addteacher" element={<AddTeacherV1 version={routePath} onToggle={handleToggle} />} />
      </Routes>
    </div>
  )
}
export default App;


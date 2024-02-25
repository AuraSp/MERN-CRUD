import React, { useState, useEffect } from 'react';
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

  // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);


  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth < 768);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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

    // Initial call to set the initial screen size
    handleResize();

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='container-fluid h-100 p-0 m-0'>
      <Routes>
        <Route path="/" element={<Home version={routePath} onToggle={handleToggle} screenSize={screenSize} />} />
        <Route path="/:id/students" element={routePath === '/v1' ? <ViewStudentV1 version={routePath} /> : <ViewStudentV2 version={routePath} screenSize={screenSize} />} />
        <Route path="/:id/teachers" element={routePath === '/v1' ? <ViewTeacherV1 version={routePath} /> : <ViewTeacherV2 version={routePath} screenSize={screenSize} />} />
        <Route path="/:id/addstudent" element={<AddStudentV1 version={routePath} onToggle={handleToggle} />} />
        <Route path="/:id/addteacher" element={<AddTeacherV1 version={routePath} onToggle={handleToggle} />} />
      </Routes>
    </div>
  )
}
export default App;


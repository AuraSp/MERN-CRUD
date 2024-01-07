import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/HomePage/Home';
import ViewStudent from './components/ViewPeople/ViewStudent';
import ViewTeacher from './components/ViewPeople/ViewTeacher';
import AddStudent from './components/AddPeople/AddStudent';
import AddTeacher from './components/AddPeople/AddTeacher';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className='container-fluid h-100 p-0 m-0'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<ViewStudent />} />
        <Route path="/teachers" element={<ViewTeacher />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/addteacher" element={<AddTeacher />} />
      </Routes>
    </div>
  )
}
export default App;


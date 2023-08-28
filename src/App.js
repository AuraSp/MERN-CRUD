 import React from 'react';
 import {
  Routes,
   Route,
   BrowserRouter
 } from "react-router-dom";
 import Home from './components/HomePage/Home';
 import StudentsMain from './components/ViewPeople/StudentsPage/studentsMain';
 import TeachersMain from './components/ViewPeople/TeachersPage/teachersMain';
 import SForm from './components/AddPeople/AddStudentForm/form';
 import TForm from './components/AddPeople/AddTeacherForm/form';

 import 'bootstrap/dist/css/bootstrap.min.css';

 function App() {

   return (
     <div className='container-fluid h-100 p-0 m-0'>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/students" element={<StudentsMain />} />
           <Route path="/teachers" element={<TeachersMain />} />
           <Route path="/sform" element={<SForm />} />
          <Route path="/tform" element={<TForm />} />
         </Routes>
    </div>
   )
 }
  export default App;


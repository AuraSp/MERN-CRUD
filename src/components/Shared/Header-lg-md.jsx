import React from 'react';
import {
  Link
} from "react-router-dom";

import './Header.css';

function HeaderLGMD() {
  return (
    <div className='col-12 d-flex justify-content-center align-items-center top-block'>
      <Link to="/students" className='py-1 px-3 text-white fw-bold top-link'>Go to archive</Link>
    </div>
  )
}

export default HeaderLGMD
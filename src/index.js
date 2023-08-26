import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global/index.css';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
import { HashRouter } from "react-router-dom";

if (process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.render(
<HashRouter base="/">
  <App />
</HashRouter>,
  document.getElementById('root')
);

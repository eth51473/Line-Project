import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastContainer 
      autoClose={2250}
    />
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

